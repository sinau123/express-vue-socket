const http = require('http')
const app = require('express')()
const server = http.createServer(app)
const cors = require('cors')

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
})
const bodyParser = require('body-parser')

app.use(cors())

// parse application/json
app.use(bodyParser.json())

const posts = []
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

app.get('/post/list', (req, res) => {
  res.send(posts)
})

app.post('/post/create', (req, res) => {
  posts.push(req.body.data)
  io.emit('newData', req.body.data)
  res.send(posts)
})

io.on('connection', (socket) => {
  console.log('a user connected')
})

server.listen(3030, () => {
  console.log('listening on *:3000')
})
