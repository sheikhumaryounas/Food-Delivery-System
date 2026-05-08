const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/foodDB")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// FOOD SCHEMA
const foodSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image: String
});

const Food = mongoose.model("Food", foodSchema);

// GET ALL FOOD
app.get("/foods", async (req, res) => {
    try {
        const { search, category } = req.query;
        const filter = {};

        if (search) {
            filter.name = new RegExp(search, "i");
        }

        if (category && category !== "all") {
            filter.category = category;
        }

        const foods = await Food.find(filter);
        res.json(foods);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ADD FOOD
app.post("/foods", async (req, res) => {
    const newFood = new Food(req.body);
    await newFood.save();
    res.json(newFood);
});

// DELETE FOOD
app.delete("/foods/:id", async (req, res) => {
    await Food.findByIdAndDelete(req.params.id);
    res.json({
        message: "Food Deleted"
    });
});

// UPDATE FOOD
app.put("/foods/:id", async (req, res) => {
    const updatedFood = await Food.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updatedFood);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});