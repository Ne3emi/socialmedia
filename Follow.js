const usersCollection = require('./db').db().collection("users") 
const followsCollection = require('./db').db().collection("follows") 
const ObjectId =require('mongodb').ObjectId
const User = require('./User')

let Follow =function (followedUser,followerId) {
  // body...
  this.followedUser=followedUser
  this.followerId=followerId
  this.followedId
}
Follow.prototype.validate= async function(){
  
    let userFollowed = await usersCollection.findOne({username:this.followedUser})
  if (userFollowed){
    this.followedId=userFollowed._id
    //console.log('this should be fuck user id 617bf721a57c7fb739420f59:  ' + this.followedId);
   
    
  }else{
    
    console.log('followed user not found');
    
  }
}


Follow.prototype.create=function(){
  return new Promise(async(resolve,reject)=>{
   // await this.validate()
    await this.validate()
 
   await followsCollection.insertOne({followed:this.followedId,follower:new ObjectId(this.followerId)})
    resolve()
  })
  
}
Follow.prototype.deleteFollow=function(){
  return new Promise(async(resolve,reject)=>{
   // await this.validate()
    await this.validate()
 
   await followsCollection.deleteOne({followed:this.followedId,follower:new ObjectId(this.followerId)})
    resolve()
  })
  
}


Follow.checkFollow= async function(followedId,followerId){
  let followDoc = await followsCollection.findOne({followed:followedId,follower:new ObjectId(followerId)})
  if (followDoc){
    return true
  }else{
    return false
  }
}
Follow.findFollowers=function(id) {
  return new Promise(async(resolve,reject)=>{
 
    let followers = await followsCollection.aggregate([
      {$match:{followed:id}},
      {$lookup:{from:'users',localField:'follower', foreignField:'_id',as:'followersDoc'}},
      {$project:
      {username:{$arrayElemAt:['$followersDoc.username',0]}}
        
      }
   ] ).toArray()
   
 
     // followers.forEach((x) =>console.log(x.username) )
   resolve(followers)
  
    
  })
}


Follow.findFollowing=function(id) {
  return new Promise(async(resolve,reject)=>{
 
    let followers = await followsCollection.aggregate([
      {$match:{follower:id}},
      {$lookup:{from:'users',localField:'followed', foreignField:'_id',as:'followersDoc'}},
      {$project:
      {username:{$arrayElemAt:['$followersDoc.username',0]}}
        
      }
   ] ).toArray()
   
 
     // followers.forEach((x) =>console.log(x.username) )
   resolve(followers)
  
    
  })
}

Follow.followersCount = function (id) {
  return new Promise(async(resolve,reject) =>{
    let count = await followsCollection.countDocuments({followed:id})
    resolve(count)
  } )
  // body...
}
Follow.followingCount = function (id) {
  return new Promise(async(resolve,reject) =>{
    let count = await followsCollection.countDocuments({follower:id})
    resolve(count)
  } )
  // body...
}
module.exports=Follow