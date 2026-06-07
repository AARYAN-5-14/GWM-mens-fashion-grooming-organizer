const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'BeardForm.jsx',
  'FormalBeardForm.jsx',
  'DateBeardForm.jsx',
  'FamilyBeardForm.jsx',
  'HairForm.jsx',
  'FormalHairForm.jsx',
  'DateHairForm.jsx',
  'FamilyHairForm.jsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, 'src', 'components', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // We are looking for navigate(`/results/${combination}`);
    // But some might have double quotes or different spacing, so regex is safer.
    const newContent = content.replace(/navigate\(`\/results\/\$\{combination\}`\);/g, "window.open(`/results/${combination}`, '_blank');");
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Updated ${file}`);
    } else {
      console.log(`No changes needed or pattern not found in ${file}`);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
});
