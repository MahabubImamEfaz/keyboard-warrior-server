const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

//middlewares
app.use(cors());
app.use(express.json());

const { Await } = require("react-router-dom");
const uri =
  "mongodb+srv://keyboardUser:o1j1SIPHZFUaj0Wn@cluster0.cj7utkb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const categoryCollection = client.db("keyboard").collection("categories");
    const productCollection = client.db("keyboard").collection("products");

    app.get("/displaycategories", async (req, res) => {
      const query = {};
      const cursor = categoryCollection.find(query);
      const category = await cursor.toArray();
      res.send(category);
    });

    app.get("/category/:id", async (req, res) => {
      let query = {};
      if (req.params.id) {
        query = { brand_name: req.params.id };
      }

      const result = await productCollection.find(query).toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(port, () => {
  console.log("server listening on port" + port);
});
