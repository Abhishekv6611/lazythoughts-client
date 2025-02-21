import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout=()=>{
    const token=sessionStorage.getItem("token")
    return (
        token?<Outlet/>:<Navigate to={'/signin'} replace/>
    )
}
export default ProtectedLayout