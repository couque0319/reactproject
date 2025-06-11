// copy-to-xampp.js
const fs = require('fs-extra');
const path = require('path');

const buildDir = path.join(__dirname, 'build');
const targetDir = 'D:/xampp/htdocs/reactproject'; // 너의 실제 경로로 수정

fs.copy(buildDir, targetDir, { overwrite: true }, (err) => {
  if (err) {
    console.error('❌ 복사 실패:', err);
  } else {
    console.log('✅ 빌드 결과가 XAMPP 경로에 자동 복사되었습니다!');
  }
});
