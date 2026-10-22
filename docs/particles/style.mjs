export function previewColor(effect,customColor=null){const rgb=customColor??effect?.previewColor;return rgb?rgb.map(channel=>channel/255):null;}
