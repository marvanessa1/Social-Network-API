const { Thought, Course } = require('../models');

// Aggregate function to get the number of thoughts overall
const headCount = async () =>
  Thought.aggregate()
    .count('thoughtCount')
    .then((numberOfThoughts) => numberOfThoughts);

// Aggregate function for getting the overall grade using $avg
// const grade = async (thoughtId) =>
//   Thought.aggregate([
//     {
//       $unwind: '$assignments',
//     },
//     {
//       $group: { _id: thoughtId, overallGrade: { $avg: '$assignments.score' } },
//     },
//   ]);

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const thoughtObj = {
          thoughts,
          headCount: await headCount(),
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id:req.body.userId} ,
          { $addToSet: { toughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => 
        !user
          ? res.status(404).json ({
            message:'Thought was created but there is no user with that username'
          })
          :res.json(user)
      )
      .catch((err) => res.status(500).json(err));      
  },

  // Update a thought by its _id - PUT

  updateThought(req, res) {
    Thought.findByIdAndUpdate(  req.params.thoughtId ,
      req.body,
      { runValidators: true, new: true})
      .then((thought)=>
        !thought
          ? res.tatus(404).jsaon({ message: 'No thought with that id found'})
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));   
  },
  // Delete a thought and remove them from the user
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No such thought exists' })
          : Course.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought deleted, but no users found',
            })
          : res.json({ message: 'Thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },  
};
