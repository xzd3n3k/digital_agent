import './Navbar.scss';

export default function Navbar() {
    return (
        <div className="navbar-container">
            <nav className="nav">
                <ul className="menu">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/products">Products</a>
                    </li>
                    <li>
                        <a href="/organization">Organization</a>
                    </li>
                    <li>
                        <a href="/account">Account</a>
                    </li>
                    <li>
                        <a href="/help">Help</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
