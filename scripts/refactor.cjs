const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;
      content = content.replace(/prisma\.student/g, 'prisma.user');
      content = content.replace(/studentId/g, 'userId');
      content = content.replace(/student/g, 'user');
      content = content.replace(/Student/g, 'User');
      if (content !== original) {
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

replaceInDir(path.join(__dirname, '../backend'));
