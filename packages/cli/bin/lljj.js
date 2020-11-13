#!/usr/bin/env node

const program = require('commander');

// version
program
    .version(`@lljj/cli ${require('../package').version}`)
    .usage('<command> [options]');

// options
program
    .option('-d, --debug', 'output extra debugging');
program.parse(process.argv);

if (program.debug) console.log(program.opts());


// command
program
    .command('create <app-name>')
    .description('创建一个新项目')
    .option('-d, --debug', 'output extra debugging')
    .action((name, cmd) => {
        const options = program.opts();
        require('../lib/lljj/create')(name, options);
    });

program
    .command('init', 'generate a new project from a template')
    .command('list', 'list available official templates')
    .command('build', 'prototype a new project');

program.parse(process.argv);
