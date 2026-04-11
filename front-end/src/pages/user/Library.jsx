import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Library() {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("")

    useEffect(() => {
        api.get(`/books?search=${search}`)
        .then( res => setBooks(res.data.data))
    },[search])

    const handleBorrow = (isbn) => {
        api.post('/loans', {book_isbn: isbn})
        .then( () => alert("Book borrowed successfully"))
    }


    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl ">Library</h1>
                <input
                type="text"
                placeholder="Search book ..."
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2  rounded"
                />
            </div>
            

            <div className="grid grid-cols-4 gap-6">

                {
                    books.map(book => (
                        <div key={book.isbn} className="bg-white rounded shadow p-4">

                            <img 
                            src={`http://127.0.0.1:8000/storage/${book.image}`} 
                            className="w-full h-40 object-cover mb-4" 
                            alt={book.title}
                            />

                            <h2 className="text-lg font-bold">{book.title}</h2>
                            <p className="text-sm text-gray-600">{book.author}</p>
                            <p className="mt-2">Available: {book.available}</p>

                            <button 
                            onClick={() =>handleBorrow(book.isbn)}
                            className="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-1 mt-3 rounded">
                                Borrow
                            </button>
                        </div>
                    ))
                }
                
            </div>
        </div>
    )
}