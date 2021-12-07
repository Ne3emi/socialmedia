
const Follow = require('../Follow')

exports.addFollow=function (req,res) {
  // body...
  //console.log('did we get the followed username fuck correct'+ req.params.username + `and the 3eer follower id 61a1feded0972eb22aeb0c09: ${req.userId}` );
  let follow = new Follow(req.params.username, req.userId)
  follow.create().then(() => {
    req.flash('success',`You have successfully followed ${req.params.username}`)
    req.session.save(() =>{
      res.redirect(`/profile/${req.params.username}`)
    } )
  }).catch((err) => console.log(err))
}
exports.removeFollow=function (req,res) {
  // body...
  //console.log('did we get the followed username fuck correct'+ req.params.username + `and the 3eer follower id 61a1feded0972eb22aeb0c09: ${req.userId}` );
  let follow = new Follow(req.params.username, req.userId)
  follow.deleteFollow().then(() => {
    req.flash('success',`You have successfully unfollowed ${req.params.username}`)
    req.session.save(() =>{
      res.redirect(`/profile/${req.params.username}`)
    } )
  }).catch((err) => console.log(err))
}