const fs = require('fs');
const path = require('path');

const dir = __dirname;
const beardForm = fs.readFileSync(path.join(dir, 'BeardForm.jsx'), 'utf-8');
const hairForm = fs.readFileSync(path.join(dir, 'HairForm.jsx'), 'utf-8');

const forms = [
  { prefix: 'Formal', videoFile: 'formal.mp4' },
  { prefix: 'Date', videoFile: 'date.mp4' },
  { prefix: 'Family', videoFile: 'family_gathering.mp4' }
];

forms.forEach(({ prefix, videoFile }) => {
  // Process BeardForm
  let newBeard = beardForm
    .replace('import party from "../assets/party.mp4";', `import ${prefix.toLowerCase()}Video from "../assets/${videoFile}";`)
    .replace('<video src={party}', `<video src={${prefix.toLowerCase()}Video}`)
    .replace('const BeardForm = () => {', `const ${prefix}BeardForm = () => {`)
    .replace('export default BeardForm;', `export default ${prefix}BeardForm;`);
    
  fs.writeFileSync(path.join(dir, `${prefix}BeardForm.jsx`), newBeard);

  // Process HairForm
  let newHair = hairForm
    .replace('import party from "../assets/party.mp4";', `import ${prefix.toLowerCase()}Video from "../assets/${videoFile}";`)
    .replace('<video src={party}', `<video src={${prefix.toLowerCase()}Video}`)
    .replace('const HairForm = () => {', `const ${prefix}HairForm = () => {`)
    .replace('export default HairForm;', `export default ${prefix}HairForm;`);
    
  fs.writeFileSync(path.join(dir, `${prefix}HairForm.jsx`), newHair);
});
console.log('Cloning complete.');
