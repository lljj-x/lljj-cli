/**
 * Created by Liu.Jun on 2020/11/12 18:32.
 */

const path = require('path');
const fs = require('fs-extra');
const validateProjectName = require('validate-npm-package-name');
const chalk = require('chalk');
const inquirer = require('inquirer');
const genTemplate = require('../../templates');
const { exit } = require('../../utils');

function validForNewPackages(name) {
    const result = validateProjectName(name);
    if (!result.validForNewPackages) {
        console.error(chalk.red(`Invalid project name: "${name}"`));

        if (result.errors) {
            result.errors.forEach((err) => {
                console.error(chalk.red.dim(`Error: ${err}`));
            });
        }

        if (result.warnings) {
            result.warnings.forEach((warn) => {
                console.error(chalk.red.dim(`Warning: ${warn}`));
            });
        }
        exit(1);
    }
}

function validDir(targetDir) {
    if (fs.existsSync(targetDir)) {
        console.log(chalk.red.dim(`已经存在目录：${targetDir}...`));
        console.log(chalk.blue.dim('提示：请清空目录后再次尝试'));

        exit(1);
    }
}

async function prompt() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'type',
            message: '请选择项目代码管理方式',
            choices: [
                { name: 'Monorepo', value: 'monorepo' },
                { name: 'Single', value: 'single' },
            ]
        },
        {
            type: 'list',
            name: 'framework',
            message: '请选择项目使用框架',
            choices: ['vue', 'react']
        },
        {
            type: 'list',
            name: 'framework',
            message: '请选择项目使用框架',
            choices: ['vue', 'react']
        },
        {
            name: 'typeScript',
            type: 'confirm',
            message: '是否使用 TypeScript',
            default: false
        },
        {
            name: 'packageName',
            message: '请输入项目描述（默认等于项目名）： '
        },
        {
            name: 'packageDescription',
            message: '请输入项目描述（用于配置package.json文件）： '
        }
    ]);
}

async function create(projectName, options) {
    const cwd = options.cwd || process.cwd();
    const inCurrent = projectName === '.';
    const name = inCurrent ? path.relative('../', cwd) : projectName;

    // 当前项目下载目录
    const targetDir = path.resolve(cwd, projectName || '.');

    validForNewPackages(name);
    validDir(targetDir);

    // 用户交互
    const userOptions = await prompt();
    options = {
        ...options,
        ...userOptions,
        packageName: options.packageName || projectName,
    };

    // 生成文件模板
    await genTemplate(targetDir, options);

    console.log('文件生成');
}

module.exports = (...args) => create(...args).catch((err) => {
    exit(1);
});
