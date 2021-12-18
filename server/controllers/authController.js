const User = require('../models/User');
const Cryptr = require('cryptr');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

class AuthController {

    async register(req, res) {
        try {
           const salt = bcrypt.genSaltSync(10);
           const hashedPassword = bcrypt.hashSync(req.body.password, salt);

           const newUser = await new User({
              username: req.body.username,
              email: req.body.email,
              password: hashedPassword,
           });

           const user = await newUser.save();
           res.status(200).json({ user, message: "User Created Successfully!"});
        }catch(err) {
            res.status(500).json({ err, message: "Database error!" });
        }
    }

    async login(req, res) {
        try {
           const user = await User.findOne({ email: req.body.email });
           !user && res.status(404).json({ message: "User not found!" });

           const validPassword = bcrypt.compareSync(req.body.password, user.password);
           validPassword
             ? res.status(200).json({ user })
             :  res.status(400).json({ message: "Wrong password!" });

        }catch(err) {
             res.status(500).json({ err, message: "Server Internal Error" });
        }
    }
}

module.exports = new AuthController();
