import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getProductsThunk } from '../../../redux/slices/products/GetAllProductsThunk';
import { GetProductsByIdThunk } from '../../../redux/slices/products/GetProductsByIdThunk';
import { useNavigate } from 'react-router-dom';
import { setcustCameFrom } from '../../../redux/slices/costumers/CostumerSlice';
import ChatIcon from '@mui/icons-material/Chat';

export const Products = () => {
    const currentCust = useSelector(state => state.costumers.currentCust);
    const [prod, setProd] = useState(null);
    const custCameFrom = useSelector(state => state.costumers.custCameFrom);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        category: '',
        search: '',
        priceRange: [0, 10000],
        availability: 'all'
    });
    const [isLoading, setIsLoading] = useState(true);
    const refDialog = useRef();
    const products = useSelector(state => state.products.productsList);
    const categories = useSelector(state => state.cattegory.cattagoryList);
    const navigate = useNavigate();
    
    // צ'אט סטייט
    const [showChat, setShowChat] = useState(false);
    const [chatMessage, setChatMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [hasNotification, setHasNotification] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const checkSignedIn = (p) => {
        if (currentCust && Object.keys(currentCust).length > 0) {
            dispatch(GetProductsByIdThunk(prod.id));
            navigate(`productsMain/${p.id}`);
        } else {
            dispatch(setcustCameFrom(`/home/products/productsMain/${p.id}`));
            navigate(`/home/login`);
        }
    };

    useEffect(() => {
        if (prod !== null) {
            refDialog.current.showModal();
        }
    }, [prod]);

    useEffect(() => {
        // dispatch(getProductsThunk());
        // Simulate loading
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        
        // הגדרת התראה לצ'אט אחרי טעינת הדף
        setTimeout(() => {
            setHasNotification(true);
        }, 3000);
    }, []);

    const handleFilterChange = (name, value) => {
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const resetFilters = () => {
        setFilters({
            category: '',
            search: '',
            priceRange: [0, 10000],
            availability: 'all'
        });
    };

    // Filter products based on filters
    const filteredProducts = products.filter(product => {
        // Filter by search term
        if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
            !product.details.toLowerCase().includes(filters.search.toLowerCase())) {
            return false;
        }
        
        // Filter by category
        if (filters.category && product.idCattegory !== filters.category) {
            return false;
        }
        
        return true;
    });
    
    // פונקציות צ'אט
    const openChat = () => {
        setShowChat(true);
        setHasNotification(false);
        
        // הודעת פתיחה בצ'אט
        setChatMessages([
            { 
                text: `שלום ${currentCust?.name || 'משתמש יקר'}! במה אוכל לעזור לך היום?`, 
                sender: 'system' 
            },
            {
                text: 'אני יכול לעזור לך למצוא את המוצר המתאים לצרכים שלך. מה אתה מחפש?',
                sender: 'system',
                options: ['ציוד תאורה', 'ציוד סאונד', 'ציוד במה', 'אחר']
            }
        ]);
    };
    
    const closeChat = () => {
        setShowChat(false);
    };
    
    const sendChatMessage = (e) => {
        e.preventDefault();
        if (chatMessage.trim() !== '') {
            setChatMessages([...chatMessages, { text: chatMessage, sender: 'user' }]);
            const userMessage = chatMessage.trim();
            setChatMessage('');
            
            // חיפוש מוצרים שמתאימים להודעה
            const matchingProducts = products.filter(product => 
                product.name.includes(userMessage) || 
                product.details.includes(userMessage)
            ).slice(0, 4);
            
            setTimeout(() => {
                if (matchingProducts.length > 0) {
                    setChatMessages(prev => [...prev, { 
                        text: `מצאתי ${matchingProducts.length} מוצרים שעשויים להתאים למה שאתה מחפש:`, 
                        sender: 'system' 
                    }]);
                    
                    setTimeout(() => {
                        setChatMessages(prev => [...prev, { 
                            text: 'הנה המוצרים שמצאתי:',
                            sender: 'system',
                            products: matchingProducts
                        }]);
                    }, 1000);
                } else {
                    setChatMessages(prev => [...prev, { 
                        text: 'לא מצאתי מוצרים שמתאימים לחיפוש שלך. האם תוכל לתאר בצורה אחרת מה אתה מחפש?', 
                        sender: 'system' 
                    }]);
                }
            }, 1000);
        }
    };
    
    const handleChatOption = (option) => {
        setChatMessages([...chatMessages, { text: option, sender: 'user' }]);
        
        setTimeout(() => {
            if (option === 'ציוד תאורה') {
                const lightingProducts = products.filter(p => 
                    p.idCattegoryNavigation?.name?.includes('תאורה') || 
                    p.details?.includes('תאורה')
                ).slice(0, 3);
                
                setChatMessages(prev => [...prev, { 
                    text: 'הנה כמה מוצרי תאורה פופולריים:', 
                    sender: 'system',
                    products: lightingProducts
                }]);
            } else if (option === 'ציוד סאונד') {
                const soundProducts = products.filter(p => 
                    p.idCattegoryNavigation?.name?.includes('סאונד') || 
                    p.details?.includes('סאונד') ||
                    p.details?.includes('רמקול')
                ).slice(0, 3);
                
                setChatMessages(prev => [...prev, { 
                    text: 'הנה כמה מוצרי הגברה מומלצים:', 
                    sender: 'system',
                    products: soundProducts
                }]);
            } else if (option === 'ציוד במה') {
                const stageProducts = products.filter(p => 
                    p.idCattegoryNavigation?.name?.includes('במה') || 
                    p.details?.includes('במה')
                ).slice(0, 3);
                
                setChatMessages(prev => [...prev, { 
                    text: 'הנה כמה פריטי ציוד במה פופולריים:', 
                    sender: 'system',
                    products: stageProducts
                }]);
            } else {
                setChatMessages(prev => [...prev, { 
                    text: 'אשמח לעזור לך למצוא את מה שאתה מחפש. אנא תאר את המוצר או השימוש שאתה צריך עבורו.', 
                    sender: 'system' 
                }]);
            }
        }, 1000);
    };
    
    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setChatMessages([...chatMessages, { 
            text: `בחרת במוצר: ${product.name}`, 
            sender: 'user' 
        }]);
        
        setTimeout(() => {
            setChatMessages(prev => [...prev, { 
                text: `מידע על ${product.name}:\n${product.details}\n\nקוד מוצר: ${product.id}`, 
                sender: 'system' 
            }]);
            
            setTimeout(() => {
                setChatMessages(prev => [...prev, { 
                    text: 'האם תרצה לראות פרטים נוספים על מוצר זה?', 
                    sender: 'system',
                    options: ['כן, הצג פרטים נוספים', 'לא תודה']
                }]);
            }, 1000);
        }, 1000);
    };
    
    const handleChatProductAction = (option) => {
        setChatMessages([...chatMessages, { text: option, sender: 'user' }]);
        
        if (option === 'כן, הצג פרטים נוספים' && selectedProduct) {
            setProd(selectedProduct);
            
            setTimeout(() => {
                setChatMessages(prev => [...prev, { 
                    text: 'פתחתי את חלון הפרטים של המוצר. האם אוכל לעזור לך במשהו נוסף?', 
                    sender: 'system',
                    options: ['חיפוש מוצר אחר', 'סיום שיחה']
                }]);
            }, 1000);
        } else if (option === 'חיפוש מוצר אחר') {
            setTimeout(() => {
                setChatMessages(prev => [...prev, { 
                    text: 'במה אוכל לעזור לך עכשיו? מה אתה מחפש?', 
                    sender: 'system',
                    options: ['ציוד תאורה', 'ציוד סאונד', 'ציוד במה', 'אחר']
                }]);
            }, 1000);
        } else if (option === 'סיום שיחה') {
            setTimeout(() => {
                setChatMessages(prev => [...prev, { 
                    text: 'תודה על השיחה! אם תצטרך עזרה נוספת, אני כאן.', 
                    sender: 'system'
                }]);
                
                setTimeout(() => {
                    setShowChat(false);
                }, 2000);
            }, 1000);
        } else if (option === 'לא תודה') {
            setTimeout(() => {
                setChatMessages(prev => [...prev, { 
                    text: 'בסדר גמור! האם אוכל לעזור לך במשהו אחר?', 
                    sender: 'system',
                    options: ['חיפוש מוצר אחר', 'סיום שיחה']
                }]);
            }, 1000);
        }
    };

    return (
        <>
            <div className="filters-container">
                <div className="filters-header">
                    <h2 className="filters-title">סינון מוצרים</h2>
                    <button className="filters-reset" onClick={resetFilters}>איפוס סינון</button>
                </div>
                <div className="filters-content">
                    <div className="filter-group">
                        <label className="filter-label"></label>
                        <input
                            type="text"
                            className="filter-input"
                            placeholder="חפש לפי שם או תיאור"
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="products-container">
                {isLoading ? (
                    // Skeleton loading state
                    Array(6).fill().map((_, index) => (
                        <div className="skeleton-card" key={index}>
                            <div className="skeleton-image"></div>
                            <div className="skeleton-details">
                                <div className="skeleton-text"></div>
                                <div className="skeleton-text"></div>
                                <div className="skeleton-text"></div>
                            </div>
                        </div>
                    ))
                ) : filteredProducts.length === 0 ? (
                    // Empty state
                    <div className="empty-state">
                        <div className="empty-state-icon">🔍</div>
                        <h3 className="empty-state-title">לא נמצאו מוצרים</h3>
                        <p className="empty-state-text">נסה לשנות את הגדרות הסינון או לחפש מונח אחר</p>
                        <button className="product-action" onClick={resetFilters}>הצג את כל המוצרים</button>
                    </div>
                ) : (
                    // Products grid
                    filteredProducts.map(p => (
                        <div className="product-card" onClick={() => { setProd(p) }} key={p.id}>
                            <div className="product-image-container">
                                <img
                                    className="product-image"
                                    src={`/pic/Products/${p.url}.png`}
                                    alt={p.name}
                                    onError={(e) => {
                                        e.target.src = '/product-placeholder.jpg';
                                    }}
                                />
                            </div>
                            <div className="product-details">
                                <div className="product-category">{p.idCattegoryNavigation?.name || 'קטגוריה'}</div>
                                <h3 className="product-name">{p.name}</h3>
                                <p className="product-description">{p.details}</p>
                                <div className="product-meta">
                                    <span className="product-id">קוד: {p.id}</span>
                                    <button className="product-action">פרטים נוספים</button>                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {prod && (
                <dialog className="product-dialog" ref={refDialog}>
                    <button className="dialog-close" onClick={() => { setProd(null) }}>✕</button>
                    <div className="dialog-content">
                        <div className="dialog-image-container">
                            <img
                                className="dialog-image"
                                src={`/pic/Products/${prod.url}.png`}
                                alt={prod.name}
                                onError={(e) => {
                                    e.target.src = '/product-placeholder.jpg';
                                }}
                            />
                        </div>
                        <div className="dialog-details">
                            <h2 className="dialog-title">{prod.name}</h2>
                            <div className="dialog-info">
                                <div className="dialog-info-item">
                                    <span className="dialog-info-label">קטגוריה:</span>
                                    <span>{prod.idCattegoryNavigation?.name || 'קטגוריה'}</span>
                                </div>
                                <div className="dialog-info-item">
                                    <span className="dialog-info-label">קוד מוצר:</span>
                                    <span>{prod.id}</span>
                                </div>
                            </div>
                            <p className="dialog-description">{prod.details}</p>
                            <div className="dialog-actions">
                                <button
                                    className="action-button primary-action"
                                    onClick={() => { checkSignedIn(prod); }}
                                >
                                    לפירוט מחירים וסניפים
                                </button>
                            </div>
                        </div>
                    </div>
                </dialog>
            )}
            
            {/* צ'אט */}
            {showChat && (
                <div className="chat-dialog">
                    <div className="chat-header">
                        <h3>צ'אט עזרה</h3>
                        <button className="chat-close" onClick={closeChat}>×</button>
                    </div>
                    <div className="chat-messages">
                        {chatMessages.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.sender}`}>
                                <p>{msg.text}</p>
                                
                                {msg.options && (
                                    <div className="chat-options">
                                        {msg.options.map((option, optIndex) => (
                                            <button 
                                                key={optIndex} 
                                                className="chat-option-button"
                                                onClick={() => {
                                                    if (option === 'כן, הצג פרטים נוספים' || 
                                                        option === 'לא תודה' ||
                                                        option === 'חיפוש מוצר אחר' ||
                                                        option === 'סיום שיחה') {
                                                        handleChatProductAction(option);
                                                    } else {
                                                        handleChatOption(option);
                                                    }
                                                }}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                
                                {msg.products && (
                                    <div className="chat-products">
                                        {msg.products.map((product, prodIndex) => (
                                            <div 
                                                key={prodIndex} 
                                                className="chat-product-item"
                                                onClick={() => handleProductSelect(product)}
                                            >
                                                <div className="chat-product-image">
                                                    <img 
                                                        src={`/pic/Products/${product.url}.png`}
                                                        alt={product.name}
                                                        onError={(e) => {
                                                            e.target.src = '/product-placeholder.jpg';
                                                        }}
                                                    />
                                                </div>
                                                <div className="chat-product-info">
                                                    <h4>{product.name}</h4>
                                                    <p>{product.details.substring(0, 60)}...</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
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
            
            {/* כפתור צ'אט צף */}
            {!showChat && (
                <button className="chat-button" onClick={openChat}>
                    <ChatIcon />
                    {hasNotification && <span className="chat-notification">1</span>}
                </button>
            )}
        </>
    );
};
