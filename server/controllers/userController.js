const User = require('../models/User');
const bcrypt = require('bcryptjs');

class UserController {

    async getUser(req, res) {
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
    }

    async updateUser(req, res) {
        const userId = req.body.userId;
        const paramsId = req.params.id;
        if (userId === paramsId || req.body.isAdmin) {
          const data = req.body;
            if (req.body.password) {
                try {
                    const salt = bcrypt.genSaltSync(10);
                    req.body.password = bcrypt.hashSync(data.password, salt);
                }catch(err) {
                    res.status(500).json({ message: "Can't update password" });
                }
            }try {
                const user = await User.findOneAndUpdate(req.params.id, {$set: req.body});
                res.status(200).json({ message: "Account updated successfully" })
            }catch(err) {
                res.status(500).json({ message: "Can't update user" });
            }
        }else {
            res.status(403).json({ message: "You can update only your account" })
        }
    }

    async deleteUser(req, res) {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            try {
                const user = await User.findOneById(req.params.id);
                user ? User.findByIdAndDelete(req.params.id)
                     : res.status(400).json({ message: "Account doesn't exist" });
                res.status(200).json({ message: "Account deleted Successfully" });
            }catch(err) {
                res.status(500).json({ message: "Server Error", err });
            }
        }else {
            res.status(403).json({ message: "You can delete only your account" });
        }
    }

    async follow(req, res) {
        if (req.body.userId !== req.params.id) {
            try {
                const user = await User.findById(req.params.id);
                const currentUser = await User.findById(req.body.userId);

                if(!user.followers.includes(req.body.userId)){
                    await user.updateOne({ $push: { followers: req.body.userId } });
                    await currentUser.updateOne({ $push: { followings: req.params.id } });
                    res.status.json({ message: "Following the user" })
                }else {
                    res.status(403).json({ message: "You already follow this account" });
                }
            }catch(err) {
                res.status(500).json({ message: "Can't follow the account" });
            }
        }else {
            res.status(403).json({ message: "Can't follow yourself" });
        }
    }

    async unfollow(req, res) {
        if (req.body.userId !== req.params.id) {
            try {
                const user = User.FindById(req.params.id);
                const currentUser = User.FindById(req.body.userId);

                if(user.followers.includes(req.body.userId)) {
                    await user.updateOne({ $pull: { followers: req.body.userId }});
                    await currentUser.updateOne({ $pull: { followings: req.params.id }});
                    res.status.json({ message: "Unfollowed successfully" });
                }else{
                    res.status(403).json({ message: "You don't follow this account" });
                }
            }catch(err) {
                res.status(500).json({ message: "Can't unfollow" });
            }
        }else {
            res.status(403).json({ message: "Can't unfollow yourself" });
        }
    }

    async getFriends(req, res) {
        try {
            const user = await User.findById(req.params.userId);
            const friends = await Promise.all(
              user.followings.map((friendId) => {
                return User.findById(friendId);
              })
          );
          let friendList = [];
          friends.map((friend) => {
              const { _id, username, profilePicture } = friend;
              friendList.push({ _id, username, profilePicture });
          });
          res.status(200).json(friendList)
        }catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new UserController();
