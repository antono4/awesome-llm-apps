const chalk = require('chalk');
const fs = require('fs');

module.exports = (program) => {
  const base64 = program.command('base64').description('Base64 operations');

  base64
    .command('encode <text>')
    .description('Encode text to Base64')
    .option('-f, --file <file>', 'Read from file instead of text')
    .action((text, options) => {
      try {
        let content = text;
        if (options.file) {
          content = fs.readFileSync(options.file, 'utf8');
        }
        const encoded = Buffer.from(content).toString('base64');
        console.log(chalk.green('Encoded:'));
        console.log(encoded);
      } catch (error) {
        console.error(chalk.red(`Error: ${error.message}`));
        process.exit(1);
      }
    });

  base64
    .command('decode <text>')
    .description('Decode Base64 to text')
    .option('-f, --file <file>', 'Read from file instead of text')
    .action((text, options) => {
      try {
        let content = text;
        if (options.file) {
          content = fs.readFileSync(options.file, 'utf8');
        }
        const decoded = Buffer.from(content.trim(), 'base64').toString('utf8');
        console.log(chalk.green('Decoded:'));
        console.log(decoded);
      } catch (error) {
        console.error(chalk.red(`Error: ${error.message}`));
        process.exit(1);
      }
    });
};
