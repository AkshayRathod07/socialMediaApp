const Post = require("../models/Post");

exports.createPost = async (req, res) => {
    try {
    //   const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    //     folder: "posts",
    //   });
      const newPostData = {
        caption: req.body.caption,
        image: {
          public_id: "myCloud.public_id",
          url: "myCloud.secure_url",
        },
        owner: req.user._id,
      };
  
      const newPost = await Post.create(newPostData);
  
    //   const user = await User.findById(req.user._id);
  
    //   user.posts.unshift(post._id);
  
    //   await user.save();
      res.status(201).json({
        success: true,
        message: "Post created",
        post: newPost,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };