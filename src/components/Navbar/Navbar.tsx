import './Navbar.scss';
import {Button} from "../index";
import {useRef} from "react";

export default function Navbar() {
    const navRef = useRef<HTMLDivElement>(null);
    const showNavbar = () => {
        navRef.current?.classList.toggle("responsive_nav");
    }

    return (
        <div className="navbar-container">
            <Button variant="ghost" size="small" className="nav-btn" onClick={showNavbar}>
                <img src="/menu.svg" alt="Close" className="button-icon" />
            </Button>
            <nav className="nav" ref={navRef}>
                <Button variant="ghost" size="small" className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <img src="/close.svg" alt="Close" className="button-icon" />
                </Button>
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
