import './Navbar.scss';
import {Button} from "../index";

export default function Navbar() {
    return (
        <div className="navbar-container">
            <nav className="nav">
                <a href="/">Home</a>
                <a href="/products">Products</a>
                <a href="/organization">Organization</a>
                <a href="/account">Account</a>
                <a href="/help">Help</a>
            </nav>
            <Button>Call Jessica</Button>
        </div>
    )
}
