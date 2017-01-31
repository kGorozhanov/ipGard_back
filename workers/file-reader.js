var fs = require('fs');
var Document = require('./../model/document/document-facade');
var async = require('async');

module.exports = function (hours, minutes) {
    setInterval(function () {
        var date = new Date();
        if (date.getHours() === hours && date.getMinutes() === minutes) {
            console.log('starting search files')
            scan();
        }
    }, 60000);
}
function scan() {
    fs.readdir('uploads', function (err, items) {
        async.eachSeries(items, (item, asyncdone) => {
            Document.find({ fields: { $elemMatch: { 'value.filename': item } } })
                .then(docs => {
                    if (docs.length) {
                        asyncdone();
                    } else {
                        fs.unlink('uploads/' + item, (err) => {
                            if (err) throw err;
                            console.log('successfully deleted ' + item);
                            asyncdone();
                        });
                    }
                })
                .catch(err => asyncdone(null, err));
        }, (err) => {
            console.log(err);
        });
    });
}
