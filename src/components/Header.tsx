import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <>
            <h2>Header</h2>
            <ul>
                <li><Link to="/">Index</Link></li>
                <li><Link to="/Login">Login</Link></li>
                <li><Link to="/Member">Member</Link></li>
                <li><Link to="/Register">Register</Link></li>
            </ul>
        </>
    )
}

export default Header
