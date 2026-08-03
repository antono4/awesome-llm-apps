const chalk = require('chalk');
const { v1, v4, v7, validate } = require('uuid');

module.exports = (program) => {
  const uuid = program.command('uuid').description('UUID operations');

  uuid
    .command('generate')
    .description('Generate a new UUID')
    .option('-v, --version <version>', 'UUID version (1, 4, or 7)', '4')
    .option('-n, --count <number>', 'Number of UUIDs to generate', '1')
    .action((options) => {
      const count = parseInt(options.count);
      const version = parseInt(options.version);
      
      console.log(chalk.cyan('Generated UUID(s):'));
      
      for (let i = 0; i < count; i++) {
        let newUuid;
        switch (version) {
          case 1:
            newUuid = v1();
            break;
          case 7:
            newUuid = v7();
            break;
          default:
            newUuid = v4();
        }
        console.log(chalk.green(newUuid));
      }
    });

  uuid
    .command('validate <uuid>')
    .description('Validate a UUID')
    .action((uuidStr) => {
      const isValid = validate(uuidStr);
      if (isValid) {
        console.log(chalk.green(`✓ '${uuidStr}' is a valid UUID`));
      } else {
        console.log(chalk.red(`✗ '${uuidStr}' is not a valid UUID`));
        process.exit(1);
      }
    });
};
