import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {Vpk,packVpk} from './vpk.mjs';
import {prepareTerrain,terrainFile} from './cosmetic-terrain.mjs';
export const weatherDefinitions=[
 ['10704','Снег','Snow','econ_snow','snow'],['10706','Дождь','Rain','econ_rain','rain'],
 ['10707','Лунный свет','Moonbeam','econ_moonlight','moonbeam'],['11083','Мор','Pestilence','econ_weather_pestilence','pestilence'],
 ['11414','Сирокко','Sirocco','econ_weather_sirocco','sandstorm'],['11454','Осень','Harvest','econ_weather_harvest','harvest'],
 ['11549','Пепел','Ash','econ_weather_ash','burning'],['11550','Северное сияние','Aurora','econ_weather_aurora','aurora'],
 ['11551','Весна','Spring','econ_weather_spring','spring']
].map(([id,name,nameEn,root,icon])=>({id,category:'weather',name,nameEn,particle:'particles/rain_fx/'+root+'.vpcf',imageInventory:'econ/tools/weather_'+icon,entries:[],ambient:[],soundEvents:[],styles:[],styleId:'0'}));
export function weatherItems(builder){return weatherDefinitions.map(item=>({...item,available:!!builder.store.read(item.particle+'_c'),reason:builder.store.read(item.particle+'_c')?'':'Не найден эффект погоды в Dota'}));}
export function standardTerrain(builder){const item={id:'terrain-standard',category:'terrain',name:'Стандартная карта',nameEn:'Default terrain',terrainAsset:'maps/dota.vmap',imageInventory:'econ/terrain/default_terrain',entries:[],ambient:[],soundEvents:[],styles:[],styleId:'0'};return {...item,available:!!terrainFile(builder,item.id,item.terrainAsset),reason:'Не найден оригинальный maps/dota.vpk'};}
export function validateWeatherTerrain(catalog,input){
 const weather=input.find(c=>catalog.items.find(i=>i.id===c.id)?.category==='weather');if(!weather)return;
 const terrain=catalog.items.find(i=>i.id===weather.terrainId&&i.category==='terrain'&&i.available);if(!terrain)throw Error('Выбери доступную карту для погоды');
 const other=input.find(c=>catalog.items.find(i=>i.id===c.id)?.category==='terrain');if(other&&other.id!==terrain.id)throw Error('Погода и ландшафт должны использовать одну карту');
}
export async function prepareWeather(builder,choice,terrain,executable,dir){
 const caps=JSON.parse((await builder.run(executable,['--capabilities'],{cwd:builder.root})).trim());if(!caps.mapWeatherV3)throw Error('Обнови патчер: требуется mapWeatherV3');
 const source=await prepareTerrain(builder,terrain,executable,dir);
 const rainAtmosphere=choice.particle==='particles/rain_fx/econ_rain.vpcf',lighting=[];
 if(rainAtmosphere){const standard=terrainFile(builder,'terrain-standard','maps/dota.vmap');if(standard){const original=new Vpk(standard.file);for(const name of original.entries.keys())if(name.endsWith('.vents_c'))lighting.push(original.read(name));}}
 const lightingHash=crypto.createHash('sha256');for(const bytes of lighting)lightingHash.update(bytes);
 const stamp=crypto.createHash('sha256').update(lightingHash.digest()).update(source).update(choice.particle).update(fs.readFileSync(executable)).update('weather-v4-canonical-source').digest('hex');
 const cache=path.join(builder.root,'cache/cosmetic-weather',stamp+'.vpk');if(fs.existsSync(cache))return fs.readFileSync(cache);
 const inputMap=path.join(dir,'weather-source.vpk');fs.writeFileSync(inputMap,source);const archive=new Vpk(inputMap),files=new Map(),requests=[];
 for(const name of archive.entries.keys()){
  const bytes=archive.read(name);files.set(name,bytes);if(!name.endsWith('.vents_c'))continue;
  const input=path.join(dir,'weather-entities-'+requests.length+'.vents_c');fs.writeFileSync(input,bytes);requests.push({input,output:input+'.out',name});
 }
 if(!requests.length)throw Error('В карте нет блоков сущностей для погоды');
 const lightingFiles=lighting.map((bytes,index)=>{const input=path.join(dir,'weather-lighting-'+index+'.vents_c');fs.writeFileSync(input,bytes);return input;});
 const manifest=path.join(dir,'weather.json');fs.writeFileSync(manifest,JSON.stringify({particle:choice.particle,files:requests,fallbackWeatherType:terrain.id==='11444'?1:null,rainAtmosphere,lightingFiles}));
 await builder.run(executable,['--map-weather',manifest],{cwd:builder.root,timeout:240000});
 for(const row of requests)files.set(row.name,fs.readFileSync(row.output));
 const result=packVpk(files,{maxBytes:0xffffffff}),temp=path.join(dir,'weather-result.vpk');fs.writeFileSync(temp,result);const verified=new Vpk(temp);
 if(verified.entries.size!==files.size)throw Error('Ошибка проверки карты');for(const [name,bytes]of files)if(!verified.read(name).equals(bytes))throw Error('Ошибка проверки карты: '+name);
 fs.mkdirSync(path.dirname(cache),{recursive:true});const pending=cache+'.'+crypto.randomBytes(6).toString('hex')+'.tmp';fs.writeFileSync(pending,result);fs.renameSync(pending,cache);return result;
}
