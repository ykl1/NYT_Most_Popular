const nyt = require('./api/nyt')

// Makes GET request to Most Popular API (via nyt), returns a JSON string containing
// article metadata
const pullTrendingArticles = callback => {
  nyt.mostPopular((error, response, body) => {
    /**
     * There are a few error-related cases we want you to handle:
     *
     *   1. there is no error and the status code is OK (nice!)
     *   2. the status code is not OK and there might be an error (make your own
     *      new Error with a message and pass that along)
     *   3. the status code is OK but there is an error that should be handled
     *
     * NOTE that "handling" an error in this case means passing it to the
     * callback function
     *
     * Your code goes here
     */
    if (!error && response.statusCode === 200) {
      callback(null, body)
    } else if (response.statusCode !== 200) {
      const err = new Error('Status code is not okay.')
      callback(err)
    } else if (error) {
      const err = new Error('We have an error.')
      callback(err)
    }
  })
}

module.exports = pullTrendingArticles
