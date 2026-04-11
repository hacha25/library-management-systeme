import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Dashboard() {
    const [stats, setStats] = useState(null)

    useEffect(() =>{
        api.get('/dashboard/stats')
        .then( res => setStats(res.data))
        .catch(err => console.log(err))
    },[])
    
    if(!stats) return <p>loading...</p>

    return (
        <div>
            <h1 className="text-2xl mb-6">Dashboard</h1>

            <div className="grid grid-cols-4 gap-4">

                <div className="bg-white p-4 shadow rounded border-l-6 border-blue-500">
                    <h3>Books</h3>
                    <p className="text-xl">{stats.total_books}</p>
                </div>

                <div className="bg-white p-4 shadow rounded border-l-6 border-yellow-500">
                    <h3>Users</h3>
                    <p className="text-xl">{stats.total_users}</p>
                </div>

                <div className="bg-white p-4 shadow rounded border-l-6 border-red-500">
                    <h3>Borrowed</h3>
                    <p className="text-xl">{stats.borrowed_books}</p>
                </div>

                <div className="bg-white p-4 shadow rounded border-l-6 border-green-500">
                    <h3>Overdue</h3>
                    <p className="text-xl">{stats.overdue_loans}</p>
                </div>
            </div>
        </div>
    )
}