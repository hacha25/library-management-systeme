import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchBooks = () => {
    api
      .get(`/books?search=${search}`)
      .then((res) => setBooks(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBooks();
  }, [search]);

  const handleDelete = (isbn) => {
    api.delete(`books/${isbn}`).then(() => fetchBooks());
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Books</h1>

      {/* SEARCH */}
      <input
        placeholder="search..."
        className="border p-2 mb-4"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button 
      className="bg-blue-500 text-white px-4 py-2 mb-4"
      onClick={() =>navigate("/admin/books/create")}
       >Add book</button>

      {/* BOOKS */}
      <table className="w-full bg-white shadow rounded">

        <thead>
          <tr className="bg-gray-200">
            <th>ISBN</th>
            <th>Title</th>
            <th>Author</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

            {books.map((book) => (
                <tr key={book.isbn} className="border-t text-center">
                    <td>{book.isbn}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.available}</td>

                    <td>
                        <button 
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(book.isbn)}>
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>

      </table>
    </div>
  );
}
