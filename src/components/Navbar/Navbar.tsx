import './Navbar.scss';
import {Button, Dialog, VoiceRecording} from "../index";
import {ReactNode, useRef, useState} from "react";
import {CallIcon, CloseIcon, MenuIcon} from "../../icons";

export default function Navbar() {
    const [showDialog, setShowDialog] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const showNavbar = () => {
        navRef.current?.classList.toggle("responsive_nav");
    }

    const toggleDialog = () => {
        setShowDialog(!showDialog)
    }

    const closeBtnTemplate: ReactNode =
        <Button className="hang-up-icon-btn" size="icon" variant="destructive">
            <CallIcon />
        </Button>

    return (
        <div className="navbar-container">
            <Button variant="ghost" size="small" className="nav-btn" onClick={showNavbar}>
                <MenuIcon className="menu-icon"/>
            </Button>

            <nav className="nav" ref={navRef}>
                <Button variant="ghost" size="small" className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <CloseIcon className="close-icon"/>
                </Button>
                <a href="/">Home</a>
                <a href="/products">Products</a>
                <a href="/organization">Organization</a>
                <a href="/account">Account</a>
                <a href="/help">Help</a>
            </nav>
            <Button onClick={toggleDialog}>Call Jessica</Button>
            <Dialog
                className="calling-dialog"
                size="small"
                title="Calling Jessica"
                showSeparator={false}
                isOpen={showDialog}
                customCloseBtn={closeBtnTemplate}
                onClose={toggleDialog}
            >
                <VoiceRecording></VoiceRecording>
            </Dialog>
        </div>
    )
}
