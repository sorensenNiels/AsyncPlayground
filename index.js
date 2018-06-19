const async = require('async');

const items = {
    id1: { name: 'item1', value: 'value1' },
    id2: { name: 'item2', value: 'value2' },
    id3: { name: 'item3', value: 'value3' },
    id4: { name: 'item4', value: 'value4' },
    id5: { name: 'item5', value: 'value5' },
    id6: { name: 'item6', value: 'value6' }
};

const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const processItems = (items, progressCallback) => {
    return new Promise((resolve, reject) => {
        async.mapValuesLimit(items, 1, async (value, key) => {
            await timeout(1000);
            progressCallback(value, key);
            console.log('Response...', value);
            return value;
        }, (err, result) => {
            if (err) reject(err);
            console.log('Result...', result);
            resolve(result);
        });
    });
};

console.log("Before loop");
processItems(items, (value, key) => { console.log('Progress...', value, key); })
    .then((result) => {
        console.log('Success...', result);
    })
    .catch((error) => {
        console.log('Error...', error);
    })

// async.forEachOf(items, async (value, key, callback) => {
//     await sleep(1000, () => {
//         console.log(value, key);
//     })
//     callback();
// }, err => {
//     if (err) console.error(err.message);
//     // configs is now a map of JSON data
//     console.log("Done!", arguments);
// });
console.log("After loop");



