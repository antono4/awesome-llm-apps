const chalk = require('chalk');
const crypto = require('crypto');
const fs = require('fs');

module.exports = (program) => {
  const hash = program.command('hash').description('Hash operations');

  hash
    .command('generate')
    .description('Generate hash from text or file')
    .option('-a, --algorithm <algo>', 'Hash algorithm (md5, sha1, sha256, sha512)', 'sha256')
    .option('-f, --file <file>', 'Hash a file instead of text')
    .argument('<input>', 'Text or file path to hash')
    .action((input, options) => {
      try {
        let hashValue;
        if (options.file) {
          const content = fs.readFileSync(options.file);
          hashValue = crypto.createHash(options.algorithm).update(content).digest('hex');
        } else {
          hashValue = crypto.createHash(options.algorithm).update(input).digest('hex');
        }
        
        console.log(chalk.cyan(`Algorithm: ${options.algorithm.toUpperCase()}`));
        console.log(chalk.green('Hash:'));
        console.log(hashValue);
      } catch (error) {
        console.error(chalk.red(`Error: ${error.message}`));
        process.exit(1);
      }
    });

  hash
    .command('verify')
    .description('Verify a hash')
    .option('-a, --algorithm <algo>', 'Hash algorithm', 'sha256')
    .option('-f, --file <file>', 'Verify against a file')
    .argument('<input>', 'Original text or file path')
    .argument('<hash>', 'Expected hash value')
    .action((input, expectedHash, options) => {
      try {
        let actualHash;
        if (options.file) {
          const content = fs.readFileSync(options.file);
          actualHash = crypto.createHash(options.algorithm).update(content).digest('hex');
        } else {
          actualHash = crypto.createHash(options.algorithm).update(input).digest('hex');
        }

        if (actualHash === expectedHash) {
          console.log(chalk.green('✓ Hash matches!'));
        } else {
          console.log(chalk.red('✗ Hash does not match!'));
          console.log(chalk.yellow(`Expected: ${expectedHash}`));
          console.log(chalk.yellow(`Actual:   ${actualHash}`));
          process.exit(1);
        }
      } catch (error) {
        console.error(chalk.red(`Error: ${error.message}`));
        process.exit(1);
      }
    });
};
