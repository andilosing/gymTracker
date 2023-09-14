import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"


const RequireAuth = () => {
    const token = useSelector(state => state.auth)

    return (
        token
            ? <Outlet />
            : <Navigate to="/login" />
    )
}
export default RequireAuth