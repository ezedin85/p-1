require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./src/routes')

const app = express();

//middleware
app.use(express.json())
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN
}))

app.use('/api', routes)

//db connection
mongoose.connect(process.env.URL)
.then(()=>{
    app.listen(process.env.PORT, ()=>{console.log("listening on port", process.env.PORT)})
})
.catch(err=>{console.log(err)})
