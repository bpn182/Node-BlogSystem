var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var Post = require('../app/models/post');
var Comment = require('../app/models/comment');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get('/', function(req,res){
	res.send('server is responding');
});

router.post('/addblog', function(req,res){
	var post = new Post();
	post.name = req.body.name;
	post.blog = req.body.blog;

	post.save(function(err){
		if(err)
			res.send(err);
	})
});

router.get('/getblog',function(req,res){
Post
  .find({})
  .populate('comments')
  .exec(function(err, post) {
    if(err) console.log(err);
    //res.send(post);
    res.render('comments',{commentlist : post});
  }) 

});



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

	res.send(comments);
});


router.get('/getpost', async(req,res)=>{
	Post.find({},function(err,post){
		if(err) res.send(err);
		res.render('comments',{commentlist : post});
		//res.json(post);

	});

});

router.get('/showcomments/:id',function(req,res){
Post
  .findById({_id: req.params.id})
  .populate('comments')
  .exec(function(err, post) {
    if(err) console.log(err);
    //this will log all of the users with each of their posts 
    res.send(post);
  }) 

	});



router.get('/displaycomments/:id',function(req,res){
    Post.findById(req.params.id, function (err, postDetail) {
        if (err) {
          console.log(err);
        } else {
            Comment.find({'post':req.params.id}, function (err, comments) {
            	//res.json(comments);
              res.render('displaycomments', { postDetail: postDetail, comments: comments });
            });
        }
    }); 
});      //this will log all of the users with each of their posts 
    
router.get('/displayallcomments', async(req,res)=>{
	Post.find({},function(err,postDetail){
		if(err) res.send(err);
		 Comment.find({},function(err,comments){
    	 res.render('displaycomments', { postDetail: postDetail, comments: comments });

		 });
		//res.render('comments',{commentlist : post});
		//res.json(post);

	});

});


	






module.exports = router;
