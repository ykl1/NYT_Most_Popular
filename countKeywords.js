// Counts keyword frequency of articles in the JSON, returns a string
// array of the five most popular keywords

// create an updatable object; where u can add new keys and values.
// parse through the data. After parsing, find the five keywords that appear the most.

const countKeywords = (data, callback) => {
  try {
    const parsedData = JSON.parse(data).results
    const commonWords = {}
    parsedData.forEach(elem => {
      if (!Object.prototype.hasOwnProperty.call(elem, 'adx_keywords')) {
        return
      }
      const words = elem.adx_keywords.trim().split(';')
      words.forEach(word => {
        if (!Object.prototype.hasOwnProperty.call(commonWords, word)) {
          commonWords[word] = 1
        } else {
          commonWords[word] += 1
        }
      })
    })

    const arrCommonWords = []
    let i = 0
    Object.keys(commonWords).forEach(key => {
      const obj = { name: key, value: commonWords[key] }
      arrCommonWords[i] = obj
      i += 1
    })

    arrCommonWords.sort((a, b) => b.value - a.value)

    const topFive = []
    arrCommonWords.some((elem, idx) => {
      topFive[idx] = elem.name
      return (idx >= 4)
    })
    callback(null, topFive)
  } catch (error) {
    callback(error)
  }
}

module.exports = countKeywords
