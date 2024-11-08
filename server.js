const express = require('express');

const app = express();

app.length('/', (req, res)=>{
    res.send('this is working')
})
app.listen(3000,()=>{
    console.log('app is runnnig on port 3000 ');

    })