const http = require('http')
const path = require('path')
const express = require('express')
const compression = require('compression')
const fetch = require('node-fetch')



/********************************

          DexPairs.xyz

*********************************/
/*        Dorian Bayart         */
/*             2021             */
/********************************/


/*
* Frontend server
*
* Fetch JSON from backend
* Expose some public URLs
*/

const DOMAIN_NAME = 'dexpairs.xyz'
const BACKEND_URL = 'http://localhost:3000'


// Pancake data
let tokens_list = {}
let top_tokens = {}
let tokens_data = {}
let tokens_charts = {}

// Uniswap data
let uniswap_list = {}
let uniswap_top = {}
let uniswap_data = {}
let uniswap_charts = {}

// Sushiswap data
let sushiswap_list = {}
let sushiswap_top = {}
let sushiswap_data = {}
let sushiswap_charts = {}

// Honeyswap data - xDai
let honeyswap_list = {}
let honeyswap_top = {}
let honeyswap_data = {}
let honeyswap_charts = {}




// Program - Pancake
function launch() {
  fetch(BACKEND_URL + '/list/pancake')
  .then(res => res.json())
  .then(json => tokens_list = json)

  fetch(BACKEND_URL + '/top/pancake')
  .then(res => res.json())
  .then(json => top_tokens = json)

  fetch(BACKEND_URL + '/simple/pancake')
  .then(res => res.json())
  .then(json => tokens_data = json)

  fetch(BACKEND_URL + '/charts/pancake')
  .then(res => res.json())
  .then(json => tokens_charts = json)

  // loop
  setTimeout(function(){ launch() }, getTimer())
}

// Program - Uniswap
function launchUniswap() {
  fetch(BACKEND_URL + '/list/uniswap')
  .then(res => res.json())
  .then(json => uniswap_list = json)

  fetch(BACKEND_URL + '/top/uniswap')
  .then(res => res.json())
  .then(json => uniswap_top = json)

  fetch(BACKEND_URL + '/simple/uniswap')
  .then(res => res.json())
  .then(json => uniswap_data = json)

  fetch(BACKEND_URL + '/charts/uniswap')
  .then(res => res.json())
  .then(json => uniswap_charts = json)

  // loop
  setTimeout(function(){ launchUniswap() }, getTimer())
}

// Program - Sushiswap
function launchSushiswap() {
  fetch(BACKEND_URL + '/list/sushiswap')
  .then(res => res.json())
  .then(json => sushiswap_list = json)

  fetch(BACKEND_URL + '/top/sushiswap')
  .then(res => res.json())
  .then(json => sushiswap_top = json)

  fetch(BACKEND_URL + '/simple/sushiswap')
  .then(res => res.json())
  .then(json => sushiswap_data = json)

  fetch(BACKEND_URL + '/charts/sushiswap')
  .then(res => res.json())
  .then(json => sushiswap_charts = json)

  // loop
  setTimeout(function(){ launchSushiswap() }, getTimer())
}

// Program - Honeyswap
function launchHoneyswap() {
  fetch(BACKEND_URL + '/list/honeyswap')
  .then(res => res.json())
  .then(json => honeyswap_list = json)

  fetch(BACKEND_URL + '/top/honeyswap')
  .then(res => res.json())
  .then(json => honeyswap_top = json)

  fetch(BACKEND_URL + '/simple/honeyswap')
  .then(res => res.json())
  .then(json => honeyswap_data = json)

  fetch(BACKEND_URL + '/charts/honeyswap')
  .then(res => res.json())
  .then(json => honeyswap_charts = json)

  // loop
  setTimeout(function(){ launchHoneyswap() }, getTimer())
}




/* MAIN */
setTimeout(function(){ launchUniswap() }, 2000)
setTimeout(function(){ launchSushiswap() }, 4000)
setTimeout(function(){ launchHoneyswap() }, 6000)
setTimeout(function(){ launch() }, 8000)





/* server */
const port = process.env.PORT || 3001
const app = express()
app.use(compression())

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')))
app.get('/wallet', (req, res) => res.sendFile(path.join(__dirname, '/wallet.html')))
app.get('/public/common.js', (req, res) => res.sendFile(path.join(__dirname, '/public/common.js')))
app.get('/public/script.js', (req, res) => res.sendFile(path.join(__dirname, '/public/script.js')))
app.get('/public/wallet.js', (req, res) => res.sendFile(path.join(__dirname, '/public/wallet.js')))
app.get('/public/footer.css', (req, res) => res.sendFile(path.join(__dirname, '/public/footer.css')))
app.get('/public/design.css', (req, res) => res.sendFile(path.join(__dirname, '/public/design.css')))
app.get('/public/responsive.css', (req, res) => res.sendFile(path.join(__dirname, '/public/responsive.css')))
app.get('/public/colors.css', (req, res) => res.sendFile(path.join(__dirname, '/public/colors.css')))
app.get('/public/wallet.css', (req, res) => res.sendFile(path.join(__dirname, '/public/wallet.css')))
app.get('/public/wallet-responsive.css', (req, res) => res.sendFile(path.join(__dirname, '/public/wallet-responsive.css')))
app.get('/public/graph-background-min.png', (req, res) => res.sendFile(path.join(__dirname, '/public/graph-background-min.png')))

app.get('/lib/chart.min.js', (req, res) => res.sendFile(path.join(__dirname, '/lib/chart.min.js')))
app.get('/lib/chartjs-adapter-moment.js', (req, res) => res.sendFile(path.join(__dirname, '/lib/chartjs-adapter-moment.js')))
app.get('/lib/moment.min.js', (req, res) => res.sendFile(path.join(__dirname, '/lib/moment.min.js')))
app.get('/lib/require.js', (req, res) => res.sendFile(path.join(__dirname, '/lib/require.js')))
app.get('/lib/web3.min.js', (req, res) => res.sendFile(path.join(__dirname, '/lib/web3.min.js')))

