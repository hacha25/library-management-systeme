import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function UserLayout({children}) {
    const {user, logout} = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-white shadow p-4 flex justify-between items-center">

                <h1 className='font-bold text-lg'>Library App</h1>

                <div className="flex gap-4 items-center">

                    <Link to='/library' className='hover:text-blue-500'>Library</Link>
                    <Link to='/my-loans' className='hover:text-blue-500'>Profile</Link>

                    <span className='text-sm text-gray-600'>{user?.name}</span>
                    <button 
                    onClick={handleLogout}
                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                    >Logout</button>

                </div>


            </div>

            <div className="p-6">
                {children}
            </div>
        </div>
    )
}