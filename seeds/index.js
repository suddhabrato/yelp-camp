const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error'));
db.once("open", () => {
    console.log("Database Connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 1; i <= 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '61e43d3cc71d03d86f23b0bb',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dxsb72gax/image/upload/v1642578420/YelpCamp/nde4aegnk1icaamkqryz.jpg',
                    filename: 'YelpCamp/nde4aegnk1icaamkqryz'
                },
                {
                    url: 'https://res.cloudinary.com/dxsb72gax/image/upload/v1642578420/YelpCamp/z80jglei4xcadajrxako.jpg',
                    filename: 'YelpCamp/z80jglei4xcadajrxako'
                }
            ],
            description: 'lorem ipsum',
            price: price
        })
        await camp.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close();
})