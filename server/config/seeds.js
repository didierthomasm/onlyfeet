const db = require('./connection');
const { User, Product, Category} = require('../models');

db.once('open', async() => {
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