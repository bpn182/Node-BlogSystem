var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var Post = require('../app/models/post');
var Comment = require('../app/models/comment');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get('/', function(req,res,next){
	res.send('server is responding');
});

// ======POST ===== //
router.post('/post', function(req,res){
  var post = new Post();
  post.name = req.body.name;
  post.blog = req.body.blog;

  post.save(function(err){
    if(err)
      res.send(err);
  })
  res.redirect("/route2/post")
});



router.get('/post', async(req,res)=>{
	Post.find({},function(err,post){

		if(err) res.send(err);
		res.json(post);
	});

});

router.delete('/post/:postId',function(req,res){
  let id = {_id:req.params.postId}
  Post.findByIdAndRemove(id,function(err,result){
    if(err)
      throw err;
    res.json("deleted sucessfully");
  });
});

router.put('/post/:postId',function(req,res){
  let id = {_id:req.params.postId}
  Post.findById(id,function(err,post){
    if(err)
      throw err;
    post.name = req.body.name;
    post.blog = req.body.blog;

    post.save(function(err){
      if(err)
        throw err;
      res.json("updated sucessfully");
    })
  })  
    
});

// ====All Post with their Comments== //
router.get('/getblog',function(req,res){
Post
  .find({})
  .populate('comments')
  .exec(function(err, post) {
    if(err) console.log(err);
    res.send(post);
  }) 

});



//=====> comments <===//
router.post('/:postId/comment', async(req,res)=>{
  // finding post

  const post = await Post.findOne({_id: req.params.postId})

  //creating comment
  const comment = new Comment();

  comment.name = req.body.name;
  comment.content = req.body.content;
  comment.post = post._id;
  await comment.save();


  //Associate Post with comment
  post.comments.push(comment._id);
  await post.save();

  res.send(comment);

});


router.get('/:postId/comment', async(req,res)=>{
  const post = await Post.findOne({_id: req.params.postId}).populate('comments');
  res.send(post);
}); 

router.delete('/comment/:commentId',function(req,res){
  let id = {_id:req.params.commentId}
  Comment.findByIdAndRemove(id,function(err,result){
    if(err)
      throw err;
    res.json("deleted sucessfully");
  });
});

router.put('/comment/:commentId',function(req,res){
  let id = {_id:req.params.commentId}
  Comment.findById(id,function(err,comment){
    if(err)
      throw err;
    comment.name = req.body.name;
    comment.content = req.body.content;

    comment.save(function(err){
      if(err)
        throw err;
      res.json("updated sucessfully");
    })
  })  
    
});



module.exports = router;