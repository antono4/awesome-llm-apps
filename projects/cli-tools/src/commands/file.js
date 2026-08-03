const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

module.exports = (program) => {
  const file = program.command('file').description('File operations');

  file
    .command('find')
    .description('Find files by pattern')
    .option('-p, --pattern <pattern>', 'File pattern (e.g., *.js)', required(true))
    .option('-d, --path <path>', 'Directory to search', process.cwd())
    .option('-r, --recursive', 'Search recursively', false)
    .action((options) => {
      try {
        const searchPattern = new RegExp(options.pattern.replace(/\*/g, '.*'));
        const results = [];
        
        function searchDir(dir, recursive) {
          const entries = fs.readdirSync(dir, { withFileTypes: true });
          
          for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            
            if (entry.isDirectory() && recursive) {
              searchDir(fullPath, recursive);
            } else if (entry.isFile() && searchPattern.test(entry.name)) {
              results.push(fullPath);
            }
          }
        }
        
        searchDir(options.path, options.recursive);
        
        if (results.length === 0) {
          console.log(chalk.yellow('No files found.'));
        } else {
          console.log(chalk.green(`Found ${results.length} file(s):`));
          results.forEach(r => console.log(chalk.cyan(r)));
        }
      } catch (error) {
        console.error(chalk.red(`Error: ${error.message}`));
        process.exit(1);
      }
    });

  file
    .command('info')
    .description('Get file information')
    .argument('<path>', 'File path')
    .action((filePath) => {
      try {
        const stats = fs.statSync(filePath);
        const ext = path.extname(filePath);
        
        console.log(chalk.cyan('File Information:'));
        console.log(`  Path: ${filePath}`);
        console.log(`  Name: ${path.basename(filePath)}`);
        console.log(`  Extension: ${ext || 'None'}`);
        console.log(`  Size: ${formatBytes(stats.size)}`);
        console.log(`  Created: ${stats.birthtime}`);
        console.log(`  Modified: ${stats.mtime}`);
        console.log(`  Is File: ${stats.isFile() ? 'Yes' : 'No'}`);
        console.log(`  Is Directory: ${stats.isDirectory() ? 'Yes' : 'No'}`);
      } catch (error) {
        console.error(chalk.red(`Error: ${error.message}`));
        process.exit(1);
      }
    });

  file
    .command('tree')
    .description('Show directory tree')
    .option('-d, --path <path>', 'Directory path', process.cwd())
    .option('-D, --depth <number>', 'Maximum depth', '3')
    .action((options) => {
      const maxDepth = parseInt(options.depth);
      
      function printTree(dir, prefix = '', depth = 0) {
        if (depth >= maxDepth) return;
        
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        const dirs = [];
        const files = [];
        
        entries.forEach(entry => {
          if (entry.isDirectory()) dirs.push(entry.name);
          else files.push(entry.name);
        });
        
        dirs.forEach((d, i) => {
          const isLast = i === dirs.length - 1 && files.length === 0;
          console.log(`${prefix}${isLast ? '└── ' : '├── '}${chalk.blue(d)}/`);
          printTree(path.join(dir, d), prefix + (isLast ? '    ' : '│   '), depth + 1);
        });
        
        files.forEach((f, i) => {
          const isLast = i === files.length - 1;
          console.log(`${prefix}${isLast ? '└── ' : '├── '}${f}`);
        });
      }
      
      console.log(chalk.blue(`${options.path}/`));
      printTree(options.path);
    });
};

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function required(val) {
  if (!val) throw new Error('Required option not provided');
  return val;
}
