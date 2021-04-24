/**
 * Created by Liu.Jun on 2021/4/24 10:41 下午.
 */

const path = require('path');
const fs = require('fs-extra');
const zipDir = require('zip-dir');

// 压缩模板zip，避免npm publish 文件丢失
// https://github.com/npm/npm/issues/3763

const templatePath = path.resolve(__dirname, './packages/cli/templates');

const files = fs.readdirSync(templatePath);
files.forEach((dir) => {
    if (!dir.includes('.')) {
        zipDir(`${templatePath}/${dir}`, { saveTo: `${templatePath}/${dir}.zip` }, function (err) {
            if (err) {
                throw err;
            } else {
                console.log('压缩模板文件完成：', `${templatePath}/${dir}`)
            }
        })
    }
})
