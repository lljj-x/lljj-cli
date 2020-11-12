#!/usr/bin/env node

const program = require('commander');

program
    .version(require('../package').version)
    .usage('<command> [options]');

program
    // .command('create', '(for v3 warning only)')
    .command('create <app-name>')
    .description('create a new project powered by vue-cli-service')
    .action((name, cmd) => {
        // --git makes commander to default git to true
        if (process.argv.includes('-g') || process.argv.includes('--git')) {
            options.forceGit = true;
        }
        require('../lib/create')(name, options);
    });

program
    .command('init', 'generate a new project from a template')
    .command('list', 'list available official templates')
    .command('build', 'prototype a new project');

program.parse(process.argv);
