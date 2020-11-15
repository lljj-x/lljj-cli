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
    .action((name) => {
        const options = program.opts();
        require('../lib/lljj/create')(name, options);
    });

program.parse(process.argv);
