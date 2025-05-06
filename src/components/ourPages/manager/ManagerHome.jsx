import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import '../ourCSS.css';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetCattegoryThunk } from "../../../redux/slices/cattegory/GetCattegoryThunk";
import StoreIcon from '@mui/icons-material/Store';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
export const ManagerHome = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState("");

    useEffect(() => {
        dispatch(GetCattegoryThunk());
    }, []);

    useEffect(() => {
        const path = location.pathname.split('/').pop();
        setCurrentPage(path || 'sniffim');
    }, [location]);
    
    const handleLogout = () => {
        // Add logout logic here
        navigate('/');
    };
    
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    
    const getPageTitle = () => {
        switch(currentPage) {
            case 'sniffim': return 'ניהול סניפים';
            case 'costumer': return 'ניהול לקוחות';
            case 'products': return 'ניהול מוצרים';
            case 'instructions': return 'הוראות ניהול';
            default: return 'ניהול סניפים';
        }
    };
    
    return (
        <div className="manager-layout">
            <aside className={`manager-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                <div className="sidebar-header">
                    <img className="sidebar-logo" src="/logo.png" alt="logo" />
                    <button className="mobile-menu-close" onClick={toggleMobileMenu}>
                        <CloseIcon />
                    </button>
                </div>
                
                <nav className="sidebar-nav">
                    <Link
                        className={`nav-item ${currentPage === 'sniffim' ? 'active' : ''}`}
                        to="sniffim"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <StoreIcon />
                        <span>סניפים</span>
                    </Link>
                    
                    <Link
                        className={`nav-item ${currentPage === 'costumer' ? 'active' : ''}`}
                        to="costumer"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <PeopleIcon />
                        <span>לקוחות</span>
                    </Link>
                    
                    <Link
                        className={`nav-item ${currentPage === 'products' ? 'active' : ''}`}
                        to="products"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <InventoryIcon />
                        <span>מוצרים</span>
                    </Link>
                    
                    <div className="nav-divider"></div>
                    
                    <Link
                        className={`nav-item ${currentPage === 'instructions' ? 'active' : ''}`}
                        to="instructions"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <HelpIcon />
                        <span>הוראות ניהול</span>
                    </Link>
                    
                    <button className="nav-item logout" onClick={handleLogout}>
                        <LogoutIcon />
                        <span>התנתקות</span>
                    </button>
                </nav>
            </aside>
            
            <main className="manager-content">
                <header className="manager-header">
                    <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                        <MenuIcon />
                    </button>
                    
                    <h1 className="page-title">{getPageTitle()}</h1>
                    
                    <div className="header-actions">
                        <div className="user-profile">
                            <ManageAccountsOutlinedIcon/>
                            <span className="user-name">מנהל המערכת</span>
                        </div>
                    </div>
                </header>
                
                <div className="content-wrapper">
                    <Outlet />
                </div>
                
                <footer className="manager-footer">
                    <div className="footer-content">
                        ©bl&c {new Date().getFullYear()} - כל הזכויות שמורות
                    </div>
                </footer>
            </main>
        </div>
    );
};
