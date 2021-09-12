const db = require("./connection");
const { User, Product, Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "Craft Cocktails" },
    { name: "Draft Beer" },
    { name: "Wine" },
    { name: "Appetizers" },
    { name: "Small Bites" },
    { name: "Chef Special" },
    { name: "Entrees" },
    { name: "Desserts" },
  ]);

  console.log("categories seeded");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "Old Fashion",
      description:
        "Kentucky bourbon, Angostura bitters, a sugar cube, a few cherries, an orange, and a lemon.",
      category: categories[0]._id,
      image: "old-fashioned.jpg",
      price: 12.99,
    },
    {
      name: "Manhattan",
      description:
        "Grand Marnier, Bourbon, Dry Vermouth, Sweet Vermouth, Angostura Bitters, Orange Zest Twist, Maraschino Cherry Garnish.",
      category: categories[0]._id,
      image: "manhattan2.jpeg",
      price: 10.99,
    },
    {
      name: "Cosmopolitan",
      category: categories[0]._id,
      description:
        "Vodka, Triple sec, Cranberry juice, Fresh Lime Juice.",
      image: "strawberry-cosmopolitan.jpeg",
      price: 10.99,
    },
    {
      name: "Moscow Mule",
      category: categories[0]._id,
      description:
        "Vodka, Spicy Ginger Beer, Fresh Lime Juice, Garnished With a Slice of Lime.",
      image: "moscow-mule2.jpeg",
      price: 10.99,
    },
    {
      name: "Strawberry Gin Sour",
      category: categories[0]._id,
      description:
        "Strawberries, Gin, Elderflower Liqueur, Fresh Lime Juice, Egg White.",
      image: "gin-sour.jpg",
      price: 12.99,
    },
    {
      name: "Orange Blossom Pilsner (Orange Blossom Brewing Co.)",
      category: categories[1]._id,
      description:
        "Honey Beer Made With Real, Local Orange Blossom Honey. //4.5% ABV//",
      image: "obp.jpeg",
      price: 8.99,
    },
    {
      name: "McSwaggers Own (Crookerd Can Brewing Co.)",
      category: categories[1]._id,
      description:
        "American Amber Ale. //6.0% ABV//",
      image: "mcswaggers-own-2.jpeg",
      price: 7.99,
    },
    {
      name: "Dunedein Beer Flight",
      category: categories[1]._id,
      description:
        "Apricot Peach Ale //6.0% ABV//, Red Head Red Ale //5.6% ABV//, and Local Honey //8.0% ABV//. ",
      image: "dunedin-brewing.png",
      price: 18.99,
    },
    {
      name: "Florida Cracker (Cigar City Brewing Co.)",
      category: categories[1]._id,
      description:
        "White Ale With Unmalted Wheat, Orange Peel and Coriander. //5.5% ABV//",
      image: "florida-cracker-2.jpeg",
      price: 7.99,
    },
    {
      name: "Tropic Pressure (Big Storm Brewing Co.)",
      category: categories[1]._id,
      description:
        "Florida Ale Steeped With Hibiscus Flowers And A Hint Of Cinnamon. //4.4% ABV//",
      image: "tropic-pressure-2.jpeg",
      price: 7.99,
    },
    {
      name: "Cabernet Sauvignon",
      category: categories[2]._id,
      description:
        "Dark Fruit Flavors And Savory Tastes From Black Pepper",
      image: "cabernet.jpg",
      price: 13.99,
    },
    {
      name: "Merlot",
      category: categories[2]._id,
      description:
        "Red-Fruit Flavours (Cherry, Plum and Raspberry), Easy-Drinking Tannins and Super-Soft Finish.",
      image: "merlot-2.jpeg",
      price: 12.99,
    },
    {
      name: "Pinot Noir",
      category: categories[2]._id,
      description:
        "Bright Acidity, Silky Tannins, Cherry, Raspberry, Mushroom Plus Vanilla",
      image: "pinot-noir-2.jpeg",
      price: 12.99,
    },
    {
      name: "Sauvignon Blanc",
      category: categories[2]._id,
      description:
        "Dry White With Tropical, Tree And Citrus Fruit Flavors",
      image: "sauvignon-blanc-2.jpeg",
      price: 11.99,
    },
    {
      name: "Reisling",
      category: categories[2]._id,
      description:
        "Aromatic White Wine That Boasts Crisp Flavors Of Apples, Apricots, Peaches, And Pears.",
      image: "riesling-2.jpeg",
      price: 11.99,
    },
    {
      name: "Korean Double Crunch Wings",
      category: categories[3]._id,
      description:
        "Double Fried, Crunchy, And Crispy Korean Chicken Wings Covered in Either Sweet Gochujang Sauce or Sticky Soy Garlic Sauce",
      image: "korean-chicken-wings.jpeg",
      price: 11.99,
    },
    {
      name: "Chili Garlic Edamame",
      category: categories[3]._id,
      description:
        "Steamed Edamame in a Spicy Chili Garlic Sauce",
      image: "edamame.jpg",
      price: 8.99,
    },
    {
      name: "Avacodo Eggrolls",
      category: categories[3]._id,
      description:
        "Avocado, Sun-Dried Tomato, Red Onion and Cilantro Fried in a Crisp Wrapper. Served with a Tamarind-Cashew Dipping Sauce.",
      image: "avocado-egg-rolls-2.jpeg",
      price: 13.99,
    },
    {
      name: "Truffle Fries",
      category: categories[3]._id,
      description:
        "Crispy Fries Covered In Parmasan, Lemon, Garlic, and Truffle Oil.",
      image: "truffle.jpg",
      price: 14.99,
    },
    {
      name: "Fried Mozzarella",
      category: categories[3]._id,
      description:
        "Golden Fried Mozzarella Mixed With Italian Herbs",
      image: "fried-mozzarella-2.jpeg",
      price: 10.99,
    },
    {
      name: "Caprese Bites",
      category: categories[4]._id,
      description:
        "Layers Of Cherry Tomato, Basil Leaf, And Marinated Mozzarella On A Skewer With Balsamic Glaze.",
      image: "caprese-spears-2.jpeg",
      price: 12.99,
    },
    {
      name: "Steak and Burrata",
      category: categories[4]._id,
      description:
        "Creamy Burrata On Top Of Garlicky Sourdough Toasts, And Perfectly Cooked Hanger Steak Topped With Pepper Flakes, Chives And A Drizzle Of Balsamic Vinegar.",
      image: "steak-crustini.jpeg",
      price: 27.99,
    },
    {
      name: "Lemon Ginger Chicken Skewers",
      category: categories[4]._id,
      description:
        "Ginger Marinated Chicken Skewers Drizzled With Honey and Roasted Lemon Jucie.",
      image: "lemon-chicken.jpg",
      price: 21.99,
    },
    {
      name: "Iberico Pork",
      category: categories[4]._id,
      description:
        "Tender And Juicy Pork Served With Crispy Golden Potatoes.",
      image: "pork.jpg",
      price: 16.99,
    },
    {
      name: "Flaming Cheese",
      category: categories[4]._id,
      description:
        "Saganaki Cheese Lit On Fire.",
      image: "flaming-cheese.jpg",
      price: 9.99,
    },
    {
      name: "Lamb Chops",
      category: categories[5]._id,
      description:
        "Rubbed With Fresh Thyme, Seared In A Hot Skillet, And Topped With A Decadent Pan Sauce Flavored With Dry White Wine, A Squeeze Of Lemon Juice, And A Knob Of Butter.",
      image: "lamb.jpg",
      price: 36.99,
    },
    {
      name: "Cajun Garlic Butter Lobster Tails",
      category: categories[5]._id,
      description:
        "Fresh Lobster Tails drenched in our Famous Cajun Garlic Butter.",
      image: "lobster.jpg",
      price: 42.99,
    },
    {
      name: "Yellow-Fin Tuna Poke",
      category: categories[5]._id,
      description:
        "Diced cucumbers, Chilies, and Avocado Mixed with Roasted Sesame Yellow-Fin Tuna. All Served Over Sushi Rice",
      image: "poke-2.jpeg",
      price: 29.99,
    },
    {
      name: "Prawn and Black Truffle Pasta",
      category: categories[5]._id,
      description:
        "Pappardelle Pasta and Large Prawns Served In A Cream-Based Sauce With Butter, Garlic, Cherry Tomatoes, Lime, Truffle Oil And Shallots.",
      image: "shrimp-pasta.jpg",
      price: 30.99,
    },
    {
      name: "Parmasan Crusted Swordfish Steak",
      category: categories[5]._id,
      description:
        "Crispy Parmesan Swordfish With Creamy Garlic Aioli Dipping Sauce",
      image: "swordfish-2.jpeg",
      price: 32.99,
    },
    {
      name: "Filet Mignon",
      category: categories[6]._id,
      description:
        "8oz Filet Served With Creamy Mashed Potatos, Steamed Asparagus, and Pan-Seared Shallots.",
      image: "filet-mignon.jpg",
      price: 45.99,
    },
    {
      name: "Cacio De Pepe",
      category: categories[6]._id,
      description:
        "Pasta, Four Cheese Italian Blend, Black Pepper And Butter.",
      image: "cacio.jpg",
      price: 25.99,
    },
    {
      name: "Sesame Glazed Salmon",
      category: categories[6]._id,
      description:
        "Salmon Fillets In A Tangy glaze - Sprinkle With Sesame Seeds.",
      image: "honey-sesame-salmon.jpeg",
      price: 29.99,
    },
    {
      name: "Stuffed Lemon Garlic Chicken",
      category: categories[6]._id,
      description:
        "Stuffed With Cheddar And Cream Cheeses, Then Drenched In A Garlic-Lemon-Butter Sauce.",
      image: "stuffed-chicken.jpg",
      price: 23.99,
    },
    {
      name: "Caesar Salad",
      category: categories[6]._id,
      description:
        "Fresh Crisp Romaine Lettuce, Garlic Crutons, Grated Parmesan Cheese, and Grilled Chicken Breast.",
      image: "caesar-salad.jpg",
      price: 18.99,
    },
    {
      name: "Pumpkin Cheesecake",
      category: categories[7]._id,
      description:
        "Creamy New York Style Cheesecake Swirled With Pumpkin Pie.",
      image: "cheesecake.jpg",
      price: 12.99,
    },
    {
      name: "Chocolate Cake",
      category: categories[7]._id,
      description:
        "Death By Chocolate, Triple Layers Of Rich Chocolate Cake and Chocolate Ganache.",
      image: "chocolate-cake.jpg",
      price: 11.99,
    },
    {
      name: "Tirimisu",
      category: categories[7]._id,
      description:
        "Espresso-Soaked Ladyfingers Surrounded By Lightly Sweetened Whipped Cream And A Rich Mascarpone.",
      image: "tiramisu.jpg",
      price: 12.99,
    },
    {
      name: "Zeppole",
      category: categories[7]._id,
      description:
        "Fried Dough Balls Coated In POwdered Sugar and drizzled With A Red Wine Reduction.",
      image: "zeppole.jpg",
      price: 13.99,
    },
    {
      name: "Passion Fruit Mousse",
      category: categories[7]._id,
      description:
        "Creamy Tropical Fruity Mousse With A Rasbery Drizzle.",
      image: "passionfruit.jpg",
      price: 13.99,
    },
  ]);

  console.log("products seeded");

  await User.deleteMany();

  await User.create({
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "password12345",
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id],
      },
    ],
  });

  await User.create({
    firstName: "Elijah",
    lastName: "Holt",
    email: "eholt@testmail.com",
    password: "password12345",
  });

  await User.create({
    firstName: "Tester",
    lastName: "McTesterson",
    email: "test@mail.com",
    password: "password",
  });

  console.log("users seeded");

  process.exit();
});
