import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getProductsThunk } from '../../../redux/slices/products/GetAllProductsThunk';
import { GetProductsByIdThunk } from '../../../redux/slices/products/GetProductsByIdThunk';
import { GetAllOrdersByIdCostumerThunk } from '../../../redux/slices/order/GetAllOrdersByIdCostumerThunk';
import { AddOrderThunk } from '../../../redux/slices/order/AddOrderThunk';
import { AddFavorateThunk } from '../../../redux/slices/costumers/AddFavorateThunk';
import { DeleteFavorateThunk } from '../../../redux/slices/costumers/DeleteFavorateThunk';
import { addCurrentCustCart, deleteAllCurrentCustCart, deleteCurrentCustCart } from '../../../redux/slices/costumers/CostumerSlice';
import { GetCostumerByIdThunk } from '../../../redux/slices/costumers/GetCostumerByIdThunk';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PaymentIcon from '@mui/icons-material/Payment';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import CodeIcon from '@mui/icons-material/Code';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const Cart = () => {
    const currentCust = useSelector(state => state.costumers.currentCust);
    const [prod, setProd] = useState(null);
    const refDialog = useRef();
    const cart = useSelector(state => state.costumers.currentCustCart);
    const [pay, setPay] = useState(false);
    const [paying, setPaying] = useState(false);
    const [finish, setFinish] = useState(false);
    const favorate = useSelector(state => state.costumers.currentCustFaverate);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const customer = useSelector(state => state.costumers.currentCust);
    const snifOrder = [];
    const [order, setOrder] = useState([]);

    const exsistsSnif = (idSnif) => {
        for (let index = 0; index < snifOrder.length; index++) {
            if (snifOrder[index] === idSnif)
                return true
        }
        return false
    }
    const doOrder = () => {

        for (let index = 0; index < cart.length; index++) {
            if (!exsistsSnif(cart[index].idSnif)) {
                const snif = cart[index].idSnif;
                snifOrder.push(snif)
                const arr = cart.filter(c => c.idSnif == snif).map(cc => { return { idOrder: 0, idProductSpecific: cc.id, nothing: '' } });
                order.push({ idOrder: 0, idSnif: snif, idCostumer: customer.id, orderDetails: arr })


                // 
                // while(orderLoading);
            }
        }
        
       
        dispatch(AddOrderThunk(order));
        setPaying(true);
        setTimeout(() => {
            setPaying(false);
            setFinish(true);
            dispatch(deleteAllCurrentCustCart());
            setTimeout(() => {
                setFinish(false);
            }, 5000);
        }, 2000);
    }

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setIsLoading(false);
        }, 800);
    }, []);

   
    const removeFromCart = (prod) => {
        dispatch(deleteCurrentCustCart(prod));
    };

    const toggleFavorite = (prod) => {
        var f = 0;
        favorate.map(x => {
            if (x.id === prod.id) { f = 1; }
        });
        
        if (f === 0) {
            dispatch(AddFavorateThunk({ customerid: currentCust.id, prodid: prod.id }));
        } else {
            dispatch(DeleteFavorateThunk({ customerid: currentCust.id, prodid: prod.id }));
        }
    };

    const isFavorite = (prod) => {
        return favorate.some(x => x.id === prod.id);
    };

    useEffect(() => {
        dispatch(GetCostumerByIdThunk(currentCust.id));
        
        if (prod !== null) {
            refDialog.current.showModal();
        }
    }, [prod]);

    // Calculate total price
    const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price), 0);

    return (
        <div className="cart-page">
            <div className="page-header">
                <h1 className="page-title">סל הקניות שלי</h1>
                <p className="page-subtitle">
                    {cart.length > 0 ? `${cart.length} מוצרים בסל` : 'אין לך מוצרים בסל'}
                </p>
            </div>

            {isLoading ? (
                // Skeleton loading state
                <div className="cart-container">
                    <div className="cart-items-container">
                        {Array(3).fill().map((_, index) => (
                            <div className="skeleton-card" key={index}>
                                <div className="skeleton-image" style={{width: '180px', height: '180px'}}></div>
                                <div className="skeleton-details" style={{flex: '1'}}>
                                    <div className="skeleton-text"></div>
                                    <div className="skeleton-text"></div>
                                    <div className="skeleton-text"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary skeleton-summary">
                        <div className="skeleton-text"></div>
                        <div className="skeleton-text"></div>
                        <div className="skeleton-text"></div>
                        <div className="skeleton-button"></div>
                    </div>
                </div>
            ) : cart.length > 0 ? (
                <div className="cart-container">
                    <div className="cart-items-container">
                        {cart.map(p => (
                            <div className="cart-item" key={p.id} onClick={() => setProd(p)}>
                                <div className="cart-item-image-container">
                                    <img 
                                        className="cart-item-image" 
                                        src={`/pic/Products/${p.idProductNavigation.url}.png`} 
                                        alt={p.idProductNavigation.name}
                                        onError={(e) => {
                                            e.target.src = '/product-placeholder.jpg';
                                        }}
                                    />
                                </div>
                                <div className="cart-item-details">
                                    <h3 className="cart-item-title">{p.idProductNavigation.name}</h3>
                                    <div className="cart-item-info">
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
                                    </div>
                                    <div className="cart-item-actions">
                                        <div className="cart-item-price">{p.price} ₪</div>
                                        <div className="cart-item-buttons">
                                            <button 
                                                className={`action-button secondary-action ${isFavorite(p) ? 'active' : ''}`}
                                                onClick={(e) => { 
                                                    e.stopPropagation();
                                                    toggleFavorite(p);
                                                }}
                                            >
                                                {isFavorite(p) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                                {isFavorite(p) ? 'במועדפים' : 'הוסף למועדפים'}
                                            </button>
                                            <button 
                                                className="action-button secondary-action remove-button"
                                                onClick={(e) => { 
                                                    e.stopPropagation();
                                                    removeFromCart(p);
                                                }}
                                            >
                                                <DeleteOutlineIcon /> הסר מהסל
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h3 className="summary-title">סיכום הזמנה</h3>
                        <div className="summary-details">
                            <div className="summary-row">
                                <span>סה"כ מוצרים:</span>
                                <span>{cart.length}</span>
                            </div>
                            <div className="summary-row">
                                <span>סה"כ לתשלום:</span>
                                <span className="summary-total">{totalPrice.toFixed(2)} ₪</span>
                            </div>
                        </div>
                        <button 
                            className="action-button primary-action checkout-button"
                            onClick={() => setPay(true)}
                        >
                            <PaymentIcon /> מעבר לתשלום
                        </button>
                    </div>
                </div>
            ) : (
                // Empty cart state
                <div className="empty-state">
                    <div className="empty-state-icon">
                        <ShoppingCartIcon style={{ fontSize: '4rem', color: '#ddd' }} />
                    </div>
                    <h3 className="empty-state-title">סל הקניות שלך ריק</h3>
                    <p className="empty-state-text">הוסף מוצרים לסל כדי להמשיך בקנייה</p>
                    <Link to="/home/products" className="empty-state-action">המשך לקנות</Link>
                </div>
            )}

            {prod && (
                <dialog className="product-dialog" ref={refDialog}>
                    <button className="dialog-close" onClick={() => setProd(null)}>✕</button>
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
                            </div>
                            
                            <div className="dialog-actions">
                                <button 
                                    className={`action-button secondary-action ${isFavorite(prod) ? 'active' : ''}`}
                                    onClick={() => toggleFavorite(prod)}
                                >
                                    {isFavorite(prod) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                    {isFavorite(prod) ? 'הסר ממועדפים' : 'הוסף למועדפים'}
                                </button>
                                <button 
                                    className="action-button secondary-action remove-button"
                                    onClick={() => {
                                        removeFromCart(prod);
                                        setProd(null);
                                    }}
                                >
                                    <DeleteOutlineIcon /> הסר מהסל
                                </button>
                            </div>
                        </div>
                    </div>
                </dialog>
            )}

            {pay && (
                <dialog className="payment-dialog" open>
                    <button className="dialog-close" onClick={() => setPay(false)}>✕</button>
                    <div className="payment-dialog-content">
                        <h2 className="payment-title">פרטי תשלום</h2>
                        <form className="payment-form">
                            <div className="form-group">
                                <label className="form-label">
                                    <PersonIcon /> שם בעל הכרטיס
                                </label>
                                <input 
                                    className="form-input" 
                                    type="text" 
                                    placeholder="ישראל ישראלי" 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">
                                    <CreditCardIcon /> מספר כרטיס אשראי
                                </label>
                                <input 
                                    className="form-input" 
                                    type="text" 
                                    placeholder="1234 5678 9012 3456" 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">
                                    <CalendarTodayIcon /> תוקף
                                </label>
                                <input 
                                    className="form-input" 
                                    type="date" 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">
                                    <LockIcon /> קוד אבטחה (CVV)
                                </label>
                                <input 
                                    className="form-input" 
                                    type="password" 
                                    placeholder="123" 
                                    maxLength="3" 
                                    required 
                                />
                            </div>
                            <button 
                                className="action-button primary-action payment-button"
                                type="button"
                                onClick={() => { 
                                    setPay(false); 
                                    doOrder(); 
                                }}
                            >
                                <PaymentIcon /> לסיום הזמנה
                            </button>
                        </form>
                    </div>
                </dialog>
            )}

            {paying && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">מעבד את ההזמנה שלך...</p>
                </div>
            )}

            {finish && (
                <div className="success-overlay">
                    <div className="success-content">
                        <CheckCircleOutlineIcon className="success-icon" />
                        <h2 className="success-title">ההזמנה בוצעה בהצלחה!</h2>
                        <p className="success-message">תודה על הקנייה. פרטי ההזמנה נשלחו לדוא"ל שלך.</p>
                        <Link to="/home/products" className="action-button primary-action">המשך לקנות</Link>
                    </div>
                </div>
            )}
        </div>
    );
};
