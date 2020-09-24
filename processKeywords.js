// import map from 'async/map';
const async = require('async')

const pullRelatedArticles = require('./pullRelatedArticles')

// Gets related article metadata for each of the keywords in the array,
// passing an array of objects to the callback

const processKeywords = (topKeywords, callback) => {
  async.map(topKeywords, pullRelatedArticles, callback)
}

module.exports = processKeywords
