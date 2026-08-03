const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

module.exports = (program) => {
  const json = program.command('json').description('JSON operations');

  json
    .command('format <file>')
    .description('Pretty print JSON file')
    .option('-i, --indent <number>', 'Indentation size', '2')
    .option('-o, --output <file>', 'Output file (default: stdout)')
    .action((file, options) => {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const parsed = JSON.parse(content);
        const formatted = JSON.stringify(parsed, null, parseInt(options.indent));
        
        if (options.output) {
          fs.writeFileSync(options.output, formatted);
          console.log(chalk.green(`✓ JSON formatted and saved to ${options.output}`));
        } else {
          console.log(formatted);
        }
      } catch (error) {
        console.error(chalk.red(`Error: ${error.message}`));
        process.exit(1);
      }
    });

  json
    .command('minify <file>')
    .description('Minify JSON file')
    .option('-o, --output <file>', 'Output file (default: stdout)')
    .action((file, options) => {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const parsed = JSON.parse(content);
        const minified = JSON.stringify(parsed);
        
        if (options.output) {
          fs.writeFileSync(options.output, minified);
          console.log(chalk.green(`✓ JSON minified and saved to ${options.output}`));
        } else {
          console.log(minified);
        }
      } catch (error) {
        console.error(chalk.red(`Error: ${error.message}`));
        process.exit(1);
      }
    });

  json
    .command('validate <file>')
    .description('Validate JSON file')
    .action((file) => {
      try {
        const content = fs.readFileSync(file, 'utf8');
        JSON.parse(content);
        console.log(chalk.green('✓ Valid JSON'));
      } catch (error) {
        console.error(chalk.red(`✗ Invalid JSON: ${error.message}`));
        process.exit(1);
      }
    });
};
