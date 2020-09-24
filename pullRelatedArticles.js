const nyt = require('./api/nyt')

// Makes GET request to Search API (in our NYT wrapper), returns an object containing the query and
// the JSON metadata
const pullRelatedArticles = async (query, callback) => {
  // Your code goes here
  try {
    const { response, body } = await nyt.articleSearch(query)
    if (response.statusCode !== 200) {
      throw new Error('Status Code is not okay.')
    }
    callback(null, { query, JSON: body })
  } catch (error) {
    callback(error)
  }
}

module.exports = pullRelatedArticles
