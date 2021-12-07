const dotenv = require('dotenv')
dotenv.config()
const {MongoClient}=require('mongodb')
//userKey='mongodb://Mohd:mohd@cluster0-shard-00-00.sn9uu.mongodb.net:27017,cluster0-shard-00-01.sn9uu.mongodb.net:27017,cluster0-shard-00-02.sn9uu.mongodb.net:27017/SecondApp?ssl=true&replicaSet=atlas-jhiwks-shard-0&authSource=admin&retryWrites=true&w=majority'
MongoClient.connect(process.env.CONNECTIONSTRING,{useNewUrlParser: true, useUnifiedTopology: true},function(err,client){
  module.exports=client
  //we export this from the db file where else where will requiree db
  const app = require('./app')
  app.listen(process.env.PORT,()=>{
  console.log('server started');
})
  

})