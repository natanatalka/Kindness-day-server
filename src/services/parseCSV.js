const fs = require('fs');
var csv = require('parse-csv');

exports.parseFile = function (file) {
    var text = fs.readFileSync(file, 'utf8',  (err, data) => {
        if (err) throw err;
    });
    var obj = csv.toJSON(text, {headers: {included: true}});
    return obj;
}

