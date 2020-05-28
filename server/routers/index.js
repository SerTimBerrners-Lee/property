const getSections = require('./getSections')
const getPost = require('./post')


module.exports = (app, db, fs) => {
    getSections(app, db, fs);
    getPost(app, db, fs)
}