const express = require("express");
const app = express();
const port = 3030;
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("Your database connection", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Define your Mongoose schema and model for the 'persons' collection
const personSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  age: Number,
});

//collection name in "////"
const Person = mongoose.model("users", personSchema);

// Route to fetch all persons
app.get("/api/persons", async (req, res) => {
  try {
    const data = await Person.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

// Route to fetch a person by their URL name
app.get("/api/persons/:urlName", async (req, res) => {
  try {
    const urlName = req.params.urlName;
    const person = await Person.findOne({ urlName: urlName });
    if (person) {
      res.json(person);
    } else {
      res.status(404).send("Person not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

// Route to submit a new person
app.post('/api/persons/submitUser', async (req, res) => {
  try {
    const userData = req.body;
    const newPerson = new Person(userData);
    await newPerson.save();
    res.json(newPerson);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving data");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
