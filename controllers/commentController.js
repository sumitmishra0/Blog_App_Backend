// import model

const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

// Business logic here

exports.createComment = async (req, res) => {
    try {
        const { post, user, body } = req.body;
        // Create a comment object
        const comment = new Comment({
            post, user, body
        });

        // save the new Comment in database
        const saveComment = await comment.save();

        // find the post by ID, add the new comments to its comment array
        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { comments: saveComment._id } }, { new: true, })
        .populate("comments") //populate the comments array with comment documents 
        .exec();

        res.json({
           post : updatedPost,
        });
    } catch (error) {
        return res.status(500).json({
            error : "Error while creating comments"
        });
    }
}