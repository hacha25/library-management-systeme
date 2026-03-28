import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const {login} = useAuth()

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const res = await api.post('/login', {
                email,
                password
            })

            // token + user mn backend
            const {token, user} = res.data

            // save token
            login(user, token)

            // if admin
            if (user.role === 'admin'){
                navigate('/admin/dashboard')
            }else {
                navigate('/home')
            }


        } catch (err) {
            console.log(err)
            alert("loggin failed")
        }
    }

    return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="p-6 shadow-md rounded w-80">
        <h2 className="text-xl mb-4">Login</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-500 text-white w-full p-2">
          Login
        </button>
      </form>
    </div>
  );
}