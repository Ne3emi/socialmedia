const express=require('express')
const flash = require('connect-flash')
//will display a message then disappear from database once visited
const app = express()
const session = require('express-session')
//to save cookie so the user doesn't have to sign. in. Everytime
const MongoStore = require('connect-mongo')
//to save the cookie in the database
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/api',require('./router-api'))
let firstSession = session({
  //activate cookie
  secret:'fuck off',
  store: MongoStore.create({client:require('./db')}),
  //store it to the client were we export from db
  resave:'false',
  saveUninitialized:'false',
  cookie: {maxAge: 1000*60*60*24,httpOnly:true}
  //cookie duration
})
app.use(flash())
app.use(firstSession)
//use the cookie in the routes
app.use(function(req,res,next){
  res.locals.success=req.flash('success')
  res.locals.errors=req.flash('errors')
  if(req.session.user){
    req.userId=req.session.user._id
  }else{
    req.userId=0
  }
  res.locals.user=req.session.user
  next()
})
app.use(express.static('public'))
// we will aVail the folder public to all routes
app.set('views','views')
//we will set the views of express to the views folder 
app.set('view engine','ejs')
//we will set the view engine to ejs
app.use(express.urlencoded({extended:false}))
app.use(express.json())
const router = require('./router')
//we will import the router object by requiring it and then call it below in app use
app.use('/',router)
//here router will run on any url that starts with / .. and router has its own methods to run each route and use the constoller as the res req function

const server = require('http').createServer(app)
const io = require('socket.io')(server)
/*io.use(function (socket,next) {
 sessionOptions(socket.session.request,socket.session.request.res,next)
  
  // body...
})*/
io.on('connection',(socket) => {

  socket.on('msgFromBrowser',(data) => {
  console.log(data.message);
   socket.broadcast.emit('msgFromServer',{message:data.message})
    
  })
  
  console.log('user connected')})
  
module.exports=server