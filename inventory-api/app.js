const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "vws2-inventory",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database vws2-inventory");
});

app.get("/items", (req, res) => {
  connection.query("SELECT * FROM items", (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Add a new item
app.post("/items", (req, res) => {
  const newItem = req.body;
  connection.query("INSERT INTO items SET ?", newItem, (error, results) => {
    if (error) throw error;
    res.status(201).send(`Item added with ID: ${results.insertId}`);
  });
});

// Update an item
app.put("/items/:id", (req, res) => {
  const id = req.params.id;
  const updatedItem = req.body;
  connection.query(
    "UPDATE items SET ? WHERE id = ?",
    [updatedItem, id],
    (error, results) => {
      if (error) throw error;
      res.send("Item updated successfully.");
    }
  );
});

// Delete an item
app.delete("/items/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM items WHERE id = ?", id, (error, results) => {
    if (error) throw error;
    res.send("Item deleted.");
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
