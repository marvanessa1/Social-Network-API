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

  const data = await User.find();
  const user = data.map(({ _id, userName}) => ({id: _id.valueOf(), userName}));

  for (let i = 0; i < 40; i++) {
    let newUserId = getRandomArrItem(user).id;
    let newFriendId = getRandomArrItem(user).id;
    if (newUserId !== newFriendId) {
      await User.findOneAndUpdate(
        { _id:newUserId}, 
        { $addToSet: { friends: newFriendId } }, 
        { runValidators: true, new: true});
    }
  }

  for (let i = 0; i < 50; i++) {
    const thoughtUser = getRandomArrItem(data);

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
      { $addToSet: {reactions: {reactionBody: getRandomReaction(), userName: getRandomArrItem(user).userName} } }, 
      );
  }
  
  console.table(users);
  console.table(userThought);
  console.info("Seeding is complete!");
  process.exit(0);
});
