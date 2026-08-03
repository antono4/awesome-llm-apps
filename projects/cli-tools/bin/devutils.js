#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const packageJson = require('../package.json');

// Import commands
const jsonCommands = require('../src/commands/json');
const uuidCommands = require('../src/commands/uuid');
const base64Commands = require('../src/commands/base64');
const hashCommands = require('../src/commands/hash');
const fileCommands = require('../src/commands/file');
const gitCommands = require('../src/commands/git');

const program = new Command();

program
  .name('devutils')
  .description('🚀 DevUtils CLI - A powerful command-line toolkit for developers')
  .version(packageJson.version);

// Register command groups
jsonCommands(program);
uuidCommands(program);
base64Commands(program);
hashCommands(program);
fileCommands(program);
gitCommands(program);

// Global options
program.option('-v, --verbose', 'Enable verbose output');

// Handle unknown commands
program.on('command:*', () => {
  console.error(chalk.red(`Invalid command: ${program.args.join(' ')}`));
  console.log(chalk.yellow(`Run 'devutils --help' for available commands.`));
  process.exit(1);
});

program.parse(process.argv);

// Show help if no arguments
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
