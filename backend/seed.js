const mongoose = require('mongoose');
require('dotenv').config();
const Flavor = require('./models/Flavor');
const Category = require('./models/Category');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dropscoop';

const flavorsData = [
  {
    name: "Classic Vanilla Bean",
    description: "Rich, creamy vanilla made with Madagascar bourbon vanilla beans.",
    basePrice: 4.5,
    categoryName: "Classic",
    images: ["/images/vanilla.jpg"],
    stockStatus: "in_stock",
    isVegan: false,
    isSignature: true,
    modelColorTint: "#f3e5ab"
  },
  {
    name: "Double Chocolate Fudge",
    description: "Deep, dark chocolate ice cream swirled with thick fudge ribbons.",
    basePrice: 5.0,
    categoryName: "Classic",
    images: ["/images/chocolate.jpg"],
    stockStatus: "in_stock",
    isVegan: false,
    isSignature: true,
    modelColorTint: "#3b2f2f"
  },
  {
    name: "Strawberry Dream",
    description: "Made with fresh, locally sourced strawberries folded into sweet cream.",
    basePrice: 4.75,
    categoryName: "Classic",
    images: ["/images/strawberry.jpg"],
    stockStatus: "in_stock",
    isVegan: false,
    isSignature: false,
    modelColorTint: "#fc5a8d"
  },
  {
    name: "Hazelnut Crunch",
    description: "Creamy hazelnut base loaded with caramelized hazelnut pieces.",
    basePrice: 5.5,
    categoryName: "Classic",
    images: ["/images/hazelnut.png"],
    stockStatus: "in_stock",
    isVegan: false,
    isSignature: true,
    modelColorTint: "#8b5a2b"
  },
  {
    name: "Mint Chocolate Chip",
    description: "Refreshing mint ice cream loaded with dark chocolate flakes.",
    basePrice: 4.75,
    categoryName: "Classic",
    images: ["/images/mint_chocolate.png"],
    stockStatus: "in_stock",
    isVegan: false,
    isSignature: false,
    modelColorTint: "#98ff98"
  },
  {
    name: "Orange Sherbet",
    description: "Bright, zesty, and refreshing sweet orange sorbet.",
    basePrice: 4.0,
    categoryName: "Sorbet",
    images: ["/images/orange.png"],
    stockStatus: "in_stock",
    isVegan: true,
    isSignature: false,
    modelColorTint: "#ffa500"
  },
  {
    name: "Vegan Coconut Raspberry",
    description: "Coconut milk base swirled with a tart raspberry compote.",
    basePrice: 5.5,
    categoryName: "Vegan",
    images: ["/images/strawberry.png"],
    stockStatus: "in_stock",
    isVegan: true,
    isSignature: true,
    modelColorTint: "#e0115f"
  }
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log('Connected!');

    // Clear existing
    await Flavor.deleteMany({});
    await Category.deleteMany({});
    console.log('Cleared existing Flavors and Categories');

    // Create Categories
    const categories = [...new Set(flavorsData.map(f => f.categoryName))];
    const categoryMap = {};
    
    for (const cat of categories) {
      const newCat = await Category.create({ 
        name: cat, 
        slug: cat.toLowerCase(), 
        description: `Delicious ${cat} flavors` 
      });
      categoryMap[cat] = newCat._id;
    }

    // Create Flavors
    const flavorsToInsert = flavorsData.map(f => {
      const { categoryName, ...rest } = f;
      return {
        ...rest,
        category: categoryMap[categoryName]
      };
    });

    await Flavor.insertMany(flavorsToInsert);
    console.log('Successfully seeded database with flavors!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
