/**
 * Created by Liu.Jun on 2020/11/13 14:42.
 */

const download = require('download-git-repo');
const ora = require('ora');

let spinner = null;
exports.spinnerStart = (msg) => {
    exports.spinnerStop();
    spinner = ora(msg).start();
};

exports.spinnerStop = () => {
    if (spinner) {
        spinner.stop();
    }
};

exports.exit = function exit(code) {
    process.exit(code);
};

exports.downloadGit = (url, name, {
    clone = false
} = {}) => new Promise((resolve, reject) => {
    exports.spinnerStart('开始下载模板文件...');
    download(url, name, { clone }, (err) => {
        if (err) {
            console.log(err);
            reject(err);
        } else {
            resolve();
        }
        exports.spinnerStop();
    });
});
