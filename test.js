const { spawn } = require('child_process');

const ls2 = spawn('cd', ['..'])
const ls = spawn('pwd')

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
})

