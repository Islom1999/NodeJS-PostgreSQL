
const express = require('express')
require('dotenv').config()

const server = express()

server.use(express.json())
 
server.use('/api', require('./routes'))

const PORT = process.env.PORT || 5000
server.listen(PORT, (err) => {
    if(err) throw err 
    console.log(`server run: ${PORT}`) 
})

