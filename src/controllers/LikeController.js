const Post = require('../Models/Post');

module.exports = {

    async store(req,res){
        const post = await Post.findById(req.params.id);
        
        // a cada vez que é chamado, incrementa o like
        post.likes += 1;
        
        await post.save();

        req.io.emit('like', post);

        return res.json(post);
    }
};