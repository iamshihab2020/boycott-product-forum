const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://boycott-forum.web.app",
      "https://boycott-forum.firebase.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster2024.kjdp6b2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2024`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const logger = async (req, res, next) => {
  console.log("\n\nCalled " + req.host, req.originalUrl);
  next();
};

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("\n\tValue of token in middleware : " + token);

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "401 Error" });
    }
    console.log("Value of token " + JSON.stringify(decoded));
    req.user = decoded;
    next();
  });
};

const cookieOptions = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  secure:process.env.NODE_ENV === "production" ? true :false ,
};


async function run() {
  try {
    // await client.connect();
    const queriesCollection = client
      .db("boycott_forum_db")
      .collection("queries");
    const recommendationCollection = client
      .db("boycott_forum_db")
      .collection("recommendations");

    app.post("/jwt", logger, async (req, res) => {
      const user = req.body;
      console.log(user);
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res
        .cookie("token", token, cookieOptions)
        .send({ success: true });
    });

    // Public routes
    app.get("/queries", async (req, res) => {
      const cursor = await queriesCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/allQueries", logger, async (req, res) => {
      try {
        const cursor = await queriesCollection.find().sort({ dateTime: -1 });
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching queries:", error);
      }
    });

    app.get("/queries/:id", logger, verifyToken, async (req, res) => {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }
      const query = { _id: new ObjectId(id) };
      const result = await queriesCollection.findOne(query);
      res.send(result);
    });

    app.post("/queries", async (req, res) => {
      const addNewQueries = req.body;
      addNewQueries._id = new ObjectId();
      console.log(addNewQueries);
      const result = await queriesCollection.insertOne(addNewQueries);
      res.send(result);
    });

    app.put("/queries/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedQuery = req.body;
      const theQuery = {
        $set: {
          name: updatedQuery.name,
          brand: updatedQuery.brand,
          image: updatedQuery.image,
          title: updatedQuery.title,
          details: updatedQuery.details,
        },
      };

      const result = await queriesCollection.updateOne(
        filter,
        theQuery,
        options
      );
      res.send(result);
    });

    app.delete("/queries/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await queriesCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/recommendation", logger, async (req, res) => {
      const { query_id } = req.query;
      let filter = {};
      if (query_id) {
        filter = { query_id: query_id };
      }
      const cursor = await recommendationCollection.find(filter);
      const result = await cursor.toArray();
      res.send(result);
    });

    // Private routes
    app.get("/myQueries/:userId", logger, verifyToken, async (req, res) => {
      const userId = req.params.userId;

      const cursor = await queriesCollection
        .find({ userId: userId })
        .sort({ dateTime: -1 });
      const result = await cursor.toArray();
      console.log("My Queries Token : " + req.cookies.token);

      res.send(result);
    });

    app.get("/recommendations", async (req, res) => {
      const { userEmail } = req.query;
      let filter = {};
      if (userEmail) {
        filter = { userEmail: userEmail };
      }
      const cursor = await recommendationCollection.find(filter);
      const result = await cursor.toArray();
      console.log("My Recommendations Token : " + req.cookies.token);
      res.send(result);
    });

    app.get(
      "/excludeRecommendations",
      logger,
      verifyToken,
      async (req, res) => {
        // console.log("Token : " + req.cookies.token);
        console.log("\nfrom valid user : " + JSON.stringify(req.user));
        const { excludeUserEmail } = req.query;
        let filter = {};
        if (excludeUserEmail) {
          filter = { userEmail: { $ne: excludeUserEmail } };
        }
        const cursor = await recommendationCollection.find(filter);
        const result = await cursor.toArray();
        res.send(result);
      }
    );

    app.post("/recommendation", async (req, res) => {
      const addNewRecommendation = req.body;
      addNewRecommendation._id = new ObjectId();
      console.log(addNewRecommendation);
      const result = await recommendationCollection.insertOne(
        addNewRecommendation
      );

      await queriesCollection.updateOne(
        { _id: new ObjectId(addNewRecommendation.query_id) },
        { $inc: { recommendationCount: 1 } }
      );

      res.send(result);
    });

    app.delete("/recommendation/:id", logger, verifyToken, async (req, res) => {
      const id = req.params.id;
      try {
        const recommendation = await recommendationCollection.findOne({
          _id: new ObjectId(id),
        });
        await recommendationCollection.deleteOne({ _id: new ObjectId(id) });

        await queriesCollection.updateOne(
          { _id: new ObjectId(recommendation.query_id) },
          { $inc: { recommendationCount: -1 } }
        );

        res
          .status(200)
          .json({ message: "Recommendation deleted successfully" });
      } catch (error) {
        console.error("Error deleting recommendation:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.delete(
      "/recommendations/:id",
      logger,
      verifyToken,
      async (req, res) => {
        const id = req.params.id;
        try {
          const recommendation = await recommendationCollection.findOne({
            _id: new ObjectId(id),
          });
          await recommendationCollection.deleteOne({ _id: new ObjectId(id) });
          await queriesCollection.updateOne(
            { _id: new ObjectId(recommendation.query_id) },
            { $inc: { recommendationCount: -1 } }
          );

          res
            .status(200)
            .json({ message: "Recommendation deleted successfully" });
        } catch (error) {
          console.error("Error deleting recommendation:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    );

    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
