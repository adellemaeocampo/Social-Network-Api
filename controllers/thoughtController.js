const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports ={

    //gets all thoughts
    async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().select('-__v');
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //gets single thought w ID 
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //creates a single thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        {_id: req.body.userId},
        {$addToSet: {thoughts: thought._id}},
        {new:true}
      );

      if(!user){
        return res.status(400).json({message: "Unable to find user with that ID"});
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  //updates thought w ID 
  async updateThought(req, res) {
    try{
      const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {thoughtText: req.body.thoughtText}, {new:true}).select('-__v');

      res.json(thought)
    } catch(err){
      res.status(500).json(err)
    }
  },

  // deletes thought w ID 
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId }).select('-__v');
      
      res.json({message: "Thought Successfully deleted"});
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // updates reaction w ID 
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$addToSet: {reactions: req.body}},
        {runValidators: true, new: true}
      ).select('-__v');
      
      if(!thought){
        return res.status(400).json({message: 'Unable to find thought with this ID'});
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //deletes reaction w ID 
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$pull: {reactions: {reactionId: req.params.reactionId}}},
        {runValidators: true, new: true}
      )
      
      if(!thought){
        return res.status(400).json({message: "Unable to find thought with that ID"});
      }

      res.json({message: "Reaction successfully deleted from thought"});
    } catch (err) {
      res.status(500).json(err);
    }
  }
}