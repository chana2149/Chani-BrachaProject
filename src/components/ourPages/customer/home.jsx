import { Link, Outlet, useNavigate } from "react-router-dom"
import '../ourCSS.css'
import { useEffect, useState, useRef } from "react";
import { GetCattegoryThunk } from "../../../redux/slices/cattegory/GetCattegoryThunk";
import { useDispatch, useSelector } from "react-redux";
import { GetProductsByCattegoryThunk } from "../../../redux/slices/products/GetProductsByCattegoryThunk";
import { getProductsThunk } from "../../../redux/slices/products/GetAllProductsThunk";
import { logoutCustomer, setcustCameFrom } from "../../../redux/slices/costumers/CostumerSlice";
import Tooltip from '@mui/material/Tooltip';
import { search } from "../../../redux/slices/products/ProductSlice";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChatIcon from '@mui/icons-material/Chat';
import VisibilityIcon from '@mui/icons-material/Visibility'; // אייקון עין לצפייה
import SearchIcon from '@mui/icons-material/Search'; // אייקון חיפוש
import LocalMallIcon from '@mui/icons-material/LocalMall'; // אייקון תיק קניות


export const Home = () => {
    const dispatch = useDispatch();
    const isLoadincattegory = useSelector(state => state.cattegory.loading);
    const isLoadingproducts = useSelector(state => state.products.loadingGet);
    const currentUser = useSelector(state => state.costumers.currentCust);
    const products = useSelector(state => state.products.productsList);
    const catt = useSelector(state => state.cattegory.cattagoryList);
    const navigate = useNavigate();
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [showChat, setShowChat] = useState(false);

    // Reference for statistics section for animation
    const statsRef = useRef(null);
    const [statsVisible, setStatsVisible] = useState(false);

    useEffect(() => {
        dispatch(GetCattegoryThunk());

        // Add scroll event listener for back to top button
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }

            // Check if stats section is visible
            if (statsRef.current) {
                const rect = statsRef.current.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom >= 0) {
                    setStatsVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

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

    // Statistics data
    const statistics = [
        { icon: <PeopleIcon />, value: "1,500+", label: "לקוחות מרוצים" },
        { icon: <EventIcon />, value: "3,200+", label: "אירועים מוצלחים" },
        { icon: <BarChartIcon />, value: "98%", label: "שביעות רצון" },
        { icon: <StarIcon />, value: "12+", label: "שנות ניסיון" }
    ];

    // Testimonials data
    const testimonials = [
        {
            id: 1,
            name: "דני כהן",
            role: "מפיק אירועים",
            image: "/testimonials/person1.jpg",
            text: "השירות המקצועי והציוד האיכותי הפכו את האירוע שלנו להצלחה גדולה. אני ממליץ בחום על BL&C לכל מי שמחפש ציוד במה ברמה הגבוהה ביותר."
        },
        {
            id: 2,
            name: "מיכל לוי",
            role: "מנהלת הפקות",
            image: "/testimonials/person2.jpg",
            text: "עבדנו עם BL&C במספר אירועים גדולים והם תמיד עומדים בזמנים, מספקים ציוד מעולה ונותנים שירות מקצועי. שותף אמין להפקות מוצלחות!"
        },
        {
            id: 3,
            name: "יוסי אברהם",
            role: "מנהל טכני",
            image: "/testimonials/person3.jpg",
            text: "הציוד תמיד במצב מעולה והצוות הטכני שלהם מקצועי ואדיב. שמחים לעבוד איתם באופן קבוע ולהמליץ עליהם לאחרים בתעשייה."
        }
    ];

    // פונקציה לפתיחת צ'אט
    const openChat = () => {
        setShowChat(true);
    };

    // פונקציה לסגירת צ'אט
    const closeChat = () => {
        setShowChat(false);
    };

    // פונקציה לשליחת הודעה בצ'אט
    const [chatMessage, setChatMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);

    const sendChatMessage = (e) => {
        e.preventDefault();
        if (chatMessage.trim() !== '') {
            setChatMessages([...chatMessages, { text: chatMessage, sender: 'user' }]);
            setChatMessage('');

            // סימולציה של תשובה אוטומטית
            setTimeout(() => {
                setChatMessages(prev => [...prev, {
                    text: 'תודה על פנייתך! נחזור אליך בהקדם.',
                    sender: 'system'
                }]);
            }, 1000);
        }
    };

    return <div>
        {(isLoadingproducts || isLoadincattegory) && (
            <div className="fullscreen-loading-overlay">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
                <p className="loading-text">טוען נתונים...</p>
            </div>
        )}

        <header>
            <Tooltip title="דף הבית" placement="bottom-start">
                <img onClick={() => navigate("/home")} className="img headerButton" src="/logo.png" alt="logo"></img>
            </Tooltip>
            <div className="navigateLogin">
                {currentUser && `שלום ${currentUser.name}`}
                {!currentUser && <Tooltip title="להתחברות" placement="bottom-start">
                    <Link className="headerButton" to={'login'} >
                        <Person2OutlinedIcon htmlColor="rgb(70, 65, 65)" sx={{ fontSize: 50, alignItems: 'flex-end' }} />
                    </Link>
                </Tooltip>}
                {currentUser && <Tooltip title={`להתנתקות`} placement="bottom-start">
                    <button className="headerButton" onClick={() => dispatch(logoutCustomer())}>
                        <Person2OutlinedIcon htmlColor="rgb(70, 65, 65)" sx={{ fontSize: 50, alignItems: 'flex-end' }} />
                    </button>
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
            </div>
        </nav>
        {/* Only show the homepage content when we're on the root path */}
        {window.location.pathname === '/home' && (
            <>
                {/* Hero Section */}
                <section className="hero-section ">
                    <h1 className="hero-title">ציוד במה מקצועי להשכרה</h1>
                    <p className="hero-subtitle">אנו מספקים את הציוד האיכותי ביותר לאירועים, הופעות, ומופעים בכל הגדלים</p>
                    <Link to="products" className="hero-button" onClick={() => dispatch(getProductsThunk())}>
                        צפה במוצרים שלנו
                    </Link>
                </section>



                {/* Statistics Section */}
                <section className="statistics-section" ref={statsRef}>
                    <h2 className="section-title">המספרים מדברים בעד עצמם</h2>
                    <div className={`statistics-grid ${statsVisible ? 'stats-visible' : ''}`}>
                        {statistics.map((stat, index) => (
                            <div className="statistic-card" key={index}>
                                <div className="statistic-icon">{stat.icon}</div>
                                <div className="statistic-value">{stat.value}</div>
                                <div className="statistic-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Categories Section */}
                <section className="categories-section">
                    <h2 className="section-title">הקטגוריות שלנו</h2>
                    <div className="categories-grid">
                        {catt.map(category => (
                            <div className="category-card" key={category.id} onClick={() => { waitt(category); navigate('products') }}>
                                <img
                                    src={`pic/cat/${category.name}.png`}
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
                {/* Testimonials Section */}
                <section className="testimonials-section">
                    <h2 className="section-title">מה הלקוחות שלנו אומרים</h2>
                    <div className="testimonials-grid">
                        {testimonials.map(testimonial => (
                            <div className="testimonial-card" key={testimonial.id}>
                                <div className="testimonial-quote">
                                    <FormatQuoteIcon className="quote-icon" />
                                </div>
                                <p className="testimonial-text">{testimonial.text}</p>
                                <div className="testimonial-author">

                                    <div className="testimonial-info">
                                        <h4 className="testimonial-name">{testimonial.name}</h4>
                                        <p className="testimonial-role">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                {/* Featured Products Arrow Button */}
                {/* <div className="featured-products-arrow" onClick={() => {
                    dispatch(getProductsThunk());
                    navigate('products');
                }}>
                    <ArrowForwardIcon className="arrow-icon" />
                    <span className="arrow-text">מוצרים מובילים - לחץ עלי</span>
                </div> */}
                {/* Featured Products Section */}
                <section className="featured-section">
                    <h2 onClick={() => dispatch(getProductsThunk())} className="section-title featured-products-arrow"> <ArrowForwardIcon className="arrow-icon" />
                        <span className="arrow-text">מוצרים מובילים - לחץ עלי</span> </h2>
                    <div className="products-grid">
                        {products.slice(0, 8).map(product => (
                            <div className="product-card" key={product.id} onClick={() => navigate(`product/productsMain/${product.id}`)}>
                                <img
                                    src={`/pic/Products/${product.name}.png`}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <div className="product-content">
                                    <h3 className="product-title">{product.name}</h3>
                                    <p className="product-price">{product.details} </p>
                                    {/* <a href="#" className="product-button">פרטים נוספים</a> */}
                                    <p className="product-price">{product.id} </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>



                <section className="about-section">
                    <div className="about-content">
                        <h2 className="about-title">אודותינו</h2>
                        <p className="about-text">
                            אנו מתמחים בהשכרת ציוד במה מקצועי לאירועים מכל הסוגים. עם ניסיון של שנים בתחום, אנו מספקים את הציוד האיכותי ביותר בשוק, עם שירות מקצועי ואמין.
                        </p>
                        <p className="about-text">
                            הצוות המקצועי שלנו זמין לענות על כל שאלה ולסייע בבחירת הציוד המתאים ביותר לצרכים שלכם. אנו מתחייבים לספק את הציוד בזמן ובמצב מושלם.
                        </p>

                        <h3 className="system-title">איך המערכת שלנו עובדת</h3>
                        <div className="system-steps">
                            <div className="step">
                                <div className="step-number">1</div>
                                <div className="step-content">
                                    <h4>בחירת מוצרים</h4>
                                    <p>בחרו את הציוד הדרוש לכם מתוך מגוון המוצרים שלנו. לכל מוצר יש מופעים בסניפים שונים עם מחירים שונים בהתאם לכמות ההשכרות הקודמות.</p>
                                </div>
                            </div>

                            <div className="step">
                                <div className="step-number">2</div>
                                <div className="step-content">
                                    <h4>בחירת מופע ייחודי</h4>
                                    <p>לאחר בחירת המוצר, תוכלו לבחור את המופע הייחודי המתאים לכם מבין האפשרויות הזמינות בסניפים השונים ולהוסיף אותו לסל הקניות.</p>
                                </div>
                            </div>

                            <div className="step">
                                <div className="step-number">3</div>
                                <div className="step-content">
                                    <h4>שמירה במועדפים</h4>
                                    <p>אם מצאתם מוצרים שאתם מתעניינים בהם אך לא בטוחים לגביהם, תוכלו להוסיף אותם למועדפים. המועדפים יישמרו גם לאחר התנתקות, בניגוד לסל הקניות שמתרוקן.</p>
                                </div>
                            </div>

                            <div className="step">
                                <div className="step-number">4</div>
                                <div className="step-content">
                                    <h4>התראות זמינות</h4>
                                    <p>לאחר הרשמה או התחברות, תקבלו התראה אוטומטית על מוצרים במועדפים שלכם שזמינים כעת להשכרה, כך שלא תפספסו הזדמנויות.</p>
                                </div>
                            </div>
                        </div>

                        {!currentUser && <Link to="login" className="hero-button" >
                            להתחברות
                        </Link>}
                    </div>
                </section>

                <section className="cta-section">
                    <div className="cta-content">
                        <h2 className="cta-title">מוכנים להפוך את האירוע שלכם למושלם?</h2>
                        <p className="cta-text">צרו קשר עוד היום לקבלת הצעת מחיר מותאמת אישית לצרכים שלכם</p>
                        <div className="cta-buttons">
                            <Link to="products" className="cta-button primary" onClick={() => dispatch(getProductsThunk())}>
                                <LocalMallIcon style={{ marginLeft: '8px' }} />

                                צפה במוצרים
                            </Link>
                            <button onClick={openChat} className="cta-button primary">
                                <ChatIcon style={{ marginLeft: '8px' }} />
                                פתח צ'אט לתגובה
                            </button>
                        </div>
                    </div>
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

        {/* Back to Top Button */}
        {showBackToTop && (
            <button
                className="back-to-top-button"
                onClick={scrollToTop}
                aria-label="חזרה לראש הדף"
            >
                <KeyboardArrowUpIcon />
            </button>
        )}

        {/* Chat Dialog */}
        {showChat && (
            <div className="chat-dialog">
                <div className="chat-header">
                    <h3>צ'אט תמיכה</h3>
                    <button className="chat-close" onClick={closeChat}>×</button>
                </div>
                <div className="chat-messages">
                    {chatMessages.length === 0 ? (
                        <div className="chat-welcome">
                            <p>שלום! כיצד נוכל לעזור לך?</p>
                        </div>
                    ) : (
                        chatMessages.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.sender}`}>
                                <p>{msg.text}</p>
                            </div>
                        ))
                    )}
                </div>
                <form className="chat-input-form" onSubmit={sendChatMessage}>
                    <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="הקלד הודעה..."
                        className="chat-input"
                    />
                    <button type="submit" className="chat-send">שלח</button>
                </form>
            </div>
        )}
    </div>
}
