const express = require('express')
const app = express();
const http = require('http').createServer(app)

const PORT = process.env.PORT || 4000

http.listen(PORT, ()=>{
	console.log(`listening on ${PORT}`)
})

app.use(express.static(__dirname + "/public/"))


app.get('/', (req,res)=>{
	res.sendFile(__dirname + '/public/index.html')
})


// setUp soket io

const io = require('socket.io')(http)

io.on('connection', (socket)=>{
	console.log('connected')
	socket.on('message', (msg)=>{
		socket.broadcast.emit('message', msg)
	})
})



