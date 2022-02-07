let Post = require('../Post')
const { login } = require('./userController')
exports.viewPostScreen=function(req,res){
  res.render('create-post')
}
exports.apiCreate=function (req,res) {
  let post = new Post(req.body,req.apiId._id)
  post.createPost().then(()=>{
    res.json('post is successfully created')
  }).catch((err)=>res.json(err))
}
exports.create=function(req,res){
  let post = new Post(req.body,req.session.user._id)
  
  
  
  post.createPost().then(()=>{
    
    req.flash('success','post is successfuly created')
    req.session.save(() => {
      res.redirect(`/profile/${req.session.user.username}`)
    })
  }).catch((e)=>{
    res.send(e)
  })
}
  
exports.viewSingle= async function(req,res){
  
  try{
    
 let post=  await Post.viewOne(req.params.id,req.userId)
   // console.log('post.isauthor '+post.isAuthor)
    res.render('view-single',{post:post})
    
    
  }
  catch(e){
    res.render('404')
    
  }
}
exports.viewEditScreen= async function(req,res){
  
  try{
    
 let post=  await Post.viewOne(req.params.id)
  
    res.render('view-edit',{post:post})
    
    
  }
  catch(e){
    res.render('404')
    
  }
}

exports.update=function(req,res){
 
    
  let post = new Post(req.body,req.userId,req.params.id)
  post.updatePost().then((status)=>{
    
     if (status=='success'){
       req.flash('success', 'the post is successfully updated')
       req.session.save(()=>{
         res.redirect(`/post/${req.params.id}`)
       })
     }
  //  post.updatePost().then((status)=>{
      
   // }).catch()
  
   }).catch((err)=>{
     res.send('not author')
   })
  

}
exports.delete=function(req,res){
  Post.deletePost(req.params.id).then(()=>{
    req.flash('success','Post is successfully deleted')
    req.session.save(()=>res.redirect(`/profile/${req.session.user.username}`))
  }).catch(()=>{
    res.render('404')
  })
}
exports.postSearch=function(req,res){
  console.log(`query result ${req.body.searchTerm}`)
  Post.searchPost(req.body.searchTerm).then((postsResultsb)=>{
    //console.log('query succeeded');
    postsResultsb.forEach((x)=>{
      console.log(x);
    })
    res.json(postsResultsb)
  }).catch(() => {
    res.json([])
  })
}