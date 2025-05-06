import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { getProductsThunk } from '../../../redux/slices/products/GetAllProductsThunk';
import { GetProductsByIdThunk } from '../../../redux/slices/products/GetProductsByIdThunk';
import { GetAllOrdersByIdCostumerThunk } from '../../../redux/slices/order/GetAllOrdersByIdCostumerThunk';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const OrderM = () => {
    const customer = useSelector(state => state.costumers.currentCust);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const orders = useSelector(state => state.order.ordersList);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(GetAllOrdersByIdCostumerThunk(customer.id));

        // Simulate loading
        setTimeout(() => {
            setIsLoading(false);
        }, 800);
    }, []);

    const toggleOrderDetails = (orderId) => {
        if (expandedOrder === orderId) {
            setExpandedOrder(null);
        } else {
            setExpandedOrder(orderId);
        }
    };

    const getOrderStatus = (order) => {
        // Get the order date and current date
        const orderDate = new Date(order.date);
        const currentDate = new Date();
        
        // Calculate days passed since order
        const timeDiff = currentDate.getTime() - orderDate.getTime();
        const daysPassed = Math.floor(timeDiff / (1000 * 3600 * 24));
        
        // Calculate business days (excluding weekends)
        let businessDays = 0;
        const tempDate = new Date(orderDate);
        
        for (let i = 0; i < daysPassed; i++) {
            tempDate.setDate(tempDate.getDate() + 1);
            // 0 is Sunday, 6 is Saturday
            const dayOfWeek = tempDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                businessDays++;
            }
        }
        
        // Determine status based on time passed
        if (daysPassed >= 14) {
            return 'הוחזר'; // Returned after 14 days
        } else if (businessDays >= 5) {
            return 'התקבל'; // Received after 5 business days
        } else if (daysPassed >= 2) {
            return 'נשלח'; // Sent after 2 days
        } else {
            return 'בהכנה'; // In preparation initially
        }
    };
    const getOrderDate = (order) => {
        // This is a placeholder - replace with actual date from order
        return new Date().toLocaleDateString('he-IL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getOrderTotal = (order) => {
        // Calculate total from order details
        return order.orderDetails.reduce((total, item) => total + parseFloat(item.price || 0), 0).toFixed(2);
    };

    return (
        <div className="orders-page">
            <div className="page-header">
                <h1 className="page-title">ההזמנות של {customer.name}</h1>
                <p className="page-subtitle">
                    {orders.length > 0 ? `${orders.length} הזמנות` : 'אין  הזמנות ללקוח זה'}
                </p>
            </div>

            {isLoading ? (
                // Skeleton loading state
                <div className="orders-container">
                    {Array(3).fill().map((_, index) => (
                        <div className="skeleton-card" key={index}>
                            <div className="skeleton-details" style={{ flex: '1', padding: '1.5rem' }}>
                                <div className="skeleton-text"></div>
                                <div className="skeleton-text"></div>
                                <div className="skeleton-text"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : orders.length > 0 ? (
                <div className="orders-container">
                    {orders.map(order => (
                        <div className="order-card" key={order.idOrder}>
                            <div className="order-header" onClick={() => toggleOrderDetails(order.idOrder)}>
                                <div className="order-header-left">
                                    <div className="order-icon">
                                        <ShoppingBagIcon />
                                    </div>
                                    <div className="order-basic-info">
                                        <h3 className="order-title">הזמנה #{order.idOrder}</h3>
                                        <div className="order-date">
                                            <CalendarTodayIcon />
                                            <span>{new Date(order.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="order-header-right">
                                    <div className="order-status">
                                        <span className={`status-badge ${getOrderStatus(order).toLowerCase()}`}>
                                            {getOrderStatus(order)}
                                        </span>
                                    </div>
                                    <div className="order-total">
                                        <span className="total-label">סה"כ:</span>
                                        <span className="total-amount">{order.totalsum} ₪</span>
                                    </div>
                                    <button className="expand-button">
                                        {expandedOrder === order.idOrder ?
                                            <KeyboardArrowUpIcon /> :
                                            <KeyboardArrowDownIcon />
                                        }
                                    </button>
                                </div>
                            </div>

                            {expandedOrder === order.idOrder && (
                                <div className="order-details">
                                    <div className="order-info-section">
                                        <div className="info-item">
                                            <LocationOnIcon />
                                            <span className="info-label">סניף:</span>
                                            <span>{order.idSnif}</span>
                                        </div>
                                        <div className="info-item">
                                            <ReceiptIcon />
                                            <span className="info-label">מספר הזמנה:</span>
                                            <span>{order.idOrder}</span>
                                        </div>
                                        <div className="info-item">
                                        <CalendarTodayIcon />
                                        <span className="info-label">תאריך הזמנה:</span>
                                            <span>{new Date(order.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="info-item">
                                            <LocalShippingIcon />
                                            <span className="info-label">סטטוס משלוח:</span>
                                            <span>{getOrderStatus(order)}</span>
                                        </div>
                                    </div>

                                    <div className="order-products">
                                        <h4 className="products-title">מוצרים בהזמנה</h4>
                                        <div className="products-list">
                                            {order.orderDetails.map(item => (
                                                <div className="order-product-item" key={item.idProductSpecific}>
                                                    <div className="product-image-container">
                                                        <img
                                                            className="product-image"
                                                            src={`/pic/Products/${item.idProductSpecificNavigation.idProductNavigation.url}.png`}
                                                            alt={item.idProductSpecificNavigation.idProductNavigation.name}
                                                            onError={(e) => {
                                                                e.target.src = '/product-placeholder.jpg';
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="product-details">
                                                        <div className="product-price">מוצר #{item.idProductSpecific}</div>
                                                        <div className="product-name">שם: {item.idProductSpecificNavigation.idProductNavigation.name}</div>
                                                        <div className="product-name"> {item.idProductSpecificNavigation.idProductNavigation.details}</div>

                                                        <div className="product-price">{item.idProductSpecificNavigation.price || '0.00'} ₪</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="order-actions">
                                       
                                       <button onClick={() => {navigate('/home/products');dispatch(getProductsThunk());}} className="action-button primary-action">
                                           <ShoppingBagIcon />  קניה נוספת
                                       </button>
                                   </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                // Empty orders state
                <div className="empty-state">
                    <div className="empty-state-icon">
                        <ShoppingBagIcon style={{ fontSize: '4rem', color: '#ddd' }} />
                    </div>
                    <h3 className="empty-state-title">אין הזמנות ללקוח זה</h3>
                </div>
            )}
        </div>
    );
};
