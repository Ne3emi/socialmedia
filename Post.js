const userCollection = require('./db').db().collection("posts") 
const followsCollection = require('./db').db().collection("follows") 

const ObjectId =require('mongodb').ObjectId
let Post = function(data,userId,requestedPostId){
  this.data=data
  this.errors=[]
  this.userId=userId
  //pulled from the session, and passed as arg in new post
  this.isAuthor
  this.requestedPostId=requestedPostId
}
Post.prototype.cleaneUp=function(){
  this.data={
    title:this.data.title,
    body:this.data.body,
    createdData:new Date(),
    author:ObjectId(this.userId)
  }
}
Post.prototype.validate=function(){
  if(this.data.title==''){
    this.errors.push('You cant leave the field empty')
    //console.log(this.userId);
  }
  if(this.data.body==''){
    this.errors.push('You cant leave the field empty')
  }
}
Post.prototype.createPost=function(){
  return new Promise(async(resolve,reject)=>{
  this.cleaneUp()
  this.validate()
  if(!this.errors.length){
  await userCollection.insertOne(this.data)
  resolve()
  }else{
    reject(this.errors)
  }
  })
  
}
Post.viewOne=function(id,userId){
  return new Promise(async function(resolve, reject){
   
   let posts =await userCollection.aggregate([
     {$match: {_id:new ObjectId(id)}},
     {$lookup:{from:'users',localField:'author',foreignField:'_id',as:'authorLook'}},
     {$project:{
       title:1,
       body:1,
       createdData:1,
       theAuthor:'$author',
       author:{$arrayElemAt:['$authorLook',0]}
     }
     //this will convert authorLook array into object and store it in author,
       
     }
     ]).toArray()
     //we got all the required fields but nested in objects and mess, we will rearrange them with map
     posts[0].isAuthor=posts[0].theAuthor.equals(userId)
     if(posts.length){
       resolve(posts[0])
       
       
     }else{
       
       reject()
         
       
       
     }
   })

  
}
Post.prototype.updatePost=  function(){
  return new Promise(async(resolve,reject)=>{
  let post = await Post.viewOne(this.requestedPostId,this.userId)
  if (post.isAuthor){
    let status = await this.actuallyUpdate()
   resolve(status);
  }else{
    reject()
  }
  })
      
}
Post.prototype.actuallyUpdate=function(){
  return new Promise(async(resolve,reject)=>{
    this.cleaneUp()
    this.validate()
    if(!this.errors.length){
      await userCollection.findOneAndUpdate({_id:new ObjectId(this.requestedPostId)},{$set:{title:this.data.title,body:this.data.body}})
     // console.log(`id: ${this.requestedPostId} title: ${this.data.title}`);
      resolve('success')
    }else{
      resolve('null')
    }
    
  })
}
    
    Post.findAllPosts=function(authorId){
  return new Promise(async function(resolve, reject){
   // console.log('findAllposts authorId: '+authorId)
   // console.log('findAllposts this.userId: '+this.userId);
   let posts =await userCollection.aggregate([
     {$match: {author:authorId}},
     {$sort:{createdData:-1}},
     {$lookup:{from:'users',localField:'author',foreignField:'_id',as:'authorLook'}},
     {$project:{
       title:1,
       body:1,
       createdData:1,
       author:{$arrayElemAt:['$authorLook',0]}
     }
     //this will convert authorLook array into object and store it in author,
       
     }
     ]).toArray()
     //we got all the required fields but nested in objects and mess, we will rearrange them with map
    // console.log('findAllposts posts length: '+posts.length);
    //console.log('those are the fucking posts by user id: '+ posts);
    posts.forEach((x)=>{
     // console.log(x);
    })
       resolve(posts)
       
      
       
     
   })

  
}
    
Post.deletePost=function(postId){
  return new Promise(async(resolve,reject)=>{
    await userCollection.deleteOne({_id:new ObjectId(postId)})
    resolve();
  })
}
Post.searchPost=function(searchTerm){
  return new Promise(async(resolve,reject)=>{
    let postsResults = await userCollection.aggregate([
     {$match: {$text:{$search:searchTerm}}},
     {$lookup:{from:'users',localField:'author',foreignField:'_id',as:'authorLook'}},
     {$project:{
       title:1,
       body:1,
       createdData:1,
       author:{$arrayElemAt:['$authorLook',0]}
     }
     //this will convert authorLook array into object and store it in author,
       
     },
     {$sort:{score:{$meta:'textScore'}}},
     ]).toArray()
     /*
     postsResults.forEach((x)=>{
       console.log(x);
     })
     */
     resolve(postsResults)
     
  })
  
}
Post.postCount = function (id) {
  return new Promise(async(resolve,reject) =>{
    let count = await userCollection.countDocuments({author:id})
    resolve(count)
  } )
  // body...
}
Post.getFeed= async function(userId){
  let followedUsers =await followsCollection.find({follower:new ObjectId(userId)}).toArray()
  followedUsers = followedUsers.map((x) =>{
    return x.followed
  } )
  //followedUsers.forEach((x) =>console.log(x))
  return new Promise(async(resolve,reject) =>{
    let feed = await userCollection.aggregate([ 
     {$match:{author:{$in:followedUsers}}},
   //  {$match: {author:followedUsers}},
     {$lookup:{from:'users',localField:'author',foreignField:'_id',as:'authorLook'}},
     {$project:{
       title:1,
       body:1,
       createdData:1,
       author:{$arrayElemAt:['$authorLook',0]}
     }
     //this will convert authorLook array into object and store it in author,
       
     },
     {$sort:{createdData:-1}}
     ]).toArray()
     console.log(feed.length);
     feed.forEach((x) =>console.log(x) )
    resolve(feed)
  } )
  
}
module.exports=Post