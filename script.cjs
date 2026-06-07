const fs = require('fs');

function refactorBeardForm(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace(/const faceShapes = \[[\s\S]*?\];\n\n  const beardTypes = \[[\s\S]*?\];\n\n  const volumeOptions = \[[\s\S]*?\];/, '');
  content = content.replace(/import \{ useNavigate \} from ['"]react-router-dom['"];/, 'import { useNavigate } from "react-router-dom";\nimport { faceShapes, beardTypes, volumeOptions } from "../data/formOptions";');
  fs.writeFileSync(filePath, content);
}

function refactorHairForm(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace(/const hairTypes = \[[\s\S]*?\];\n\n  const hairfallTypes = \[[\s\S]*?\];\n\n  const lengthOptions = \[[\s\S]*?\];/, '');
  content = content.replace(/import \{ useNavigate \} from ['"]react-router-dom['"];/, 'import { useNavigate } from "react-router-dom";\nimport { hairTypes, hairfallTypes, lengthOptions } from "../data/formOptions";');
  fs.writeFileSync(filePath, content);
}

const basePath = 'c:/Users/HP/OneDrive/Desktop/.vscode/GWM/src/components';
['BeardForm.jsx', 'FormalBeardForm.jsx', 'DateBeardForm.jsx', 'FamilyBeardForm.jsx'].forEach(f => refactorBeardForm(basePath + '/' + f));
['HairForm.jsx', 'FormalHairForm.jsx', 'DateHairForm.jsx', 'FamilyHairForm.jsx'].forEach(f => refactorHairForm(basePath + '/' + f));

function refactorCategory(filePath, categoryId) {
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace(/import party from '\.\.\/assets\/party\.mp4';\n/, '');
  content = content.replace(/import formal from '\.\.\/assets\/formal\.mp4';\n/, '');
  content = content.replace(/import formal from '\.\.\/assets\/date\.mp4';\n/, '');
  content = content.replace(/import formal from '\.\.\/assets\/family_gathering\.mp4';\n/, '');
  
  content = content.replace(/import \{ useNavigate , Outlet \} from 'react-router-dom';/, "import { useNavigate , Outlet } from 'react-router-dom';\nimport { CATEGORIES } from '../data/categories';");

  content = content.replace(/const \w+ = \(\) => \{/, 'const ' + (categoryId.charAt(0).toUpperCase() + categoryId.slice(1)) + ' = () => {\n  const category = CATEGORIES.find(c => c.id === \'' + categoryId + '\');');

  content = content.replace(/<video src=\{[^\}]+\} autoPlay loop muted playsInline \/>/, '<video src={category.videoSrc} autoPlay loop muted playsInline />');

  content = content.replace(/onClick=\{\(\) => navigate\('\/grooming\/[^\/]+\/HairForm'\)\}/, 'onClick={() => navigate(category.hairRoute)}');
  content = content.replace(/onClick=\{\(\) => navigate\('\/grooming\/[^\/]+\/BeardForm'\)\}/, 'onClick={() => navigate(category.beardRoute)}');

  content = content.replace(/<h1>.*?<\/h1>/, '<h1>{category.title}</h1>');

  fs.writeFileSync(filePath, content);
}

['party', 'formal', 'date', 'family'].forEach(id => refactorCategory(basePath + '/' + id + '.jsx', id));

let resultContent = fs.readFileSync(basePath + '/Result.jsx', 'utf-8');
resultContent = resultContent.replace(/import Clean from "\.\.\/assets\/Clean\.jpeg";\nimport ItalianBeard from '\.\.\/assets\/Balbo\.jpeg';\nimport Stubble from '\.\.\/assets\/Stubble\.jpeg';\nimport Goatee from '\.\.\/assets\/Goatee\.jpeg';\nimport Anchor from '\.\.\/assets\/Anchor\.jpeg';\nimport ChinStrap from '\.\.\/assets\/Chin Strap\.jpeg';/, 'import { beardRecommendations } from "../data/recommendations";');
resultContent = resultContent.replace(/const beardResults = \{[\s\S]*?^};\n/m, '');
resultContent = resultContent.replace(/const result = beardResults\[combination\];/, 'const result = beardRecommendations[combination];');
fs.writeFileSync(basePath + '/Result.jsx', resultContent);
