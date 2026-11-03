export function productionBuilderConfig(config,env=process.env){
 const engine=env.DOTA_BUILDER_ENGINE||config.builderEngine||'new';
 if(!['new','legacy'].includes(engine))throw Error('DOTA_BUILDER_ENGINE / builderEngine must be new or legacy');
 return {...config,builderEngine:engine,testerBuildV1:engine==='new'};
}
