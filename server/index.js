const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const mysql = require('mysql');
const fs = require('fs')
const app = express()
var bodyParser = require('body-parser');
const corss = require('cors');
app.use(bodyParser.urlencoded({extended: false}));

const connection = {
  host: 'a0418142.xsph.ru',
  user: 'a0418142_pr',
  password: 'iftuveamir',
  database: 'a0418142_pr'
}

const pool = mysql.createPool(connection);
app.use(corss())

require('./routers/index')(app, pool, fs);

const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {

  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(nuxt.render)
 //process.env.PORT
  app.listen(process.env.PORT || port)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
