const User = require('../models/User');
const Thought = require('../models/Thought')

module.exports ={

    //gets all users 
    async getUsers(req, res) {
    try {
      const users = await User.find().select('-__v').populate('thoughts').populate('friends');
      res.json(users);

    } catch (err) {
      res.status(500).json(err);
    }
  },

  //gets single user w ID 
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select('-__v').populate('thoughts').populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //creates user w ID 
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);

      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  

  //updates user w ID 
  async updateUser(req, res){
    try{
      const user = await User.findOneAndUpdate({_id: req.params.userId}, {username: req.body.username}, {new: true}).select('-__v');

      res.json(user);
    } catch(err){
      res.status(500).json(err);
    }
  },
  
  
  //deletes user w ID 
  async deleteUser (req,res) {
    try{
      const user = await User.findOneAndDelete({_id: req.params.userId});
      
      for(let i = 0; i < user.thoughts.length; i++){
        await Thought.findOneAndDelete({_id: user.thoughts[i]});
      }

      res.json({message: "User successfully deleted"});
    } catch(err){
      res.status(500).json(err);
    }
  },

  //finds user friends
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$set: {friends: req.body.friendId}},
        {runValidators: true, new: true}
      )
      
      if(!user){
        return res.status(400).json({message: 'Unable to find user with this ID'});
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //deletes a friend w ID 
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$pull: {friends: req.params.friendId}},
        {runValidators: true, new: true}
      ).select('-__v');
      
      if(!user){
        return res.status(400).json({message: "Unable to find user with that ID"});
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}