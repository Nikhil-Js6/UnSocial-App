const Post = require('../models/Post');
const User = require('../models/User');

class PostController {

    async createPost(req, res) {
        const newPost = new Post(req.body);
        try {
            const savedPost = await newPost.save();
            res.status(200).json(savedPost);
        }catch(err) {
            res.status(500).json(err);
        }
    }

    async updatePost(req, res) {
        try{
            const post = await Post.findById(req.params.id);
            if (post.userId === req.body.userId) {
                await post.updateOne({ $set: req.body });
                res.status(200).json({ message: "Post updated successfully" });
            }else {
                res.status(403).json({ message: "You can update only your posts" });
            }
        }
        catch(err){
            res.status(500).json(err);
        }
    }

    async deletePost(req, res) {
        try{
            const post = await Post.findById(req.params.id);
            if (post.userId === req.body.userId)  {
                await post.deleteOne();
                res.status(200).json({ message: "Post deleted successfully" });
            }else {
                res.status(403).json({ message: "You can delete only your posts" });
            }
        }
        catch(err){
            res.status(500).json(err);
        }
    }

    async getPost(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            res.status(200).json(post);
        }catch(err) {
            res.status(500).json(err);
        }
    }

    async likePost(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if (!post.likes.includes(req.body.userId)) {
                await post.updateOne({ $push: { likes: req.body.userId }});
                res.status(200).json({ message: "Post Liked" });
            }else{
                await post.updateOne({ $pull: { likes: req.body.userId }});
                res.status(200).json({ message: "Post Unliked" });
            }
        }catch(err) {
            res.status(500).json(err);
        }
    }

    async getTimeline(req, res) {
        try {
            const currentUser = await User.findById(req.params.userId);
            const userPosts = await Post.find({ userId: currentUser._id });
            const friendPosts = await Promise.all(
                currentUser.followings.map((friendId) => {
                    return Post.find({ userId: friendId });
                })
            );
            res.status(200).json(userPosts.concat(...friendPosts));
        }catch(err) {
            res.status(500).json(err);
        }
    }

    async getUserPosts(req, res) {
        try {
            const user = await User.findOne({ username: req.params.username });
            const posts = await Post.find({ userId: user._id });
            res.status(200).json(posts);
        }catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new PostController();
