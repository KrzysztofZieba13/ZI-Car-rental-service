import {NavLink} from "react-router";

const Home = () => {
    return <div>
        <h1>Home</h1>
        <NavLink to="/login" end>Login</NavLink>
        <NavLink to="/signup" end>Signup</NavLink>
    </div>
}

export default Home;