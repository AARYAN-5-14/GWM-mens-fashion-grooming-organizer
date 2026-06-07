const fs = require('fs');
const basePath = 'c:/Users/HP/OneDrive/Desktop/.vscode/GWM/src/components';

function removeUnused(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace(/import \w+ from ['\"]\.\.\/assets\/\w+\.mp4['\"];\n/g, '');
  fs.writeFileSync(filePath, content);
}

['party.jsx', 'formal.jsx', 'date.jsx', 'family.jsx'].forEach(f => removeUnused(basePath + '/' + f));
