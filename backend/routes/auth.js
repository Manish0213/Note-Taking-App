const express = require("express");
const router = express.Router();
const User = require('../models/authSchema.js');
const upload = require('../middleware/multer.middleware.js');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUserMiddleware.js');

const SECRET_KEY = "I M SECRET";
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));

router.post("/signup", upload.single('imagePath'), async(req, res) => {
  const { name, email, password, cPassword } = req.body;
  const isExist = await User.findOne({ email });
  if(isExist){
    return res.status(404).json("user already exists");
  }
  if(password!==cPassword){
    return res.status(470).json("Password and confirm password do not match");
  }
  const imageFile = req.file;
  const user = new User({name,email,password,imagePath: imageFile ? imageFile.filename : null});
  // const user = new User({name,email,password});
  const newUser = await user.save();

  const payload = {
    user: {
      id: newUser._id
    }
  };
  const authToken = jwt.sign(payload,SECRET_KEY);
  res.status(200).json({authToken});
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({email});
  if(!user){
    return res.status(400).json({success: false, messeage: "Signin failed"});
  }
  if(user.password !== password) {
    return res.status(400).json({success: false, messeage: "Signin failed"});
  }
  else{
    const payload = {
      user: {
        id: user._id
      }
    };
    const authToken = jwt.sign(payload,SECRET_KEY);
    res.status(200).json({success: true, authToken});
  }
});

router.get('/userinfo', fetchUser, async (req,res) => {
  console.log(req.user.id);
  const user = await User.findOne({_id : req.user.id});
  console.log(user);
  res.status(200).json(user);
})
module.exports = router;
