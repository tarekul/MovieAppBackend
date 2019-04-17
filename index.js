const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const {movieRoute} = require('./routes/movies')

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/movies',movieRoute)

app.listen(7000,()=>{
    console.log(`listening on 7000`)
})