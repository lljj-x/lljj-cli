/**
 * Created by Liu.Jun on 2020/11/13 17:31.
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const replace = require('replace-in-file');
const { exit } = require('../utils');

const templates = {
    'monorepo-vue-js': path.resolve(__dirname, './monorepo-js'),
    'monorepo-vue-ts': path.resolve(__dirname, './monorepo-ts'),
};

module.exports = async (targetDir, options) => {
    const baseTemplate = templates[options.framework === 'vue' ? 'monorepo-vue-js' : 'monorepo-vue-ts'];

    try {
        // step1
        await fs.copy(baseTemplate, targetDir);

        // single
        if (options.type === 'single') {
            // nothing ...
        }

        // 替换文件
        const replaceOptions = ['packageName', 'packageDescription', 'packageAuthor'].reduce((preVal, key) => {
            preVal.from.push(new RegExp(`<${key}>`, 'g'));
            preVal.to.push(options[key] || '');
            return preVal;
        }, {
            files: `${targetDir}/**`,
            ignore: [
                `${targetDir}/**/*.lock`,
                `${targetDir}/**/node_modules/**`,
                `${targetDir}/**/dist/**`,
            ],
            from: [],
            to: []
        });
        await replace(replaceOptions);

        // 模板准备完毕
    } catch (e) {
        console.log(chalk.red.dim('\n生成模板文件失败：'));
        console.log(chalk.red.dim(e));
        exit(1);
        throw new Error(e);
    }
};
