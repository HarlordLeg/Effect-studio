import {references} from './vpk.mjs';

// Economy growth models can inherit clips from the host they replace. Keep
// that mounted host under a separate name before writing the replacement.
export function preserveTinyAnimationIncludes(store,hero,item,files,contexts){
 if(hero.id!=='tiny'||item.entityKind!=='growth')return;
 for(const {source,target} of item.entityReplacements??[{source:item.model,target:item.replacesModel}]){
  if(source===target)continue;
  const donor=files.get(source);
  if(!donor||!references(donor).includes(target))continue;
  const base=store.read(target);
  if(!base)throw new Error('Tiny animation base missing: '+target);
  const privateName='harlord/models/tiny-animation-bases/'+target.slice('models/'.length);
  files.set(privateName,base);
  const paths={[target.replace(/_c$/,'')]:privateName.replace(/_c$/,'')};
  contexts.set(target,{...contexts.get(target),paths:{...contexts.get(target)?.paths,...paths}});
 }
}
