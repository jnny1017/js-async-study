const fs = require('fs');
const fs_promise = fs.promises;

export const readFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            }

            resolve(data);
        });
    });
};
