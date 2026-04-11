import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/loans.css";

export default function Loans() {
  const [loans, setLoans] = useState([]);
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState("");

  const fetchLoans = async () => {
    let url = "/loans?";

    if (status) url += `status=${status}&`;
    if (userId) url += `user_id=${userId}&`;

    await api.get(url).then((res) => setLoans(res.data.data));
  };

  useEffect(() => {
    fetchLoans();
  }, [status, userId]);

  return (
    <div className="loans-container">
      <h1 className="loans-title">Loans Management</h1>

      {/* Filters */}
      <div className="loans-filters">
        <select onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="borrowed">Borrowed</option>
          <option value="returned">Returned</option>
        </select>

        <input
          type="number"
          placeholder="User ID"
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>

      {/* Table */}
      <table className="loans-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Book</th>
            <th>Status</th>
            <th>Due Date</th>
          </tr>
        </thead>

        <tbody>
          {loans.map((loan) => {
            const isOverdue =
              loan.status === "borrowed" &&
              new Date(loan.due_date) < new Date();

            return (
              <tr key={loan.id}>
                <td>{loan.user?.name}</td>
                <td>{loan.book?.title}</td>

                <td>
                  <span
                    className={
                      isOverdue
                        ? "status-overdue"
                        : loan.status === "returned"
                          ? "status-returned"
                          : "status-borrowed"
                    }
                  >
                    {isOverdue ? "Overdue" : loan.status}
                  </span>
                </td>

                <td>{new Date(loan.due_date).toLocaleDateString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
