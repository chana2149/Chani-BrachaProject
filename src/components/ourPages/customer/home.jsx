import { Link, Outlet, useNavigate } from "react-router-dom"
import '../ourCSS.css'
import { useEffect, useState } from "react";
import { GetCattegoryThunk } from "../../../redux/slices/cattegory/GetCattegoryThunk";
import { useDispatch, useSelector } from "react-redux";
import { GetProductsByCattegoryThunk } from "../../../redux/slices/products/GetProductsByCattegoryThunk";
import { getProductsThunk } from "../../../redux/slices/products/GetAllProductsThunk";
import { setcustCameFrom } from "../../../redux/slices/costumers/CostumerSlice";
import Tooltip from '@mui/material/Tooltip';
import { search } from "../../../redux/slices/products/ProductSlice";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const Home = () => {
    const dispatch = useDispatch();
    const isLoadingproducts = useSelector(state => state.products.loadingGet);
    const currentUser = useSelector(state => state.costumers.currentCust);
    const products = useSelector(state => state.products.productsList);
    const catt = useSelector(state => state.cattegory.cattagoryList);
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(GetCattegoryThunk())
    }, []);

    const search1 = (p) => {
        dispatch(search(p))
    }

    const waitt = (p) => {
        dispatch(GetProductsByCattegoryThunk(p.id));
    }

    const focusOnSearch = () => {
        if (products.length === 0)
            dispatch(getProductsThunk());
        navigate('products')
    }

    useEffect(() => {
        if (isLoadingproducts)
            navigate('products')
    }, [isLoadingproducts])

    // Featured categories - you can replace these with your actual categories
    const featuredCategories = catt.slice(0, 4);
    
    // Featured products - you can replace these with your actual products
    const featuredProducts = products.slice(0, 4);

    return <div>
        <header>
            <img className="img" src="/logo.png" alt="logo"></img>
            <div className="navigateLogin">
                {!currentUser && <Tooltip title="להתחברות" placement="bottom-start">
                    <Link className="headerButton" to={'login'} >
                        <Person2OutlinedIcon htmlColor="rgb(70, 65, 65)" sx={{ fontSize: 50, alignItems: 'flex-end' }} />
                    </Link>
                </Tooltip>}
                {currentUser && <Tooltip title={`${currentUser.name}`} placement="bottom-start">
                    <Link className="headerButton" to={'login'} >
                        <Person2OutlinedIcon htmlColor="rgb(70, 65, 65)" sx={{ fontSize: 50, alignItems: 'flex-end' }} />
                    </Link>
                </Tooltip>}
                {currentUser &&
                    <Tooltip title="לצפיה בסל" placement="bottom-start">
                        <Link className="headerButton" to={'showCart'} >
                            <ShoppingCartOutlinedIcon htmlColor="rgb(70, 65, 65)" sx={{ fontSize: 50, alignItems: 'flex-end' }} />
                        </Link>
                    </Tooltip>
                }
                {currentUser &&
                    <Tooltip title="ההזמנות שלי" placement="bottom-start">
                        <Link className="headerButton" to={'showOrders'} >
                            <CalendarTodayIcon htmlColor="rgb(70, 65, 65)" sx={{ fontSize: 50, alignItems: 'flex-start' }} />
                        </Link>
                    </Tooltip>}

                {currentUser &&
                    <Tooltip title="מועדפים" placement="bottom-start">
                        <Link className="headerButton" to={'showLove'} >
                            <FavoriteBorderIcon htmlColor="rgb(70, 65, 65)" sx={{ fontSize: 50, alignItems: 'flex-end' }} />
                        </Link>
                    </Tooltip>
                }
                {!currentUser && <p className="headerButtonEmpty"> </p>}
                {!currentUser && <p className="headerButtonEmpty"> </p>}
                {!currentUser && <p className="headerButtonEmpty"> </p>}
            </div>
        </header>
        
        <nav>
            <div className="navigateItems">
                {catt.map(p => 
                    <span className="navigateButton" onClick={() => { waitt(p) }} key={p.Id}>
                        <span>{p.name}</span>
                    </span>
                )}
                <span className="navigateButton" onClick={() => { dispatch(getProductsThunk()); navigate('products') }}>הצג הכל</span>
                <input className="navigateButtonSearch" placeholder={'חיפוש מוצר'} onFocus={() => { focusOnSearch() }} onChange={e => search1(e.target.value)} />
            </div>
        </nav>
        
        {/* Only show the homepage content when we're on the root path */}
        {window.location.pathname === '/home' && (
            <>
                {/* Hero Section */}
                <section className="hero-section">
                    <h1 className="hero-title">ציוד במה מקצועי להשכרה</h1>
                    <p className="hero-subtitle">אנו מספקים את הציוד האיכותי ביותר לאירועים, הופעות, ומופעים בכל הגדלים</p>
                    <Link to="products" className="hero-button" onClick={() => dispatch(getProductsThunk())}>
                        צפה במוצרים שלנו
                    </Link>
                </section>

                {/* Categories Section */}
                <section className="categories-section">
                    <h2 className="section-title">הקטגוריות שלנו</h2>
                    <div className="categories-grid">
                        {catt.map(category => (
                            <div className="category-card" key={category.id} onClick={() => { waitt(category); navigate('products') }}>
                                <img 
                                    src={category.name || `/category-placeholder.jpg`} 
                                    alt={category.name} 
                                    className="category-image" 
                                />
                                <div className="category-content">
                                    <h3 className="category-title">{category.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Featured Products Section */}
                <section className="featured-section">
                    <h2 className="section-title">מוצרים מובילים</h2>
                    <div className="products-grid">
                        {products.slice(0, 8).map(product => (
                            <div className="product-card" key={product.id} onClick={() => navigate(`productsMain/${product.id}`)}>
                                <img 
                                    src={`/public/pic/cat/${product.name}.png` || `/product-placeholder.jpg`} 
                                    alt={product.name} 
                                    className="product-image" 
                                />
                                <div className="product-content">
                                    <h3 className="product-title">{product.name}</h3>
                                    <p className="product-price">₪{product.price} / יום</p>
                                    {/* <a href="#" className="product-button">פרטים נוספים</a> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* About Section */}
                <section className="about-section">
                    <div className="about-content">
                        <h2 className="about-title">אודותינו</h2>
                        <p className="about-text">
                            אנו מתמחים בהשכרת ציוד במה מקצועי לאירועים מכל הסוגים. עם ניסיון של שנים בתחום, אנו מספקים את הציוד האיכותי ביותר בשוק, עם שירות מקצועי ואמין.
                        </p>
                        <p className="about-text">
                            הצוות המקצועי שלנו זמין לענות על כל שאלה ולסייע בבחירת הציוד המתאים ביותר לצרכים שלכם. אנו מתחייבים לספק את הציוד בזמן ובמצב מושלם.
                        </p>
                        <Link to="products" className="hero-button" onClick={() => dispatch(getProductsThunk())}>
                            צפה במוצרים שלנו
                        </Link>
                    </div>
                    <img src="/about-image.jpg" alt="About Us" className="about-image" />
                </section>
            </>
        )}

        <div>
            <Outlet></Outlet>
        </div>
        
        <footer>
            <div className="footer-content">
                <p>כל הזכויות שמורות © BL&C {new Date().getFullYear()}</p>
                <p>השכרת ציוד במה מקצועי | טלפון: 03-1234567 | דוא"ל: info@blc-stage.com</p>
            </div>
        </footer>
    </div>
}
