export function cancelledModel(){const error=new Error('Model loading cancelled');error.name='AbortError';return error;}
export function isPreviewCancelled(error){return error?.name==='AbortError'||/^(Model loading cancelled|Сцена изменилась)$/.test(error?.message??'');}
