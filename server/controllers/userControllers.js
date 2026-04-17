const User = require("../models/User");
const bcrypt = require("bcryptjs");
const cloudinary = require("../config/cloudinary");

//get userDetail
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { phone, address } = req.body;
    let updateData = { phone, address };
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.profilePic = result.secure_url;
    }
    const user = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
    });
    res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const changepassword = async (req, res) => {
  try {
    const { currentpassword, newpassword } = req.body;

    if (!currentpassword || !newpassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const isMatch = await bcrypt.compare(currentpassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "password is wrong" });
    }

    const isSamePassword = await bcrypt.compare(newpassword, user.password);

    if (isSamePassword) {
      return res.status(400).json({
        message: "new password cannot be same as current password",
      });
    }

    //generate new password

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newpassword, salt);

    user.password = hashPassword;
    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  changepassword,
};
