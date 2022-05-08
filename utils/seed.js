const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { 
  getRandomArrItem,
  getRandomName, 
  getRandomEmail, 
  getRandomThought, 
  getRandomReaction
} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Create empty array to hold the users
  const users = [];

  // Get some random assignment objects using a helper function that we imported from ./data
  const assignments = getRandomAssignments(20);

  // Loop 20 times -- add susers to the users array
  for (let i = 0; i < 20; i++) {
    const name = getRandomName();
    const userName = `${name}${Math.floor(Math.random() * 9999)}`
    const email = getRandomEmail(name);


    users.push({
      email,
      userName
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  for (let i = 0; i < 40; i++) {
    let newUserId = getRandomArrItem(userArr).id;
    let newFriendId = getRandomArrItem(userArr).id;
    if (newUserId !== newFriendId) {
      await User.findOneAndUpdate(
        { _id:newUserId}, 
        { $addToSet: { friends: newFriendId } }, 
        { runValidators: true, new: true});
    }
  }

  for (let i = 0; i < 50; i++) {
    const thoughtUser = getRandomArrItem(userData);

    await Thought. create ({
      thoughtText: getRandomThought(),
      userName: thoughtUser.userName,
    })
  }

  const thoughtData = await Thought.find();
  const userThought = thoughtData.map(({ _id, userName, thoughtText})=> ({ id: _id.valueOf(), userName, thoughtText}));

  for (let i = 0; i < userThought.length; i++) {
    await User.findOneAndUpdate({ 
      userName: userThought[i].userName}, 
      { $addToSet: {thoughts: userThought[i].id } }, 
      {runValidators: true, new: true})
  }

  for (let i = 0; i < 20; i++) {
    await Thought.findOneAndUpdate(
      { _id: getRandomArrItem(userThought).id}, 
      { $addToSet: {reactions: {reactionBody: getRandomReaction(), userName} } }, 
      );
  }
  
  console.table(users);
  console.table(userThought);
  console.info("Seeding is complete!");
  process.exit(0);
});
