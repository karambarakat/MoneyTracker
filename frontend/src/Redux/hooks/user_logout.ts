import { USER_LOGOUT } from "@redux/actions/user"
import { useDispatch } from "react-redux"

export default function () {
    const dispatch = useDispatch()
    return () => {
        dispatch({ type: USER_LOGOUT })
    }
}