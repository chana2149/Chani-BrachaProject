import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getProductsThunk } from '../../../redux/slices/products/GetAllProductsThunk';
import { GetProductsByIdThunk } from '../../../redux/slices/products/GetProductsByIdThunk';
import { GetAllOrdersByIdCostumerThunk } from '../../../redux/slices/order/GetAllOrdersByIdCostumerThunk';
import { GetCostumerByIdThunk } from '../../../redux/slices/costumers/GetCostumerByIdThunk';
import { GetCostumersThunk } from '../../../redux/slices/costumers/GetCostumersThunk';
import { addCurrentCustCart, deleteCurrentCustCart } from '../../../redux/slices/costumers/CostumerSlice';
import { DeleteFavorateThunk } from '../../../redux/slices/costumers/DeleteFavorateThunk';
import { AddFavorateThunk } from '../../../redux/slices/costumers/AddFavorateThunk';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CodeIcon from '@mui/icons-material/Code';

export const Favorate = () => {
    const currentCust = useSelector(state => state.costumers.currentCust);
    const [prod, setProd] = useState(null);
    const refDialog = useRef();
    const cart = useSelector(state => state.costumers.currentCustCart);
    const [exsitsInCart, setExsitsInCart] = useState(false);
    const [showDateError, setShowDateError] = useState(false);
    const [showAddSuccess, setShowAddSuccess] = useState(false);
    const dispatch = useDispatch();
    const favorate = useSelector(state => state.costumers.currentCustFaverate);
    const [isLoading, setIsLoading] = useState(true);


    const [haert, setHaert] = useState('🤍');
    useEffect(() => {
        if (currentCust != {}) {
            dispatch(GetCostumerByIdThunk(currentCust.id))
        }
        if (prod !== null) {
            setHaert('🤍')
            refDialog.current.showModal();
            setHaertCheck(prod.id);
        }
    }, [prod]);

    const setHaertCheck = (id) => {
        favorate?.map((f) => {
            if (f.id === id) {
                setHaert('💖')
            }
        })
    }

    const checkFavorate = (prod) => {
        if (haert === '🤍') {
            dispatch(AddFavorateThunk({ customerid: currentCust.id, prodid: prod.id }));
            setHaert('💖');
        }
        else {
            dispatch(DeleteFavorateThunk({ customerid: currentCust.id, prodid: prod.id }));
            setHaert('🤍');
        }
    }
    useEffect(() => {
        dispatch(GetCostumerByIdThunk(currentCust.id));

        // Simulate loading
        setTimeout(() => {
            setIsLoading(false);
        }, 800);
    }, []);

    const addToCart = (prod) => {
        var f = 0;
        cart.map(x => {
            if (x.id === prod.id) { f = 1; }
        });

        if (prod.available.toString() === 'true' && f === 0) {
            dispatch(addCurrentCustCart(prod));
            setShowAddSuccess(true);
            setTimeout(() => {
                setShowAddSuccess(false);
            }, 3000);
        }
        else if (f === 1) {
            setExsitsInCart(true);
            setTimeout(() => {
                setExsitsInCart(false);
            }, 3000);
        }
        else {
            setShowDateError(true);
            setTimeout(() => {
                setShowDateError(false);
            }, 3000);
        }
    };

    const toggleFavorite = (prod) => {
        dispatch(DeleteFavorateThunk({ customerid: currentCust.id, prodid: prod.id }));
    };

    useEffect(() => {
        dispatch(GetCostumerByIdThunk(currentCust.id));

        if (prod !== null) {
            refDialog.current.showModal();
        }
    }, [prod]);

    return <>(
        <div className="favorites-page">
            <div className="page-header">
                <h1 className="page-title">המוצרים המועדפים שלי</h1>
                <p className="page-subtitle">
                    {favorate && favorate.length > 0 ? `${favorate.length} מוצרים במועדפים` : 'אין לך מוצרים מועדפים'}
                </p>
            </div>

            {isLoading ? (
                // Skeleton loading state
                <div className="favorites-container">
                    {Array(3).fill().map((_, index) => (
                        <div className="skeleton-card" key={index}>
                            <div className="skeleton-image" style={{ width: '180px', height: '180px' }}></div>
                            <div className="skeleton-details" style={{ flex: '1' }}>
                                <div className="skeleton-text"></div>
                                <div className="skeleton-text"></div>
                                <div className="skeleton-text"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : favorate && favorate.length > 0 ? (
                <div className="favorites-container">
                    {favorate.map(p => (
                        <div className="favorite-card" key={p.id} onClick={() => setProd(p)}>
                            <div className="favorite-image-container">
                                <img
                                    className="favorite-image"
                                    src={`/pic/Products/${p.idProductNavigation.url}.png`}
                                    alt={p.idProductNavigation.name}
                                    onError={(e) => {
                                        e.target.src = '/product-placeholder.jpg';
                                    }}
                                />


                            </div>
                            <div className="favorite-details">
                                <h3 className="favorite-title">{p.idProductNavigation.name}</h3>
                                <div className="favorite-info">
                                    <div className="info-item">
                                        <CodeIcon />
                                        <span className="info-label">קוד מוצר:</span>
                                        <span>{p.id}</span>
                                    </div>
                                
                                    <div className="info-item">
                                        <LocationOnIcon />
                                        <span>{p.idSnifNavigation.address}</span>
                                    </div>
                                    <div className="info-item">
                                        <PhoneIcon />
                                        <span>{p.idSnifNavigation.telephone}</span>
                                    </div>
                                    <div className="info-item">
                                        {p.available.toString() === 'false' &&<> 
                                               <CalendarTodayIcon /> <span>חוזר בתאריך {new Date(p.dayTaken).toLocaleDateString()}</span> 
                                        </>}
                                    </div>
                                </div>
                                <div className="favorite-actions">
                                    <div className="favorite-price">{p.price} ₪</div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // Empty favorites state
                <div className="empty-state">
                    <div className="empty-state-icon">
                        <FavoriteBorderIcon style={{ fontSize: '4rem', color: '#ddd' }} />
                    </div>
                    <h3 className="empty-state-title">אין לך מוצרים מועדפים</h3>
                    <p className="empty-state-text">הוסף מוצרים למועדפים כדי לשמור אותם לקנייה עתידית</p>
                    <Link to="/home/products" className="empty-state-action">חפש מוצרים</Link>
                </div>
            )}

            {/* Dialog remains the same */}
            {prod && (
                <dialog className="product-dialog" ref={refDialog}>
                    {/* Dialog content remains the same */}
                    {/* ... */}
                </dialog>
            )}
            {prod && (
                <dialog className="product-dialog" ref={refDialog}>
                    <button className="dialog-close" onClick={() => {
                        setProd(null);
                        setShowDateError(false);
                        setShowAddSuccess(false);
                        setExsitsInCart(false);
                    }}>✕</button>
                    <div className="dialog-content">
                        <div className="dialog-image-container">
                            <img
                                className="dialog-image"
                                src={`/pic/Products/${prod.idProductNavigation.url}.png`}
                                alt={prod.idProductNavigation.name}
                                onError={(e) => {
                                    e.target.src = '/product-placeholder.jpg';
                                }}
                            />
                        </div>
                        <div className="dialog-details">
                            <h2 className="dialog-title">{prod.idProductNavigation.name}</h2>
                            <div className="dialog-price">{prod.price} ₪</div>

                            <div className="dialog-info">
                                <div className="dialog-info-item">
                                    <span className="dialog-info-label">קוד מוצר:</span>
                                    <span>{prod.id}</span>
                                </div>
                                <div className="dialog-info-item">
                                    <span className="dialog-info-label">כתובת:</span>
                                    <span>{prod.idSnifNavigation.address}</span>
                                </div>
                                <div className="dialog-info-item">
                                    <span className="dialog-info-label">טלפון:</span>
                                    <span>{prod.idSnifNavigation.telephone}</span>
                                </div>
                                {prod.available.toString() === 'false' && (
                                    <div className="dialog-info-item">
                                        <span className="dialog-info-label">חוזר בתאריך:</span>
                                        <span>{new Date(prod.dayTaken).toLocaleDateString()}</span>
                                    </div>
                                )}

                                <div className="dialog-info-item">
                                    {showAddSuccess && (
                                        <div className="notification success">
                                            <ShoppingCartIcon /> המוצר נוסף לסל בהצלחה!
                                        </div>
                                    )}
                                    {exsitsInCart && (
                                        <div className="notification warning">
                                            <ShoppingCartIcon /> המוצר כבר קיים בסל הקניות שלך
                                        </div>
                                    )}
                                    {showDateError && (
                                        <div className="notification error">
                                            <span className="dialog-info-label">חוזר בתאריך:</span>
                                            <span>{new Date(prod.dayTaken).toLocaleDateString()}</span>  </div>
                                    )}
                                </div>


                            </div>

                            <div className="dialog-actions">
                                <button
                                    className="action-button primary-action"
                                    onClick={() => addToCart(prod)}
                                // disabled={prod.available.toString() === 'false'}
                                >
                                    <ShoppingCartIcon /> הוסף לסל
                                </button>

                                {/* <button
                                    className={`action-button secondary-action ${isInFavorites(prod.id) ? 'active' : ''}`}
                                    onClick={() => toggleFavorite(prod)}
                                > */}
                                <button className="action-button secondary-action" onClick={() => { checkFavorate(prod) }}>{haert}</button>

                                {/* </button> */}
                            </div>


                        </div>
                    </div>
                </dialog>)}
        </div>
        )</>
};
