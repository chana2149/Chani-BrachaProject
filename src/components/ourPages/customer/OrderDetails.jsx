import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { GetAllOrdersByIdCostumerThunk, GetOrderByIdThunk } from '../../../redux/slices/order/GetAllOrdersByIdCostumerThunk';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

export const OrderDetails = () => {
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const order = useSelector(state => state.order.currentOrder);
    const customer = useSelector(state => state.costumers.currentCust);
    
    useEffect(() => {
        if (orderId) {
            dispatch(GetAllOrdersByIdCostumerThunk(orderId));
            
            // Simulate loading
            setTimeout(() => {
                setIsLoading(false);
            }, 800);
        }
    }, [orderId, dispatch]);
    
    const getOrderDate = () => {
        // This is a placeholder - replace with actual date from order
        return new Date().toLocaleDateString('he-IL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    
    const getOrderStatus = () => {
        // This is a placeholder - replace with actual status logic
        const statuses = ['בהכנה', 'נשלח', 'התקבל', 'הושלם'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        return randomStatus;
    };
    
    const getOrderTotal = () => {
        if (!order || !order.orderDetails) return '0.00';
        return order.orderDetails.reduce((total, item) => total + parseFloat(item.price || 0), 0).toFixed(2);
    };
    
    if (isLoading) {
        return (
            <div className="order-details-page">
                <div className="page-header skeleton">
                    <div className="skeleton-text" style={{width: '60%'}}></div>
                    <div className="skeleton-text" style={{width: '40%'}}></div>
                </div>
                <div className="order-details-container skeleton">
                    <div className="skeleton-section"></div>
                    <div className="skeleton-section"></div>
                    <div className="skeleton-section"></div>
                </div>
            </div>
        );
    }
    
    if (!order) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">
                    <ReceiptIcon style={{ fontSize: '4rem', color: '#ddd' }} />
                </div>
                <h3 className="empty-state-title">הזמנה לא נמצאה</h3>
                <p className="empty-state-text">לא הצלחנו למצוא את ההזמנה המבוקשת</p>
                <Link to="/home/showOrders" className="empty-state-action">חזרה להזמנות</Link>
            </div>
        );
    }
    
    return (
        <div className="order-details-page">
            <div className="page-header">
                <button className="back-button" onClick={() => navigate('/home/showOrders')}>
                    <ArrowBackIcon /> חזרה להזמנות
                </button>
                <h1 className="page-title">פרטי הזמנה #{orderId}</h1>
                <div className="order-status-header">
                    <span className={`status-badge ${getOrderStatus().toLowerCase()}`}>
                        {getOrderStatus()}
                    </span>
                </div>
            </div>
            
            <div className="order-details-container">
                <div className="order-summary-section">
                    <div className="section-header">
                        <h2 className="section-title">סיכום הזמנה</h2>
                    </div>
                    <div className="summary-grid">
                        <div className="summary-item">
                            <div className="summary-icon">
                                <ReceiptIcon />
                            </div>
                            <div className="summary-content">
                                <div className="summary-label">מספר הזמנה</div>
                                <div className="summary-value">{orderId}</div>
                            </div>
                        </div>
                        <div className="summary-item">
                            <div className="summary-icon">
                                <CalendarTodayIcon />
                            </div>
                            <div className="summary-content">
                                <div className="summary-label">תאריך הזמנה</div>
                                <div className="summary-value">{getOrderDate()}</div>
                            </div>
                        </div>
                        <div className="summary-item">
                            <div className="summary-icon">
                                <LocalShippingIcon />
                            </div>
                            <div className="summary-content">
                                <div className="summary-label">סטטוס</div>
                                <div className="summary-value">{getOrderStatus()}</div>
                            </div>
                        </div>
                        <div className="summary-item">
                            <div className="summary-icon">
                                <LocationOnIcon />
                            </div>
                            <div className="summary-content">
                                <div className="summary-label">סניף</div>
                                <div className="summary-value">{order.idSnif || 'לא צוין'}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="customer-info-section">
                    <div className="section-header">
                        <h2 className="section-title">פרטי לקוח</h2>
                    </div>
                    <div className="customer-info-grid">
                        <div className="info-item">
                            <PersonIcon />
                            <span className="info-label">שם:</span>
                            <span>{customer.firstName} {customer.lastName}</span>
                        </div>
                        <div className="info-item">
                            <PhoneIcon />
                            <span className="info-label">טלפון:</span>
                            <span>{customer.phone || 'לא צוין'}</span>
                        </div>
                        <div className="info-item">
                            <EmailIcon />
                            <span className="info-label">אימייל:</span>
                            <span>{customer.email || 'לא צוין'}</span>
                        </div>
                        <div className="info-item">
                            <HomeIcon />
                            <span className="info-label">כתובת:</span>
                            <span>{customer.address || 'לא צוינה'}</span>
                        </div>
                    </div>
                </div>
                
                <div className="order-items-section">
                    <div className="section-header">
                        <h2 className="section-title">פריטים בהזמנה</h2>
                    </div>
                    
                    <div className="order-items-list">
                        {order.orderDetails && order.orderDetails.map(item => (
                            <div className="order-item" key={item.idProductSpecific}>
                                <div className="item-image-container">
                                    <img 
                                        className="item-image" 
                                        src={`/product-placeholder.jpg`} 
                                        alt={`מוצר ${item.idProductSpecific}`}
                                        onError={(e) => {
                                            e.target.src = '/product-placeholder.jpg';
                                        }}
                                    />
                                </div>
                                <div className="item-details">
                                    <div className="item-name">מוצר #{item.idProductSpecific}</div>
                                    <div className="item-meta">
                                        <span className="item-id">קוד: {item.idProductSpecific}</span>
                                    </div>
                                </div>
                                <div className="item-price">{item.price || '0.00'} ₪</div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="order-total-section">
                        <div className="total-row">
                            <span className="total-label">סה"כ לתשלום:</span>
                            <span className="total-value">{getOrderTotal()} ₪</span>
                        </div>
                    </div>
                </div>
                
                <div className="order-actions-section">
                    <button className="action-button secondary-action">
                        <ReceiptIcon /> הדפס חשבונית
                    </button>
                    <button className="action-button primary-action">
                        <ShoppingBagIcon /> הזמן שוב
                    </button>
                </div>
            </div>
        </div>
    );
};
