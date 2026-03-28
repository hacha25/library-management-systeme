import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateBook() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        isbn: "",
        title: "",
        author: "",
        category_name: "",
        published_date: "",
        quantity: "",
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        api.post("/books", form)
        .then(() => navigate("/admin/books"))
        .catch((err) => {
            console.error(err);
            alert("Failed to create book. Please try again.");
        })
    }

    return (
        <div>
            <h1 className="text-2xl mb-4"> Add book</h1>

            <form onSubmit={handleSubmit} className="space-y-3">

                <input type="text" name="isbn" placeholder="ISBN" value={form.isbn} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="author" placeholder="Author" value={form.author} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="category_name" placeholder="Category" value={form.category_name} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="date" name="published_date" placeholder="Published Date" value={form.published_date} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} className="w-full p-2 border rounded" required />
            
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Book</button>
            </form>
        </div>
    )
}