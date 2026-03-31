import { useState, useEffect } from "react";
import api from "../../services/api"

import { useNavigate, useParams } from "react-router-dom";

export default function EditBook() {
    const {isbn} = useParams();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        isbn: "",
        title: "",
        author: "",
        category_name: "",
        published_date: "",
        quantity: 0
    })

    useEffect(() => {
        api.get(`/books/${isbn}`)
        .then( res => {
            setForm(res.data);
            setLoading(false);
        })
        .catch( err => console.log(err))
    },[isbn])

    const handleChange = (e) => {
        setForm ({
            ...form, 
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`books/${isbn}`,form);
            navigate("/admin/books");
        } catch (err) {
            console.log(err);
        }
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Edit Book</h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input type="text" name="isbn" placeholder="ISBN" value={form.isbn} disabled className="w-full p-2 border rounded" required />
                <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="author" placeholder="Author" value={form.author} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="category_name" placeholder="Category" value={form.category_name} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="date" name="published_date" placeholder="Published Date" value={form.published_date} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} className="w-full p-2 border rounded" required />

                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    Update
                </button>
            </form>
        </div>
    )
}