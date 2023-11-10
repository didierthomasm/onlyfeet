const db = require('./connection');
const { User, Product, Category} = require('../models');

db.once('open', async() => {
    await Category.deleteMany();

const categories = await Category.insertMany ([
    { name: 'Dog Feet' }, 
    { name: 'Human Feet' }, 
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
        price: 2000,
        quantity: 500,
    },
    {
        name: 'Guinness record nails foot',
        description: 'Longest toe nails to ever be recorded',
        image: '',
        category: categories[1]._id,
        price: 1000,
        quantity: 100,
    },
    {
        name: 'Rainbow Feet',
        description: 'Double rainbow all the way',
        image: '',
        category: categories[1]._id,
        price: 10000,
        quantity: 100,
    },

    {
        name: 'Naruto Feet',
        description: 'Legendary Naruto could defeat anybody with his feet',
        image: '',
        category: categories[2]._id,
        price: 4000,
        quantity: 1000,
    },

    {
        name: 'Goku Feet',
        description: 'You know you want it',
        image: '',
        category: categories[2]._id,
        price: 10000,
        quantity: 5000,
    },
    {
        name: 'Avatar Foot',
        description: 'AI concept of avatar',
        image: '',
        category: categories[3]._id,
        price: 999,
        quantity: 100,
    },
    {
        name: 'Best Rated Feet',
        description: 'Acoording to Dall E, this is the best rated foot in thte world',
        image: '',
        category: categories[3]._id,
        price: 100000,
        quantity: 20,
    },
    {
        name: 'Golden Boot',
        description: 'THe infamous golden Boot',
        image: '',
        category: categories[4]._id,
        price: 999,
        quantity: 20,
    },
    {
        name: 'Bowling Feet',
        description: 'Wierd shoes most def',
        image: '',
        category: categories[4]._id,
        price: 500,
        quantity: 100,
    },
       
]);
    
console.log('products seeded')

await User.deleteMany();

await User.create({

    firstName: 'Inigo',
    lastName: 'de Robina',
    email: 'inigo@yopmail.com',
    password: 'I12345678@',
    orders: [
        {
            products: [products[0]._id, products [0]._id, prodtucs[1]._id]
        }

    ]
});

await User.create({
    firstName: 'Feet',
    lastName: 'User',
    email: 'feet@yopmail.com',
    password: 'I12345678@'
  });

  console.log('users seeded');

  process.exit();
});



