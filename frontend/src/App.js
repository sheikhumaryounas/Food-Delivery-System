import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [foods, setFoods] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [editingId, setEditingId] = useState(null);

    const fetchFoods = async () => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (filterCategory && filterCategory !== "all") params.append("category", filterCategory);

        const res = await axios.get(`http://localhost:5000/foods?${params.toString()}`);
        setFoods(res.data);
    };

    useEffect(() => {
        fetchFoods();
    }, [search, filterCategory]);

    const resetForm = () => {
        setName("");
        setPrice("");
        setCategory("");
        setImage("");
        setEditingId(null);
    };

    const saveFood = async () => {
        if (!name || !price || !category) {
            alert("Please enter name, price, and category.");
            return;
        }

        const payload = {
            name,
            price: Number(price),
            category,
            image
        };

        if (editingId) {
            await axios.put(`http://localhost:5000/foods/${editingId}`, payload);
        } else {
            await axios.post("http://localhost:5000/foods", payload);
        }

        resetForm();
        fetchFoods();
    };

    const deleteFood = async (id) => {
        if (editingId === id) {
            resetForm();
        }

        await axios.delete(`http://localhost:5000/foods/${id}`);
        fetchFoods();
    };

    const editFood = (food) => {
        setEditingId(food._id);
        setName(food.name || "");
        setPrice(food.price || "");
        setCategory(food.category || "");
        setImage(food.image || "");
    };

    const categories = [
        "all",
        ...Array.from(new Set(foods.map((food) => food.category).filter(Boolean)))
    ];

    return (
        <div className="app-shell">
            <div className="app-panel">
                <header className="app-header">
                    <div>
                        <p className="eyebrow">MERN Food Delivery</p>
                        <h1>Restaurant Menu Manager</h1>
                        <p className="subtitle">Add, update, search, and manage menu items in one dashboard.</p>
                    </div>
                </header>

                <section className="toolbar">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search food items"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="filter-box">
                        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat === "all" ? "All Categories" : cat}
                                </option>
                            ))}
                        </select>
                    </div>
                </section>

                <section className="form-panel">
                    <div className="form-grid">
                        <div className="form-field">
                            <label>Food Name</label>
                            <input
                                type="text"
                                placeholder="Enter food name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-field">
                            <label>Price</label>
                            <input
                                type="number"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="form-field">
                            <label>Category</label>
                            <input
                                type="text"
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>
                        <div className="form-field">
                            <label>Image URL</label>
                            <input
                                type="text"
                                placeholder="Paste image URL"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-actions">
                        <button className="btn-primary" onClick={saveFood}>
                            {editingId ? "Update Item" : "Add Item"}
                        </button>
                        {editingId && (
                            <button className="btn-secondary" onClick={resetForm}>
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </section>

                <section className="food-grid">
                    {foods.length === 0 ? (
                        <div className="empty-state">
                            <h2>No food items found</h2>
                            <p>Use the form above to add menu items and start managing orders.</p>
                        </div>
                    ) : (
                        foods.map((food) => (
                            <article key={food._id} className="food-card">
                                <div className="food-image">
                                    {food.image ? (
                                        <img src={food.image} alt={food.name} />
                                    ) : (
                                        <div className="image-placeholder">No Image</div>
                                    )}
                                </div>
                                <div className="food-details">
                                    <h3>{food.name}</h3>
                                    <p className="food-category">{food.category}</p>
                                    <p className="food-price">${food.price.toFixed(2)}</p>
                                </div>
                                <div className="food-actions">
                                    <button className="btn-secondary" onClick={() => editFood(food)}>
                                        Edit
                                    </button>
                                    <button className="btn-danger" onClick={() => deleteFood(food._id)}>
                                        Delete
                                    </button>
                                </div>
                            </article>
                        ))
                    )}
                </section>
            </div>
        </div>
    );
}

export default App;
