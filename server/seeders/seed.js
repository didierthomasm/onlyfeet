const db = require('../config/connection');
const { User} = require('../models'); //ahorita no ocupo Product y Category
const userSeeds = require('./userSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {

    await cleanDB('User', 'users');

    await User.create(userSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});


/*db.once('open', async() => {
    await Category.deleteMany();

const categories = await Category.insertMany ([
    { name: 'Dog Feet' }, 
    { name: 'Cat Feet' }, 
    { name: 'Anime Feet' },
    { name: 'AI Feet' },
    { name: 'Sports Feet'},
]);

console.log('feet categories seeded OK');

await Product.deleteMany();

const products = await Product.insertMany ([

    {
        name: 'Belgian Shepperd Foot',
        description: 'Covered in white paint, tips only',
        image: '',
        category: categories[0]._id,
        price: 5000,
        quantity: 500,
    },
    {
        name: 'Xoloitzcuintle  Foot',
        description: 'Elegance; woof said',
        image: '',
        category: categories[0]._id,
        price: 2001,
        quantity: 500,
    },
    {
        name: 'Dalmatian Foot',
        description: 'The skin on the top of a Dalmatians foot is covered with black gorgeous spots',
        image: '',
        category: categories[0]._id,
        price: 5000,
        quantity: 500,
    },
    {
        name: 'Dalmatian Foot',
        description: 'The skin on the top of a Dalmatians foot is covered with black gorgeous spots',
        image: '',
        category: categories[0]._id,
        price: 5000,
        quantity: 500,
    },
])
    





})
*/