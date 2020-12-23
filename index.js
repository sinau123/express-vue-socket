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

const postRouter = require('./post')(io)

app.use(cors())

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

app.use('/post', postRouter)

io.on('connection', (socket) => {
  console.log('a user connected')
})

server.listen(3030, () => {
  console.log('listening on *:3000')
})
