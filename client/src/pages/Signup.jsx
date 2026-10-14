import { useState } from "react"
import { useAuth } from "../context/authContext";


function Signup() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    })

    const { register } = useAuth()

    const handleChangeValue = (e) => {
        const { value, name } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }))
    }


    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await register(userData)
            setUserData({
                name: "",
                email: "",
                password: "",
                role: ""
            })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <form onSubmit={handleSignup}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={userData.name} onChange={handleChangeValue} />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={userData.email} onChange={handleChangeValue} />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={userData.password} onChange={handleChangeValue} />

                <select name="role" onChange={handleChangeValue}>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                </select>

                <button type="submit">SignUp</button>
            </form>
        </div>
    )
}

export default Signup