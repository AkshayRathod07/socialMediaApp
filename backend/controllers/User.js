const User = require("../models/User");

exports.register = async (req, res) => {
    try {
      const { name, email, password, avatar } = req.body;
  
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });
      }
  
    //   const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    //     folder: "avatars",
    //   });
  
      user = await User.create({
        name,
        email,
        password,
        avatar: { public_id: 'myCloud.public_id', url: 'myCloud.secure_url' },
      });
  
      const token = await user.generateToken();
  
      const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
  
      res.status(201).cookie("token", token, options).json({
        success: true,
        user,
        token,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };    


  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email })
        .select("+password")
        // .populate("posts followers following");
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User does not exist",
        });
      }
  
      const isMatch = await user.matchPassword(password);
  
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Incorrect password",
        });
      }
  
      const token = await user.generateToken();
  
      const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
  
      res.status(200).cookie("token", token,options).json({
        success: true,
        user,
        token,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };