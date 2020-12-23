module.exports = function (io) {
  // catch here

  const express = require('express')
  const router = express.Router()

  const posts = []

  router.get('/list', (req, res) => {
    res.send(posts)
  })

  router.post('/create', (req, res) => {
    posts.push(req.body.data)
    io.emit('newData', req.body.data)
    res.send(posts)
  })

  // ...routes

  return router
}
