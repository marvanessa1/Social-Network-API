const names = [
  'Aaran',
  'Aaren',
  'Aarez',
  'Aarman',
  'Aaron',
  'Aaron-James',
  'Aarron',
  'Aaryan',
  'Aaryn',
  'Aayan',
  'Aazaan',
  'Abaan',
  'Abbas',
  'Abdallah',
  'Abdalroof',
  'Abdihakim',
  'Abdirahman',
  'Abdisalam',
  'Abdul',
  'Abdul-Aziz',
  'Abdulbasir',
  'Abdulkadir',
  'Abdulkarem',
  'Smith',
  'Jones',
  'Coollastname',
  'enter_name_here',
  'Ze',
  'Zechariah',
  'Zeek',
  'Zeeshan',
  'Zeid',
  'Zein',
  'Zen',
  'Zendel',
  'Zenith',
  'Zennon',
  'Zeph',
  'Zerah',
  'Zhen',
  'Zhi',
  'Zhong',
  'Zhuo',
  'Zi',
  'Zidane',
  'Zijie',
  'Zinedine',
  'Zion',
  'Zishan',
  'Ziya',
  'Ziyaan',
  'Zohaib',
  'Zohair',
  'Zoubaeir',
  'Zubair',
  'Zubayr',
  'Zuriel',
  'Xander',
  'Jared',
  'Courtney',
  'Gillian',
  'Clark',
  'Jared',
  'Grace',
  'Kelsey',
  'Tamar',
  'Alex',
  'Mark',
  'Tamar',
  'Farish',
  'Sarah',
  'Nathaniel',
  'Parker',
];

const email = [
  '@hogwarts.edu',
  '@beauxbatons.edu',
  '@castelobruko.edu',
  '@durmstrang.edu',
  '@mahoutokoro.edu',
  '@uagadou.edu',
  '@koldovstoretz@edu',
];

const thought = [
  'Excited for the Quidditch World Cup!',
  'When is the next Triwizard Tournament?',
  'Looking for a Potions tutor',
  'Which school has the most spirit?',
  'Saw a Chinere Fireball while visiting Romania, super cool! ',
  'Anyone have any plans for summer break?',
  'Who is the best wizard of all time?',
  'The latest issue of the "The Quibbler" is wild!',
  'Where is Harry Potter now?',
  'Who are you rooting for to win the Quidditch Wold Cup!',
  'Where is the lost city of Atlantis?'
]

const reaction = [
  'Same here!',
  'I agree',
  'Wicked!',
  'What!?!',
  'I would like to hear more on this',
  '#TeamVictorKrum'
]

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)}`;

// Gets a random email address

const getRandomEmail = (name) => `${name}${Math.floor(Math.random() * 9999)}${getRandomArrItem(email)}`

// Gets a random thought out of the thoughts array

const getRandomThought = () => `${getRandomArrItem(thought)}`

// Gets a random reaction from the reactions array

const getRandomReaction = () => `${getRandomArrItem(reaction)}`

// Export the functions for use in seed.js
module.exports = {
  getRandomArrItem,
  getRandomName,
  getRandomEmail,
  getRandomThought,
  getRandomReaction
};
