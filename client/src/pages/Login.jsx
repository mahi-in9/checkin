import { useState } from "react"
import { useAuth } from "../context/authContext";


function Login() {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const { login } = useAuth()

    const handleChangeValue = (e) => {
        const { value, name } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }))
    }


    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await login(userData)
            setUserData({
                email: "",
                password: ""
            })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSignup}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={userData.email} onChange={handleChangeValue} />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={userData.password} onChange={handleChangeValue} />

                <button type="submit">SignUp</button>
            </form>
        </div>
    )
}

export default Login