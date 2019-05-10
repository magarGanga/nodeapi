const express = require('express');
const { 
        getPosts,
        createPost,
        postByUser,
        postById,
        isPoster,
        updatePost,
        deletePost
        
         } = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const { createPostValidator } = require('../validator');
const { userById } = require("../controllers/user");

const router = express.Router();

router.get('/posts', requireSignin, getPosts);
router.post('/post/new/:userId', requireSignin, createPost, createPostValidator);
router.get('/post/by/:userId', requireSignin, postByUser);
router.put('/post/:postId', requireSignin, isPoster, updatePost);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);



//any route containing : userid, our app will first execute userByid()
router.param("userId", userById);

//any route containing: postId, our app will first execute postById()
router.param("postId", postById)


module.exports = router;