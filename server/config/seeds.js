const db = require('./connection');
const { User, Product, Category} = require('../models');

db.once('open', async() => {
    await Category.deleteMany();

const categories = await Category.insertMany ([
    { name: 'Dog Feet' },
    { name: 'Dog Feet' },
    { name: 'Dog Feet' },
    { name: 'Dog Feet' },
    { name: 'Dog Feet' },
])




})