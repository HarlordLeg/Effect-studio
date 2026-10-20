// Catalog visibility does not need the resource payload; build/export still use CRC-checked reads.
export function assetAvailable(store,name){return typeof store.has==='function'?store.has(name):!!store.read(name);}
