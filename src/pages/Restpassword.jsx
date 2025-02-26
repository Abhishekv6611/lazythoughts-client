import axios from 'axios';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { URL } from '../store/url';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Restpassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password) {
            toast.error("Please enter a new password");
            return;
        }
        
        setLoading(true);
        try {
            const res = await axios.post(`${URL}/resetpassword/${token}`, 
                { password }, // Ensure password is being sent
            );
    
            if (res.data.success) {
                toast.success("Password reset successfully");
                setTimeout(() => {
                    navigate("/signin");
                }, 2000);
            }
        } catch (error) {
            console.log("Error in password reset:", error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <>
            <div className="w-screen h-screen bg-[#2C3930]">
                <div className="flex justify-center items-center ">
                    <div className="max-w-md bg-[#3F4F44] rounded-lg p-1 lg:p-5 mt-10">
                        <div className="p-10 grid">
                            <h1 className="text-center text-2xl font-semibold text-[#DCD7C9] mb-2">Reset Your Password!!</h1>
                            <label className="text-center mb-2 font-semibold text-[#DCD7C9]" htmlFor="password">Enter your New Password</label>
                            <input onChange={e => setPassword(e.target.value)} id="password" type="password" className="p-1 rounded" />
                            <button
                                onClick={handleSubmit}
                                className="bg-[#2C3930] hover:bg-[#1b281f] p-1 mt-2 rounded-sm font-semibold text-[#DCD7C9]"
                                disabled={loading} // Disable button while loading
                            >
                                {loading ? (
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                ) : (
                                    "Reset Password"
                                )}
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Restpassword
