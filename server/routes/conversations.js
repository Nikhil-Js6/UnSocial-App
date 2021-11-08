const router = require("express").Router();
const Conversation = require("../models/Conversation");


// New Conversation

router.post("/", async(req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.recieverId],
    });
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    }catch(err) {
        res.status(500).json(err);
    }
});

// Get a User Conversation

router.get("/:userId", async(req, res) => {
    try {
        const conversation = await Conversation.find(
        {
            members: { $in: [req.params.userId] }     // member includes userId 
        });
        res.status(200).json(conversation);
    }catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router;