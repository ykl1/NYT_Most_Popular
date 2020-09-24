const fetch = require('node-fetch')
const config = require('./config')

const { apiKey } = config
const queue = []

// indicates whether we are about to close the queue
let isClosing = false

const intervalId = setInterval(() => {
  if (queue.length > 0) {
    isClosing = false
    const fn = queue.shift()
    fn()
    console.log('request processed') // eslint-disable-line no-console
  } else if (!isClosing) {
    // eslint-disable-next-line no-console
    console.log(
      'API request queue empty. Quitting in 5 seconds. Rerun program to make further requests',
    )
    isClosing = true
    setTimeout(() => clearInterval(intervalId), 5000)
  }
}, 1000)

const mostPopular = cb => {
  queue.push(async () => {
    const url = `http://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiKey}`
    try {
      const response = await fetch(url)
      const body = await response.text()
      response.statusCode = response.status
      cb(null, response, body)
    } catch (err) {
      cb(err)
    }
  })
}

const articleSearch = async query => new Promise((resolve, reject) => {
  queue.push(async () => {
    const url = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&sort=newest&api-key=${apiKey}`
    try {
      const response = await fetch(url)
      const body = await response.text()
      response.statusCode = response.status
      resolve({ response, body })
    } catch (err) {
      reject(err)
    }
  })
})

module.exports = {
  mostPopular,
  articleSearch,
}
