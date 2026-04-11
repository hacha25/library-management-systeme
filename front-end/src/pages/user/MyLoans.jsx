import { useState, useEffect } from "react";
import api from "../../services/api";

export default function MyLoans() {
    const [loans, setLoans] = useState([])

    const fetchLoans = () => {
        const user = JSON.parse(localStorage.getItem("user"))
        api.get(`/loans?user_id=${user.id}`)
        .then( res => {
            setLoans(res.data.data)
        })
    }

    useEffect(() => {
        fetchLoans()
    },[])

    const handleReturn = (id) => {
        api.put(`/loans/${id}`)
        .then(() => fetchLoans())
    }

    return (
        <div>

      <h1 className="text-2xl mb-6">My Loans</h1>

      <div className="grid grid-cols-4 gap-6">

        {loans.map(loan => {

          const isOverdue =
            loan.status === "borrowed" &&
            new Date(loan.due_date) < new Date();
          const rest = new Date(loan.due_date) - new Date() ;
          const restDays = Math.ceil(rest / (1000 * 60 * 60 * 24))

          return (
            <div key={loan.id} className="bg-white rounded shadow p-4">

              <img
                src={
                  loan.book?.image
                    ? `http://127.0.0.1:8000/storage/${loan.book.image}`
                    : "https://via.placeholder.com/150"
                }
                className="w-full h-40 object-cover mb-3 rounded"
              />

              <h2 className="font-bold">{loan.book?.title}</h2>

              {/* Status */}
              <p className="mt-2">
                Status:{" "}
                <span
                  className={
                    isOverdue
                      ? "bg-red-500"
                      : loan.status === "returned"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }
                >
                  {isOverdue ? "Overdue" : loan.status}
                </span>
              </p>

              <p className="text-sm mt-1">
                Due: {new Date(loan.due_date).toLocaleDateString()}
              </p>
              <p>
                {loan.status === "borrowed" && (
                  <span className="">Rest : <i className="text-blue-500">{restDays} jours</i></span>
                )}
              </p>

              {/* Action */}
              {loan.status === "borrowed" && (
                <button
                  onClick={() => handleReturn(loan.id)}
                  className="bg-green-500 text-white w-full mt-3 py-1 rounded hover:scale-105 transition"
                >
                  Return
                </button>
              )}

            </div>
          );
        })}

      </div>

    </div>
    )
}