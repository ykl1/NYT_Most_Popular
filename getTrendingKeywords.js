const async = require('async')
const pullTrendingArticles = require('./pullTrendingArticles')
const countKeywords = require('./countKeywords')
const processKeywords = require('./processKeywords')

// HELPER, don't modify this function
// Prints related article headlines and links from the array of objects
const displayRelatedArticles = (error, relatedArticles) => {
  /* eslint-disable no-console */
  if (error) {
    console.log(error)
    return
  }
  relatedArticles.forEach((articles, i) => {
    console.log('=====================================')
    console.log(`The #${i + 1} trending topic is: ${articles.query}`)
    console.log('Here are ten recent related articles.')
    console.log('===================================== \n')

    const results = JSON.parse(articles.JSON).response.docs
    results.forEach(({ headline: { main }, web_url }, idx) => {
      console.log(`${idx + 1}. ${main}`)
      console.log(`${web_url}\n`)
    })
  })
}

// Final method: try to use async.waterfall. Errors are handled in the callback.
const getTrendingKeywords = callback => {
  async.waterfall([pullTrendingArticles, countKeywords, processKeywords], (error, results) => {
    callback(error, results)
  })
}

// This block allows you to test your code by running
// 'node getTrendingKeywords.js' in your project folder.
// We don't want to run it in a test environment, however,
// so we check the NODE_ENV variable before running it.
if (process.env.NODE_ENV !== 'test') {
  getTrendingKeywords(displayRelatedArticles)
}

module.exports = getTrendingKeywords
