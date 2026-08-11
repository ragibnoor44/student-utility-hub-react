function Navbar({ brandName }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <a className="navbar-brand" href="#">{brandName}</a>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">Login</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">About</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;