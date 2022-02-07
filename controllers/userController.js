//herr we control models and views

const User = require('../User')
//we require user model to send back errors to the view
const Post = require('../Post')
const Follow = require('../Follow')
const jwt = require('jsonwebtoken')
exports.isFollowing= async function(req,res,next){
  let isOwnProfile = false
  let isHeFollowing = false
  if (req.session.user){
    isOwnProfile=req.profile._id.equals(req.userId)
    isHeFollowing= await Follow.checkFollow(req.profile._id,req.userId)
  }
  let postsCountPromise = Post.postCount(req.profile._id)
  let followersCountPromise = Follow.followersCount(req.profile._id)
  let followingCountPromise = Follow.followingCount(req.profile._id)
  let [postsCount,followersCount,followingCount] = await Promise.all([postsCountPromise,followersCountPromise,followingCountPromise])
  console.log(postsCount,followersCount,followingCount);
  req.followersCount=followersCount
  req.postsCount=postsCount
  req.followingCount=followingCount
  req.isFollowing=isHeFollowing
  req.isHisProfile=isOwnProfile
  
  next()
}
exports.mustBeLoggedIn=function(req,res,next){
  if(req.session.user){
    next()
  }else{
    req.flash('errors','you must be signed in to perform this action')
    req.session.save(function(){
      res.redirect('/')
    })
  }
}
exports.login=function (req,res){
  let user = new User(req.body)
  // take the username . andd password to the user object 
  user.login(function (result){
    
  //login is a method we created in the object user and we will pass result and will get its value if the password Match or not
  if(result=='correct'){
    req.session.user={
      username:user.data.username,
      _id:user.id
      //we are adding a new key to the session object called user and we are storing in it another object which has the key of _id which has in it the user.id value from the user model
    }
    // session is an object mounted on the req object we can store in it any key value pair and access it later or destroy it, here we are storing the username from the req only if the user and password are correct, so later in the home. view we can chose which view to show
  

    res.redirect('/')
    //if the username match run the session
  }else{
    req.flash('errors',result)
    //if the password didnt match save'wtf' in array errorz
    req.session.save(function(){
      
      res.redirect('/')
    })
    
  }
    
  })

  
}
exports.apiMustLogged=function(req,res,next){
  try {
    req.apiId=jwt.verify(req.body.token,process.env.JWTSECRET)
    next()
  } catch (error) {
    res.json('wrong token')
  }
}
exports.apiLogin=function (req,res){
  let user = new User(req.body)
  // take the username . andd password to the user object 
  user.login(function (result){
    
  //login is a method we created in the object user and we will pass result and will get its value if the password Match or not
  if(result=='correct'){
    
  res.json(jwt.sign({_id:user.id},process.env.JWTSECRET))
  
  }else{
    res.json(`false`)
    
  }
    
  })

  
}



exports.register=  async function(req,res){
  let user1 = new User(req.body)
  //the html form action is pointing to /register where the input will be submitted and we can get it here via req.body and pass it to new user as argument. as we know we don't have to. define keys and. values all over in new object
  try{
 await user1.register().then(()=>{
    req.session.user={username:user1.data.username,_id:user1.id}
    req.session.save(function() {
      res.redirect('/')
    })
  })
  }
  catch(regErrors){
    regErrors.forEach((x)=>{
      req.flash('regErrors',x)
    })
    req.session.save(function() {
      res.redirect('/')
    })
    
  }
  //run the new user function which checks for errors 
  
  
    
  
  
  
    
  
}

exports.signout=function(req,res){
  req.session.destroy()
  res.redirect('/')
}


exports.home = async function (req,res){
  if(req.session.user){
    let posts = await Post.getFeed(req.session.user._id)
    //console.log(`posts length = ${posts.length}`);
    res.render('dashboard',{posts:posts})
    //for ejs render can accept second arg to be passed in it
  }else{
    res.render('home-view',{errors:req.flash('errors'),regErrors:req.flash('regErrors')})
    //pass error in this method  so it will appear once only
  //we export the view to the router
  }
  
}
exports.isUser=function(req,res,next){
 // console.log(req.params.username);
  User.findUser(req.params.username).then(function(userDoc){
   // console.log('this is passed doc'+userDoc);
    req.profile=userDoc
    next()
  }).catch(function(){
    res.render('404')
  })
  
  
}

exports.userPosts=function(req,res){
  
  Post.findAllPosts(req.profile._id).then(function(posts){
    
    console.log(`from profile screen, no of followers: `);
    res.render('profile',{
      tab:'profile',
      count:{postsCount:req.postsCount,followersCount:req.followersCount,followingCount:req.followingCount},
      username:req.profile.username,
      posts:posts,
      isFollowing:req.isFollowing,
      isHisProfile:req.isHisProfile
    })
    
  }).catch(function(){
    res.render('404')
  })
  
}
exports.userFollowers= function(req,res){   
  Follow.findFollowers(req.profile._id).then((followersRes) => {
    console.log(`followers length is ${followersRes.length}`);
    //let followersLength=followersRes.length
    res.render('followersScreen',{
      //followersLength:followersRes.length,
     count:{postsCount:req.postsCount,followersCount:req.followersCount,followingCount:req.followingCount},
      tab:'followers',
      username:req.profile.username,
      followers:followersRes,
      isFollowing:req.isFollowing,
      isHisProfile:req.isHisProfile
    })
  /*  followersRes.forEach((arg) => {
      console.log(arg.username);
    })*/
 
    }).catch((err) => {
      res.send(err)
    })
    
    /*
    res.render('followersScreen',{
      username:req.profile.username,
      followers:followers,
      isFollowing:req.isFollowing,
      isHisProfile:req.isHisProfile
    })*/
    
 
}
exports.userFollowing= function(req,res){   
  Follow.findFollowing(req.profile._id).then((followingRes) => {
    //let followinLength=followersRes.length
   // console.log(followingRes.length);
   //console.log(`following length is ${followingRes.length}`);
    res.render('followingScreen',{
      //followingLength:followingRes.length,
      count:{postsCount:req.postsCount,followersCount:req.followersCount,followingCount:req.followingCount},
      tab:'following',
      username:req.profile.username,
      following:followingRes,
      isFollowing:req.isFollowing,
      isHisProfile:req.isHisProfile
    })
  /*  followersRes.forEach((arg) => {
      console.log(arg.username);
    })*/
 
    }).catch((err) => {
      res.send(err)
    })
    
    /*
    res.render('followersScreen',{
      username:req.profile.username,
      followers:followers,
      isFollowing:req.isFollowing,
      isHisProfile:req.isHisProfile
    })*/
    
 
}