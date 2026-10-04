const fs=require('node:fs'),path=require('node:path');
const files=['index.html','calc-bridge.js','calc-worker.js','gpu.js'];
const out=path.join(__dirname,'public');
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out);
for(const file of files)fs.copyFileSync(path.join(__dirname,file),path.join(out,file));
console.log('Staged GPU high-definition release.');
