/**
 * Created by Liu.Jun on 2021/4/24 10:41 下午.
 */

const path = require('path');
const zipDir = require('zip-dir');

// 压缩模板zip，避免npm publish 文件丢失
// https://github.com/npm/npm/issues/3763

(async function () {
    async function run() {
        const templatePath = path.resolve(__dirname, './packages/cli/templates')

        return new Promise((resolve, reject) => {
            zipDir(templatePath, { saveTo: `${templatePath}/templates.zip` }, function (err, buffer) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            });
        })
    }

    await run().then(console.log('压缩模板文件完成'))
}())



