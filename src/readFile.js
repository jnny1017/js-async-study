const fs = require('fs');

export const readFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
            }

            resolve(data);
        });
    });
};
