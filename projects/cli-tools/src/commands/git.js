const chalk = require('chalk');
const { execSync } = require('child_process');

module.exports = (program) => {
  const git = program.command('git').description('Git operations');

  git
    .command('commit')
    .description('Quick stage and commit')
    .argument('<message>', 'Commit message')
    .option('-a, --all', 'Stage all changes', false)
    .action((message, options) => {
      try {
        if (options.all) {
          console.log(chalk.cyan('Staging all changes...'));
          execSync('git add -A', { stdio: 'inherit' });
        } else {
          console.log(chalk.cyan('Staging changes...'));
          execSync('git add .', { stdio: 'inherit' });
        }
        
        console.log(chalk.cyan(`Creating commit: "${message}"`));
        execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
        
        console.log(chalk.green('✓ Commit created successfully!'));
      } catch (error) {
        console.error(chalk.red(`Error: ${error.message}`));
        process.exit(1);
      }
    });

  git
    .command('branch')
    .description('Show current branch and branches')
    .option('-l, --list', 'List all branches', false)
    .action((options) => {
      try {
        const currentBranch = execSync('git branch --show-current').toString().trim();
        console.log(chalk.cyan('Current branch:'));
        console.log(chalk.green(`  ${currentBranch}`));
        
        if (options.list) {
          const branches = execSync('git branch -a').toString().trim().split('\n');
          console.log(chalk.cyan('\nAll branches:'));
          branches.forEach(b => {
            const isCurrent = b.trim().startsWith('*');
            console.log(isCurrent ? chalk.green(`  ${b}`) : chalk.white(`  ${b}`));
          });
        }
      } catch (error) {
        console.error(chalk.red(`Error: ${error.message}`));
        process.exit(1);
      }
    });

  git
    .command('stats')
    .description('Show contribution statistics')
    .action(() => {
      try {
        console.log(chalk.cyan('Contribution Statistics:'));
        console.log(chalk.yellow('\nCommits by author:'));
        execSync('git shortlog -sn --all', { stdio: 'inherit' });
        
        console.log(chalk.yellow('\nRecent commits:'));
        execSync('git log --oneline -10', { stdio: 'inherit' });
        
        console.log(chalk.yellow('\nFiles changed:'));
        const stats = execSync('git diff --stat').toString().trim();
        console.log(stats);
      } catch (error) {
        console.error(chalk.red(`Error: ${error.message}`));
        process.exit(1);
      }
    });

  git
    .command('status')
    .description('Show git status')
    .action(() => {
      try {
        execSync('git status', { stdio: 'inherit' });
      } catch (error) {
        console.error(chalk.red(`Error: ${error.message}`));
        process.exit(1);
      }
    });
};
