const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcryptjs");



// Update user

router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err) {
                return res.status(500).json({ err, message: "Can't update password" });
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json({ message: "Account updated successfully" });
        }catch(err) {
            return res.status(500).json({ err, message: "Can't update user" });
        }
    }else {
        return res.status(403).json({ message: "You can update only your account" });
    }
});

// Delete user

router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findOneById(req.params.id);
            user ? User.findByIdAndDelete(req.params.id)
                 : res.status(400).json({ message: "Account doesn't exist" });
            res.status(200).json({ message: "Account deleted Successfully" });
        }catch(err) {
            return res.status(500).json(err);
        }
    }else {
        return res.status(403).json({ message: "You can delete only your account" });
    }
});

// Get a User

router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Friends

router.get("/friends/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);   // Current user
        const friends = await Promise.all(        // User friends array
          user.followings.map((friendId) => {
             return User.findById(friendId);
          })
      );
      let friendList = [];
      friends.map((friend) => {
          const { _id, username, profilePicture } = friend;    // Destructure required propeties
          friendList.push({ _id, username, profilePicture });
      });
      res.status(200).json(friendList)
    }catch(err) {
      res.status(500).json(err);
    }
});

// Follow a User

router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json({ message: "Following the user" });
            }else {
                res.status(403).json({ message: "You already follow this account" });
            }
        }catch (err) {
            res.status(500).json({ err, message: "Can't follow the account" });
        }
    }else {
        res.status(403).json({ message: "Can't follow yourself" });
    }
});

// Unfollow a User

router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
           const user = await User.findById(req.params.id);
           const currentUser = await User.findById(req.body.userId);

           if(user.followers.includes(req.body.userId)) {
               await user.updateOne({ $pull: { followers: req.body.userId } });
               await currentUser.updateOne({ $pull: { followings: req.params.id } });
               res.status(200).json({ message: "Unfollowed successfully" });
          }else {
              res.status(403).json({ message: "You don't follow this account" });
          }
        }catch(err) {
            res.status(500).json({ err, message: "Can't unfollow" });
        }
    }else {
        res.status(403).json({ message: "Can't unfollow yourself" });
    }
});

module.exports = router;
