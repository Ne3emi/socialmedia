const userCollection = require('./db').db().collection("users")
let User = function(data){
  this.data=data
  this.id
  //to later store the id from the login function in find user document in mongo and access it from controller
  this.errors=[]
  //this function. is the constructor which will assign each key to its value .. and then when we instantiate a new instance u just put arguments
  
}
User.prototype.validate= function (){
  return new Promise(async(resolve,reject)=>{
    if (this.data.username == '') {
      this.errors.push('invalid user')
      //prototype will not be stored in. each new user its not unique it has this check function and it will return unique errors which will be stored in new object
    }
    if (this.data.email == '') {
      this.errors.push('invalid email')
    }
    if (this.data.password == '') {
      this.errors.push('invalid password')
    }
    let isExisted = await userCollection.findOne({ username: this.data.username })
    
    if (isExisted) {
      
      this.errors.push('username is existed')
    }
    resolve()
    })
  }
  
User.prototype.login=function(check){
  userCollection.findOne({username:this.data.username}, (err,attempt)=>{
    //find one is going to find username equals to req.body.username and store it in attempt
    
    if(attempt&&attempt.password==this.data.password){
      //if it's there
      this.id=attempt._id
      //attempt has the document of the user with all its key pairs including id so we store it in this.id to access it from the controller
      check('correct')
      //send correct back to the param there
      
    }else{
      check('wtf!')
     
    }
  })
}
User.prototype.register =function(){
  return new Promise(async(resolve,reject)=>{
    await this.validate()
 if(!this.errors.length){
   await userCollection.insertOne(this.data,(err,info)=>{
   console.log(JSON.stringify(info));
   resolve(info.insertedId)
   })
   
 }else{
   reject(this.errors)
 }
  })
 
}
User.findUser=function(userUrl){
 // console.log('this is passed user '+userUrl);
  return new Promise(function(resolve,reject){
    userCollection.findOne({username:userUrl}).then(function(founded){
      if(founded){
        
      
     // console.log(founded);
      resolve(founded)
      }else{
        reject()
      }
    }).catch(function(){
      reject()
    })
  })
  
  
}
module.exports=User
