const {
  incrementalDate,
  randNumber,
  randImg,
  randProductName,
} = require("@ngneat/falso");
const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv").config();

const dateFactory = incrementalDate();

async function seedDB() {
  // Connection URL
  const uri = process.env.NODE_APP_MONGO_URI;

  const client = new MongoClient(uri, { useNewUrlParser: true });

  try {
    await client.connect();
    console.log("Connected correctly to server");
    const collection = client.db("test").collection("products");

    // collection.drop();

    let productList = [];
    for (let i = 0; i < 150; i++) {
      let newProduct = {
        name: randProductName(),
        upc: randNumber({ min: 100000000000, max: 999999999999 }),
        exp: [dateFactory(), dateFactory(), dateFactory(), dateFactory()],
        image: randImg(),
      };
      console.log(newProduct);
      productList.push(newProduct);
    }
    await collection.insertMany(productList);

    console.log("Database seeded! :)");
  } catch (err) {
    console.log(err.stack);

    client.close();
  }
}
seedDB();
