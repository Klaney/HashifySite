var db = require('./models');

console.log('test db here');

db.links.create({
    url: 'Brian',
    hash: 'Hague'
}).then(function(link) {
    console.log(link.get());
});