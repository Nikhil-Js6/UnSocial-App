const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

      username : {
          type: String,
          min: 3,
          max: 20, required: true,
          unique: true,
      },
      email: {
          type: String,
          required: true,
          unique: true,
          max: 50,
      },
      password: {
          type: String,
          min: 6,
      },
      profilePicture: {
          type: String,
          default: "",
      },
      coverPicture: {
          type: String,
          default: "",
      },
      followers: {
          type: Array,
          default: [],
      },
      followings: {
          type: Array,
          default: [],
      },
      isAdmin: {
          type: Boolean,
          default: false,
      },
      desc: {
          type: String,
          max: 60,
      },
      city: {
          type: String,
          max: 50,
      },
      from: {
          type: String,
          max: 50,
      },
      relationship: {
          type: Number,
          enum: [1, 2, 3]
      }

},
      {timestamps: true}

);

module.exports = mongoose.model("User", userSchema);
