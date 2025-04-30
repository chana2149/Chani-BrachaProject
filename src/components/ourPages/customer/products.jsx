import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getProductsThunk } from '../../../redux/slices/products/GetAllProductsThunk';
import { GetProductsByIdThunk } from '../../../redux/slices/products/GetProductsByIdThunk';
import { useNavigate } from 'react-router-dom';
import { setcustCameFrom } from '../../../redux/slices/costumers/CostumerSlice';

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

    return (
        <>
            <div className="filters-container">
                <div className="filters-header">
                    <h2 className="filters-title">סינון מוצרים</h2>
                    <button className="filters-reset" onClick={resetFilters}>איפוס סינון</button>
                </div>
                <div className="filters-content">
                    <div className="filter-group">
                        <label className="filter-label">חיפוש</label>
                        <input 
                            type="text" 
                            className="filter-input" 
                            placeholder="חפש לפי שם או תיאור" 
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                        />
                    </div>
                    <div className="filter-group">
                        <label className="filter-label">קטגוריה</label>
                        <select 
                            className="filter-select"
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                        >
                            <option value="">כל הקטגוריות</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
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
                        <button className="empty-state-action" onClick={resetFilters}>הצג את כל המוצרים</button>
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
                                    <button className="product-action">פרטים נוספים</button>
                                </div>
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
        </>
    );
};
