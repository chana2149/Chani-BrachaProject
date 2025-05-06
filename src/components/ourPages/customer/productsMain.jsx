import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProductsByIdThunk } from "../../../redux/slices/products/GetProductsByIdThunk";
import { getProductsThunk } from "../../../redux/slices/products/GetAllProductsThunk";
import { addCurrentCustCart, addCurrentCustFaverate } from "../../../redux/slices/costumers/CostumerSlice";
import { AddFavorateThunk } from "../../../redux/slices/costumers/AddFavorateThunk";
import { DeleteFavorateThunk } from "../../../redux/slices/costumers/DeleteFavorateThunk";
import { GetCostumerByIdThunk } from "../../../redux/slices/costumers/GetCostumerByIdThunk";
import { sortByBig, sortBySmall } from "../../../redux/slices/products/ProductSlice";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";

export const ProductsMain = () => {
    const currentCust = useSelector(state => state.costumers.currentCust);
    const cart = useSelector(state => state.costumers.currentCustCart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [prod, setProd] = useState(null);
    const [exsitsInCart, setExsitsInCart] = useState(false);
    const [showDateError, setShowDateError] = useState(false);
    const [showAddSuccess, setShowAddSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        location: '',
        sortBy: 'priceHighToLow',
        availability: 'all'
    });
    const favorate = useSelector(state => state.costumers.currentCustFaverate);
    const product = useSelector(state => state.products.product);
    const refDialog = useRef();

    useEffect(() => {
        if (currentCust && Object.keys(currentCust).length > 0) {
            dispatch(GetCostumerByIdThunk(currentCust.id));
        }

        // Simulate loading
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        if (currentCust && Object.keys(currentCust).length > 0) {
            dispatch(GetCostumerByIdThunk(currentCust.id));
        }

        if (prod !== null) {
            refDialog.current.showModal();
        }
    }, [prod]);

    const isInFavorites = (productId) => {
        return favorate?.some(f => f.id === productId);
    };

    const handleFilterChange = (name, value) => {
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const resetFilters = () => {
        setFilters({
            location: '',
            sortBy: 'priceHighToLow',
            availability: 'all'
        });
    };

    const sortProducts = (products) => {
        if (!products) return [];

        const sortedProducts = [...products];

        switch (filters.sortBy) {
            case 'priceLowToHigh':
                return sortedProducts.sort((a, b) => a.price - b.price);
            case 'priceHighToLow':
                return sortedProducts.sort((a, b) => b.price - a.price);
            case 'availability':
                return sortedProducts.sort((a, b) => {
                    if (a.available.toString() === 'true' && b.available.toString() === 'false') return -1;
                    if (a.available.toString() === 'false' && b.available.toString() === 'true') return 1;
                    return 0;
                });
            default:
                return sortedProducts;
        }
    };
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
    const filterProducts = (products) => {
        if (!products) return [];

        return products.filter(p => {
            // Filter by location
            if (filters.location && !p.idSnifNavigation.address.includes(filters.location)) {
                return false;
            }

            // Filter by availability
            if (filters.availability === 'available' && p.available.toString() === 'false') {
                return false;
            }
            if (filters.availability === 'unavailable' && p.available.toString() === 'true') {
                return false;
            }

            return true;
        });
    };

    const addToCart = (prod) => {
        var f = 0;
        cart.map(x => {
            if (x.id === prod.id) { f = 1 }
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

    // const toggleFavorite = (prod) => {
    //     if (isInFavorites(prod.id)) {
    //         dispatch(DeleteFavorateThunk({ customerid: currentCust.id, prodid: prod.id }));
    //     } else {
    //         dispatch(AddFavorateThunk({ customerid: currentCust.id, prodid: prod.id }));
    //     }
    // };

    // Get filtered and sorted products
    const filteredAndSortedProducts = sortProducts(filterProducts(product.productsMains));

    return (
        <div className="products-main-page">
            <div className="filters-container">
                <div className="filters-header">
                    <h2 className="filters-title">סינון וחיפוש</h2>
                    <button className="filters-reset" onClick={resetFilters}>איפוס סינון</button>
                </div>
                <div className="filters-content">
                    <div className="filter-group">
                        <label className="filter-label">חיפוש לפי מיקום</label>
                        <input
                            type="text"
                            className="filter-input"
                            placeholder="הזן עיר או כתובת"
                            value={filters.location}
                            onChange={(e) => handleFilterChange('location', e.target.value)}
                        />
                    </div>
                    <div className="filter-group">
                        <label className="filter-label">מיון לפי</label>
                        <select
                            className="filter-select"
                            value={filters.sortBy}
                            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                        >
                            <option value="priceHighToLow">מחיר מגבוה לנמוך</option>
                            <option value="priceLowToHigh">מחיר מנמוך לגבוה</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label className="filter-label">זמינות</label>
                        <select
                            className="filter-select"
                            value={filters.availability}
                            onChange={(e) => handleFilterChange('availability', e.target.value)}
                        >
                            <option value="all">הכל</option>
                            <option value="available">זמין בלבד</option>
                            <option value="unavailable">לא זמין</option>
                        </select>
                    </div>
                </div>
            </div>


            <div className="products-main-container">
          
                {isLoading ? (
                    // Skeleton loading state
                    Array(3).fill().map((_, index) => (
                        <div className="skeleton-card" key={index} style={{ height: '200px' }}>
                            <div className="skeleton-image"></div>

                            <div className="skeleton" style={{ height: '100%' }}></div>
                        </div>
                    ))
                ) : filteredAndSortedProducts?.length === 0 ? (

                    // Empty state
                    <div className="empty-state">
                        <div className="empty-state-icon">🔍</div>
                        <h3 className="empty-state-title">לא נמצאו מוצרים</h3>
                        <p className="empty-state-text">נסה לשנות את הגדרות הסינון או לחפש מיקום אחר</p>
                        <button className="product-action" onClick={()=>{navigate('/home/products')}}>הצג את כל המוצרים</button>
                    </div>
                ) : (
                    // Products list (1 per row)
                    filteredAndSortedProducts?.map(p => (
                        <div className="product-main-card" key={p.id} onClick={() => { setProd(p) }}>
                            <div className="product-main-image-container">
                                <img
                                    className="product-main-image"
                                    src={`/pic/Products/${p.idProductNavigation.url}.png`}
                                    alt={p.idProductNavigation.name}
                                    onError={(e) => {
                                        e.target.src = '/product-placeholder.jpg';
                                    }}
                                />

                            </div>
                            <div className="product-main-details">
                                <div className="product-main-header">
                                    <h3 className="product-main-title">{p.idProductNavigation.name}</h3>
                                    <div className="product-main-price">
                                        {p.price} ₪
                                    </div>
                                </div>

                                <div className="product-main-info">
                                    <div className="info-item">
                                        <LocationOnIcon />
                                        <span>{p.idSnifNavigation.address}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">זמינות:</span>
                                        <span className={p.available.toString() === 'true' ? 'available' : 'unavailable'}>
                                            {p.available.toString() === 'true' ? 'זמין' : 'לא זמין'}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <PhoneIcon />
                                        <span>{p.idSnifNavigation.telephone}</span>
                                    </div>
                                    {p.available.toString() === 'false' && (
                                        <div className="info-item">
                                            <span>
                                                חוזר בתאריך {new Date(p.dayTaken).toLocaleDateString()}
                                            </span>
                                        </div>

                                    )}
                                    <div className="info-item">
                                        <span className="info-label">קוד מוצר:</span>
                                        <span>{p.id}</span>
                                    </div>

                                </div>


                            </div>
                        </div>
                    ))
                )}
            </div>

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
                </dialog>
            )}
        </div>
    );
};


