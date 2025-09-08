
const execSync = require('child_process').execSync

// https://stackoverflow.com/questions/55021363/how-to-pass-current-datetime-in-npm-script-for-git-commit-message-in-windows-and

execSync(`cd ../..`, { stdio: [0, 1, 2] })
execSync(`npx ncu -u && npm i --force`, { stdio: [0, 1, 2] })

execSync(`npm i -D css-loader@6.10.0 --force`, { stdio: [0, 1, 2] })
