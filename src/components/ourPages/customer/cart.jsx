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
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';

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
    const [haert, setHaert] = useState('🤍');

    // State for form data
    const [formData, setFormData] = useState({
        cardholderName: '',
        address: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: ''
    });

    // State for form errors
    const [formErrors, setFormErrors] = useState({
        cardholderName: '',
        address: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: ''
    });

    // State for form progress
    const [formProgress, setFormProgress] = useState(0);
    const [formTouched, setFormTouched] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cvvInfoVisible, setCvvInfoVisible] = useState(false);
    const [showOrderSuccess, setShowOrderSuccess] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');

    // Handle input change
    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });

        // Clear error when user types
        if (formErrors[field]) {
            setFormErrors({
                ...formErrors,
                [field]: ''
            });
        }

        // Calculate form progress
        calculateFormProgress();

        // Mark form as touched
        setFormTouched(true);
    };

    // Calculate form progress
    const calculateFormProgress = () => {
        const fields = ['cardholderName', 'address', 'cardNumber', 'expiryMonth', 'expiryYear', 'cvv'];
        const filledFields = fields.filter(field => formData[field] && !formErrors[field]);
        const progress = Math.round((filledFields.length / fields.length) * 100);
        setFormProgress(progress);
    };

    // Validate a specific field
    const validateField = (field) => {
        let error = '';

        switch (field) {
            case 'cardholderName':
                if (!formData.cardholderName) {
                    error = 'שם בעל הכרטיס הוא שדה חובה';
                } else if (formData.cardholderName.length < 2) {
                    error = 'שם בעל הכרטיס חייב להכיל לפחות 2 תווים';
                }
                break;

            case 'address':
                if (!formData.address) {
                    error = 'כתובת למשלוח היא שדה חובה';
                } else if (formData.address.length < 10) {
                    error = 'יש להזין כתובת מלאה';
                }
                break;

            case 'cardNumber':
                if (!formData.cardNumber) {
                    error = 'מספר כרטיס אשראי הוא שדה חובה';
                } else if (formData.cardNumber.length < 13) {
                    error = 'מספר כרטיס אשראי קצר מדי';
                } else if (formData.cardNumber.length > 16) {
                    error = 'מספר כרטיס אשראי ארוך מדי';
                }
                break;

            case 'expiryMonth':
                if (!formData.expiryMonth) {
                    error = 'חודש תוקף הוא שדה חובה';
                }
                break;

            case 'expiryYear':
                if (!formData.expiryYear) {
                    error = 'שנת תוקף היא שדה חובה';
                } else {
                    // Check if card is expired
                    const currentDate = new Date();
                    const currentYear = currentDate.getFullYear();
                    const currentMonth = currentDate.getMonth() + 1;

                    if (parseInt(formData.expiryYear) < currentYear ||
                        (parseInt(formData.expiryYear) === currentYear &&
                            parseInt(formData.expiryMonth) < currentMonth)) {
                        error = 'כרטיס האשראי פג תוקף';
                    }
                }
                break;

            case 'cvv':

                if (!formData.cvv) {
                    error = 'קוד אבטחה הוא שדה חובה';
                } else if (formData.cvv.length < 3) {
                    error = 'קוד אבטחה חייב להכיל לפחות 3 ספרות';
                }
                break;

            default:
                break;
        }

        setFormErrors({
            ...formErrors,
            [field]: error
        });

        // Recalculate progress after validation
        calculateFormProgress();

        return !error;
    };

    // Validate all fields
    const validateAllFields = () => {
        const fields = ['cardholderName', 'address', 'cardNumber', 'expiryMonth', 'expiryYear', 'cvv'];
        const errors = {};

        fields.forEach(field => {
            let error = '';

            switch (field) {
                case 'cardholderName':
                    if (!formData.cardholderName) {
                        error = 'שם בעל הכרטיס הוא שדה חובה';
                    } else if (formData.cardholderName.length < 2) {
                        error = 'שם בעל הכרטיס חייב להכיל לפחות 2 תווים';
                    }
                    break;

                case 'address':
                    if (!formData.address) {
                        error = 'כתובת למשלוח היא שדה חובה';
                    } else if (formData.address.length < 10) {
                        error = 'יש להזין כתובת מלאה';
                    }
                    break;

                case 'cardNumber':
                    if (!formData.cardNumber) {
                        error = 'מספר כרטיס אשראי הוא שדה חובה';
                    } else if (formData.cardNumber.length < 13) {
                        error = 'מספר כרטיס אשראי קצר מדי';
                    } else if (formData.cardNumber.length > 16) {
                        error = 'מספר כרטיס אשראי ארוך מדי';
                    }
                    break;

                case 'expiryMonth':
                    if (!formData.expiryMonth) {
                        error = 'חודש תוקף הוא שדה חובה';
                    }
                    break;

                case 'expiryYear':
                    if (!formData.expiryYear) {
                        error = 'שנת תוקף היא שדה חובה';
                    } else {
                        // Check if card is expired
                        const currentDate = new Date();
                        const currentYear = currentDate.getFullYear();
                        const currentMonth = currentDate.getMonth() + 1;

                        if (parseInt(formData.expiryYear) < currentYear ||
                            (parseInt(formData.expiryYear) === currentYear &&
                                parseInt(formData.expiryMonth) < currentMonth)) {
                            error = 'כרטיס האשראי פג תוקף';
                        }
                    }
                    break;

                case 'cvv':
                    if (!formData.cvv) {
                        error = 'קוד אבטחה הוא שדה חובה';
                    } else if (formData.cvv.length < 3) {
                        error = 'קוד אבטחה חייב להכיל לפחות 3 ספרות';
                    }
                    break;

                default:
                    break;
            }

            if (error) {
                errors[field] = error;
            }
        });

        setFormErrors(errors);
        setFormTouched(true);

        // Recalculate progress
        calculateFormProgress();

        return Object.keys(errors).length === 0;
    };

    // Check if form is valid
    const isFormValid = () => {
        return (
            formData.cardholderName &&
            formData.address &&
            formData.cardNumber &&
            formData.expiryMonth &&
            formData.expiryYear &&
            formData.cvv &&
            !formErrors.cardholderName &&
            !formErrors.address &&
            !formErrors.cardNumber &&
            !formErrors.expiryMonth &&
            !formErrors.expiryYear &&
            !formErrors.cvv
        );
    };

    // Get card type icon based on card number
    const getCardTypeIcon = (cardNumber) => {
        if (!cardNumber) return null;

        // Visa starts with 4
        if (/^4/.test(cardNumber)) {
            return <img src="/visa-icon.png" alt="Visa" className="card-type-icon" />;
        }

        // Mastercard starts with 51-55 or 2221-2720
        if (/^5[1-5]/.test(cardNumber) || /^2[2-7]/.test(cardNumber)) {
            return <img src="/mastercard-icon.png" alt="Mastercard" className="card-type-icon" />;
        }

        // American Express starts with 34 or 37
        if (/^3[47]/.test(cardNumber)) {
            return <img src="/amex-icon.png" alt="American Express" className="card-type-icon" />;
        }

        // Discover starts with 6011, 622126-622925, 644-649, 65
        if (/^6(011|5|4[4-9])/.test(cardNumber)) {
            return <img src="/discover-icon.png" alt="Discover" className="card-type-icon" />;
        }

        return null;
    };

    // Ge



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
    const exsistsSnif = (idSnif) => {
        for (let index = 0; index < snifOrder.length; index++) {
            if (snifOrder[index] === idSnif)
                return true
        }
        return false
    }
    const doOrder = () => {
        const randomOrderNumber = Math.floor(100000 + Math.random() * 900000);
        setOrderNumber(randomOrderNumber.toString());
        for (let index = 0; index < cart.length; index++) {
            if (!exsistsSnif(cart[index].idSnif)) {
                const snif = cart[index].idSnif;
                snifOrder.push(snif)
                const arr = cart.filter(c => c.idSnif == snif).map(cc => { return { idOrder: 0, idProductSpecific: cc.id, nothing: '', IdProductSpecificNavigation: { price: cc.price, idProductNavigation: { name: "" } } } });
                order.push({ idOrder: 0, idSnif: snif, idCostumer: customer.id, orderDetails: arr, totalsum: 0, date: null })


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
                                <div className="skeleton-image" style={{ width: '180px', height: '180px' }}></div>
                                <div className="skeleton-details" style={{ flex: '1' }}>
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
                                            {/* <button
                                                className={`action-button secondary-action ${isFavorite(p) ? 'active' : ''}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleFavorite(p);
                                                }}
                                            > */}
                                            {/* <button onClick={() => { checkFavorate(prod) }}>{haert}</button> */}

                                            {/* {isFavorite(p) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                                {isFavorite(p) ? 'במועדפים' : 'הוסף למועדפים'} */}
                                            {/* </button> */}
                                            <button
                                                className="action-button primary-action checkout-button"
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
                                <button className="action-button secondary-action" onClick={() => { checkFavorate(prod) }}>{haert}</button>

                                {/* <button
                                    className={`action-button secondary-action ${isFavorite(prod) ? 'active' : ''}`}
                                    onClick={() => toggleFavorite(prod)}
                                > */}

                                {/* {isFavorite(prod) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                    {isFavorite(prod) ? 'הסר ממועדפים' : 'הוסף למועדפים'} */}
                                {/* </button> */}
                                <button
                                    className="action-button primary-action checkout-button"
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

            {/* {pay && (
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
             */}
            {pay && (
                <dialog className="payment-dialog" open>
                    <button className="dialog-close" onClick={() => setPay(false)}>✕</button>
                    <div className="payment-dialog-content">
                        <h2 className="payment-title">פרטי תשלום</h2>

                        {/* סרגל התקדמות */}
                        <div className="payment-progress">
                            <div className="progress-bar" style={{ width: `${formProgress}%` }}></div>
                            <div className="progress-text">{formProgress}% הושלם</div>
                        </div>

                        <form className="payment-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-layout">
                                <div className="form-group">
                                    <label className="form-label">
                                        <PersonIcon className={formData.cardholderName ? "icon-filled" : ""} />
                                        שם בעל הכרטיס
                                    </label>
                                    <input
                                        className={`form-input ${formErrors.cardholderName ? 'error' : formData.cardholderName ? 'success' : ''}`}
                                        type="text"
                                        placeholder="ישראל ישראלי"
                                        value={formData.cardholderName}
                                        onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                                        onBlur={() => validateField('cardholderName')}
                                        required
                                    />
                                    {formErrors.cardholderName && (
                                        <div className="error-message">
                                            <ErrorIcon /> {formErrors.cardholderName}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <HomeIcon className={formData.address ? "icon-filled" : ""} />
                                        כתובת למשלוח
                                    </label>
                                    <input
                                        className={`form-input ${formErrors.address ? 'error' : formData.address ? 'success' : ''}`}
                                        type="text"
                                        placeholder="רחוב, מספר בית, עיר, מיקוד"
                                        value={formData.address}
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                        onBlur={() => validateField('address')}
                                        required
                                    />
                                    {formErrors.address && (
                                        <div className="error-message">
                                            <ErrorIcon /> {formErrors.address}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group card-number-group">
                                    <label className="form-label">
                                        <CreditCardIcon className={formData.cardNumber ? "icon-filled" : ""} />
                                        מספר כרטיס אשראי
                                    </label>
                                    <div className="card-input-wrapper">
                                        <input
                                            className={`form-input ${formErrors.cardNumber ? 'error' : formData.cardNumber ? 'success' : ''}`}
                                            type="text"
                                            placeholder="1234567890123456"
                                            value={formData.cardNumber}
                                            onChange={(e) => {
                                                // רק מספרים
                                                const value = e.target.value.replace(/\D/g, '');
                                                handleInputChange('cardNumber', value);
                                            }}
                                            onBlur={() => validateField('cardNumber')}
                                            maxLength="16"
                                            required
                                        />
                                        {getCardTypeIcon(formData.cardNumber)}
                                    </div>
                                    {formErrors.cardNumber && (
                                        <div className="error-message">
                                            <ErrorIcon /> {formErrors.cardNumber}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <CalendarTodayIcon className={formData.expiryMonth && formData.expiryYear ? "icon-filled" : ""} />
                                        תוקף
                                    </label>
                                    <div className="expiry-inputs">
                                        <select
                                            className={`form-input ${formErrors.expiryMonth ? 'error' : formData.expiryMonth ? 'success' : ''}`}
                                            value={formData.expiryMonth}
                                            onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                                            onBlur={() => validateField('expiryMonth')}
                                            required
                                        >
                                            <option value="">חודש</option>
                                            {Array.from({ length: 12 }, (_, i) => {
                                                const month = i + 1;
                                                return (
                                                    <option key={month} value={month}>
                                                        {month < 10 ? `0${month}` : month}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        <span className="expiry-separator">/</span>
                                        <select
                                            className={`form-input ${formErrors.expiryYear ? 'error' : formData.expiryYear ? 'success' : ''}`}
                                            value={formData.expiryYear}
                                            onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                                            onBlur={() => validateField('expiryYear')}
                                            required
                                        >
                                            <option value="">שנה</option>
                                            {Array.from({ length: 10 }, (_, i) => {
                                                const year = new Date().getFullYear() + i;
                                                return (
                                                    <option key={year} value={year}>
                                                        {year}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    {(formErrors.expiryMonth || formErrors.expiryYear) && (
                                        <div className="error-message">
                                            <ErrorIcon /> {formErrors.expiryMonth || formErrors.expiryYear}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <LockIcon className={formData.cvv ? "icon-filled" : ""} />
                                        קוד אבטחה (CVV)
                                    </label>
                                    <div className="cvv-input-wrapper">
                                        <input
                                            className={`form-input ${formErrors.cvv ? 'error' : formData.cvv ? 'success' : ''}`}
                                            type="password"
                                            placeholder="123"
                                            value={formData.cvv}
                                            onChange={(e) => {
                                                // רק מספרים
                                                const value = e.target.value.replace(/\D/g, '');
                                                handleInputChange('cvv', value);
                                            }}
                                            onBlur={() => validateField('cvv')}
                                            maxLength="4"
                                            required
                                        />
                                        <div className="cvv-info" onMouseEnter={() => setCvvInfoVisible(true)} onMouseLeave={() => setCvvInfoVisible(false)}>
                                            <InfoIcon />
                                            {cvvInfoVisible && (
                                                <div className="cvv-tooltip">
                                                    <img src="/cvv-help.png" alt="CVV location" className="cvv-image" />
                                                    <p>קוד אבטחה (CVV) הוא קוד בן 3 או 4 ספרות המופיע בגב כרטיס האשראי</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {formErrors.cvv && (
                                        <div className="error-message">
                                            <ErrorIcon /> {formErrors.cvv}
                                        </div>
                                    )}
                                </div>

                                {!isFormValid() && formTouched && (
                                    <div className="form-error-summary">
                                        <WarningIcon /> יש למלא את כל השדות הנדרשים בצורה תקינה
                                    </div>
                                )}

                                <div className="form-actions">
                                    <button
                                        className={`action-button primary-action payment-button ${isFormValid() ? '' : 'disabled'}`}
                                        type="button"
                                        onClick={() => setPay(false)}
                                    >
                                        <CancelIcon /> ביטול
                                    </button>

                                    <button
                                        className={`action-button primary-action payment-button ${isFormValid() ? '' : 'disabled'}`}
                                        type="button"
                                        disabled={!isFormValid()}
                                        onClick={() => {
                                            if (isFormValid()) {
                                                setIsSubmitting(true);

                                                // סימולציה של תהליך תשלום
                                                setTimeout(() => {
                                                    setIsSubmitting(false);
                                                    setPay(false);
                                                    setShowOrderSuccess(true);
                                                    doOrder();
                                                }, 1500);
                                            } else {
                                                validateAllFields();
                                            }
                                        }}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <CircularProgress size={20} color="inherit" /> מבצע תשלום...
                                            </>
                                        ) : (
                                            <>
                                                <PaymentIcon /> לסיום הזמנה
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="secure-payment-info">
                                <LockIcon /> התשלום מאובטח ע"י SSL
                            </div>
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
