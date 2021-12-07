const routerApi = require('express').Router()

routerApi.post('/login',(req,res) => {
  res.json('fuck! this is api');
})

module.exports=routerApi