// Pancake URLs
app.get('/pancake/token/:token', (req, res) => {
  if(
    Object.keys(tokens_data).includes(req.params.token) ||
    Object.keys(tokens_data).findIndex(address => tokens_data[address].s === req.params.token) !== -1
  ) {
    res.sendFile(path.join(__dirname, '/index.html'))
  } else {
    // TODO Improve error => redirect to homepage
    res.writeHead(400, {'Content-Type': 'text/html'})
    res.end('This token does not exist !')
  }
})

app.get('/pancake/list', (req, res) => res.json(listFilter(tokens_list, tokens_data)))
app.get('/pancake/top', (req, res) => res.json(top_tokens))
app.get('/pancake/simple', (req, res) => res.json(listFilter(tokens_data, tokens_data)))
app.get('/pancake/charts/:token', (req, res) => {
  res.json(tokens_charts[req.params.token])
})
app.get('/pancake/charts/:token/:base', (req, res) => {
  let pair = {}
  pair[req.params.token] = tokens_charts[req.params.token]
  pair[req.params.base] = tokens_charts[req.params.base]
  res.json(pair)
})

// Uniswap URLs - Default
app.get('(/uniswap)?/token/:token', (req, res) => {
  if(
    Object.keys(uniswap_data).includes(req.params.token) ||
    Object.keys(uniswap_data).findIndex(address => uniswap_data[address].s === req.params.token) !== -1
  ) {
    res.sendFile(path.join(__dirname, '/index.html'))
  } else {
    // TODO Improve error => redirect to homepage
    res.writeHead(400, {'Content-Type': 'text/html'})
    res.end('This token does not exist !')
  }
})

app.get('(/uniswap)?/list', (req, res) => res.json(listFilter(uniswap_list, uniswap_data)))
app.get('(/uniswap)?/top', (req, res) => res.json(uniswap_top))
app.get('(/uniswap)?/simple', (req, res) => res.json(listFilter(uniswap_data, uniswap_data)))
app.get('(/uniswap)?/charts/:token', (req, res) => {
  res.json(uniswap_charts[req.params.token])
})
app.get('(/uniswap)?/charts/:token/:base', (req, res) => {
  let pair = {}
  pair[req.params.token] = uniswap_charts[req.params.token]
  pair[req.params.base] = uniswap_charts[req.params.base]
  res.json(pair)
})

// Sushiswap URLs - Default
app.get('(/sushiswap)?/token/:token', (req, res) => {
  if(
    Object.keys(sushiswap_data).includes(req.params.token) ||
    Object.keys(sushiswap_data).findIndex(address => sushiswap_data[address].s === req.params.token) !== -1
  ) {
    res.sendFile(path.join(__dirname, '/index.html'))
  } else {
    // TODO Improve error => redirect to homepage
    res.writeHead(400, {'Content-Type': 'text/html'})
    res.end('This token does not exist !')
  }
})

app.get('(/sushiswap)?/list', (req, res) => res.json(listFilter(sushiswap_list, sushiswap_data)))
app.get('(/sushiswap)?/top', (req, res) => res.json(sushiswap_top))
app.get('(/sushiswap)?/simple', (req, res) => res.json(listFilter(sushiswap_data, sushiswap_data)))
app.get('(/sushiswap)?/charts/:token', (req, res) => {
  res.json(sushiswap_charts[req.params.token])
})
app.get('(/sushiswap)?/charts/:token/:base', (req, res) => {
  let pair = {}
  pair[req.params.token] = sushiswap_charts[req.params.token]
  pair[req.params.base] = sushiswap_charts[req.params.base]
  res.json(pair)
})

// Honeyswap URLs - Default
app.get('(/honeyswap)?/token/:token', (req, res) => {
  if(
    Object.keys(honeyswap_data).includes(req.params.token) ||
    Object.keys(honeyswap_data).findIndex(address => honeyswap_data[address].s === req.params.token) !== -1
  ) {
    res.sendFile(path.join(__dirname, '/index.html'))
  } else {
    // TODO Improve error => redirect to homepage
    res.writeHead(400, {'Content-Type': 'text/html'})
    res.end('This token does not exist !')
  }
})

app.get('(/honeyswap)?/list', (req, res) => res.json(listFilter(honeyswap_list, honeyswap_data)))
app.get('(/honeyswap)?/top', (req, res) => res.json(honeyswap_top))
app.get('(/honeyswap)?/simple', (req, res) => res.json(listFilter(honeyswap_data, honeyswap_data)))
app.get('(/honeyswap)?/charts/:token', (req, res) => {
  res.json(honeyswap_charts[req.params.token])
})
app.get('(/honeyswap)?/charts/:token/:base', (req, res) => {
  let pair = {}
  pair[req.params.token] = honeyswap_charts[req.params.token]
  pair[req.params.base] = honeyswap_charts[req.params.base]
  res.json(pair)
})

app.listen(port, () => console.log(`Frontend start at ${port}`))

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end('Hello World')
})


// useful filtering - filter all tokens with price = 0
function listFilter(list, listWithPrices) {
  let filtered_list = {}
  Object.keys(list).forEach(function (address) {
    if(listWithPrices[address] && listWithPrices[address].p !== 0) {
      filtered_list[address] = list[address]
    }
  })
  return filtered_list
}

// useful Math.random timer - between 15 and 30 seconds
function getTimer() {
   return Math.round((15*Math.random() + 15)*1000)
}
