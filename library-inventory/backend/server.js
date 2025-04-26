const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");
const port = 8000;

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors()); // Enable CORS
app.use(express.static("./"));

const URL = "mongodb://127.0.0.1:27017"; // MongoDB connection URL
const client = new MongoClient(URL);
let db;

// Connect to MongoDB
(async () => {
  try {
    await client.connect();
    console.log("MongoDB connected successfully");
    db = client.db("library"); // Use "library" database
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
})();

// GET route to fetch all books
app.get("/api/books", async (req, res) => {
  try {
    const books = await db.collection("books").find().toArray(); // Fetch books from the "books" collection
    res.json(books); // Return the books as a JSON response
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ message: "Error fetching books" });
  }
});

app.get("/api/issuedBooks", async (req, res) => {
  try {
    const books = await db.collection("borrow").find().toArray(); // Fetch books from the "books" collection
    res.json(books); // Return the books as a JSON response
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ message: "Error fetching books" });
  }
});

// POST route to add a new book
app.post("/issueData", async (req, res) => {
  try {
    const borrow = req.body.issueData; // Get the book details from the request body
    const result = await db.collection("borrow").insertOne(borrow); // Insert the new book into the "books" collection
    res.status(201).json(result); // Return the newly added book as a response
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({ message: "Error adding book" });
  }
});

app.post("/addbooks", async (req, res) => {
  try {
    const newBook = req.body.newBook; // Get the book details from the request body
    const result = await db.collection("books").insertOne(newBook); // Insert the new book into the "books" collection
    res.status(201).json(result); // Return the newly added book as a response
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({ message: "Error adding book" });
  }
});

// PUT route to update an existing book
app.put("/updatebooks/:id", async (req, res) => {
  try {
    const bookId = req.params.id; // Get the book ID from the URL parameter
    const updatedBook = req.body; // Get the updated book data from the request body

    // Ensure the ID is a valid ObjectId
    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const result = await db.collection("books").updateOne(
      { _id: new ObjectId(bookId) }, // Filter by book ID
      { $set: updatedBook } // Set the new values for the book
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book updated successfully" });
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ message: "Error updating book" });
  }
});

// DELETE route to delete a book
app.delete("/deletebooks/:id", async (req, res) => {
  try {
    const bookId = req.params.id; // Get the book ID from the URL parameter

    // Ensure the ID is a valid ObjectId
    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const result = await db
      .collection("books")
      .deleteOne({ _id: new ObjectId(bookId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ message: "Error deleting book" });
  }
});

// Return a borrowed book
app.delete("/returnbook/:id", async (req, res) => {
  try {
    const bookId1 = req.params.id; // Get the book ID from the URL parameter

    // Ensure the ID is a valid ObjectId
    if (!ObjectId.isValid(bookId1)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const result = await db
      .collection("borrow")
      .deleteOne({ _id: new ObjectId(bookId1) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "book return deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ message: "Error deleting book" });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
