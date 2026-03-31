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
            <h1 className="text-2xl mb-4">My Loans</h1>

            <table className="w-full bg-white shadow">

                <thead>
                    <tr>
                        <th>Book</th>
                        <th>Borrowed At</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        loans.map( loan => (
                            <tr key={loan.id} className="border-t text-center">

                                <td>{loan.book}</td>
                                <td>{new Date(loan.loan_date).toLocaleDateString()}</td>
                                <td>{new Date(loan.due_date).toLocaleDateString()}</td>
                                <td>{loan.status}</td>

                                <td>
                                    {loan.status === "borrowed" ? (
                                        <button
                                        onClick={() => handleReturn(loan.id)}
                                        className="bg-green-500 text-white px-2 py-1 my-1 rounded"
                                        >
                                            Return
                                        </button>
                                    )
                                :(
                                    <span className="text-gray-500 px-2 py-1 my-1 d-block">returned</span>
                                )}  
                                </td>

                            </tr>
                        ))}
                </tbody>
            </table>


        </div>
    )
}