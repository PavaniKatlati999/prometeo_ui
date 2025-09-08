const execSync = require('child_process').execSync

executeGitCommand = command => {
  return execSync(command).toString('utf8').replace(/[\n\r\s]+$/, '')
},

  branch = executeGitCommand('git rev-parse --abbrev-ref HEAD'),
  master = "master",
  make_dist = false

//https://stackoverflow.com/questions/55021363/how-to-pass-current-datetime-in-npm-script-for-git-commit-message-in-windows-and

try {
  // execSync(`git tag \"v${packs.version}\" -am \"Modify content\" && git push --tags`)
  if (make_dist) execSync(`npm run make-dist`, { stdio: [0, 1, 2] })
  execSync(`npm run git`, { stdio: [0, 1, 2] })
  execSync(`git checkout ${master}`, { stdio: [0, 1, 2] })
  execSync(`git pull origin ${master}`, { stdio: [0, 1, 2] })
  execSync(`git merge ${branch}`, { stdio: [0, 1, 2] })
  execSync(`git push origin ${master}`, { stdio: [0, 1, 2] })
  execSync(`git checkout ${branch}`, { stdio: [0, 1, 2] })
} catch (error) { console.log(error) }
