import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { AddProductsThunk } from '../../../redux/slices/products/AddProductsThunk';
import { getProductsThunk } from '../../../redux/slices/products/GetAllProductsThunk';
import { EditProductThunk } from '../../../redux/slices/products/EditProductThunk';
import { AddProductsMainThunk } from '../../../redux/slices/products/AddProductsMainThunk';
import { GetSniffimThunk } from '../../../redux/slices/sniffim/GetSniffimThunk';
import { DeleteProdMainThunk } from '../../../redux/slices/products/DeleteProdMainThunk';
import { GetCattegoryThunk } from '../../../redux/slices/cattegory/GetCattegoryThunk';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import StoreIcon from '@mui/icons-material/Store';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import SearchIcon from '@mui/icons-material/Search';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const Products1 = () => {
    const productLoading = useSelector(state => state.products.loading);
    const dispatch = useDispatch();
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const productsMain = useSelector(state => state.products.product);
    const catt = useSelector(state => state.cattegory.cattagoryList);
    const [snif, setSnif] = useState({});
    const products = useSelector(state => state.products.productsList);
    const [index1, setIndex1] = useState(-1);
    const [prod, setProd] = useState({ 
        id: 0, 
        name: "", 
        url: "", 
        details: "", 
        idCattegory: 9000, 
        idCattegoryNavigation: {}, 
        productsMains: [] 
    });
    const [prodMain, setProdMain] = useState({
        idProduct: 0, 
        dayTaken: null, 
        idSnif: 0, 
        id: 0, 
        available: true, 
        price: 0, 
        canBeUsed: true, 
        IdProductNavigation: { name: "" }, 
        IdSnifNavigation: {
            id: 0,
            name: "",
            address: "",
            telephone: "",
        }
    });
    const sniffim = useSelector(state => state.sniffim.sniffimList);
    const refDialog = useRef();
    
    const f = (p, e) => {
        console.log(e, p);
    };
    
    const saveNewMain = () => {
        dispatch(AddProductsMainThunk(prodMain));
        setShowAdd(false);
    };
    
    const findId = (e) => {
        const cat = catt.find(x => x.name === e);
        if (cat) {
            setProd({ ...prod, idCattegory: cat.id });
        }
    };
    
    const save = () => {
        if (index1 === -1) {
            dispatch(AddProductsThunk(prod));
        } else {
            dispatch(EditProductThunk(prod));
        }
    };
    
    useEffect(() => {
        dispatch(getProductsThunk());
        dispatch(GetCattegoryThunk());
    }, [dispatch]);
    
    useEffect(() => {
        if (showEdit || showAdd || showDelete)
            refDialog.current.showModal();
    }, [showEdit, showAdd, showDelete]);
    
    const addItem = (p) => {
        setShowAdd(true);
        setProd(p);
        dispatch(GetSniffimThunk());
    };
    
    const deleteItem = (p) => {
        setProd(p);
        dispatch(GetSniffimThunk());
        setShowDelete(true);
    };
    
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    
    const filteredProducts = products.filter(product => 
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.details?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return (
        <div className="products-page">
            <div className="page-header">
                <h1 className="page-title">ניהול מוצרים</h1>
                <p className="page-description">הוספה, עריכה וניהול של מוצרים במערכת</p>
            </div>
            
            <div className="page-actions">
                <div className="search-container">
                    <SearchIcon className="search-icon" />
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="חיפוש מוצרים..." 
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                
                <button 
                    className="add-button" 
                    onClick={() => { 
                        setShowEdit(true); 
                        setIndex1(-1);
                        setProd({ 
                            id: 0, 
                            name: "", 
                            url: "", 
                            details: "", 
                            idCattegory: 9000, 
                            idCattegoryNavigation: {}, 
                            productsMains: [] 
                        }); 
                    }}
                >
                    <AddIcon /> הוסף מוצר חדש
                </button>
            </div>
            
            {productLoading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>טוען מוצרים...</p>
                </div>
            ) : filteredProducts.length > 0 ? (
                <div className="products-grid">
                    {filteredProducts.map((p, index) => (
                        <div className="product-card" key={p.id}>
                            <div className="product-image">
                                {p.url ? (
                                    <img src={p.url} alt={p.name} />
                                ) : (
                                    <InventoryIcon />
                                )}
                            </div>
                            
                            <div className="product-info">
                                <h3 className="product-name">{p.name}</h3>
                                
                                <div className="product-category">
                                    <CategoryIcon />
                                    <span>{p.idCattegoryNavigation?.name || 'ללא קטגוריה'}</span>
                                </div>
                                
                                <p className="product-description">{p.details}</p>
                                
                                <div className="product-id">מק"ט: {p.id}</div>
                            </div>
                            
                            <div className="product-actions">
                                <button 
                                    className="action-button edit" 
                                    onClick={() => { 
                                        setIndex1(index); 
                                        setProd(p); 
                                        setShowEdit(true); 
                                    }}
                                >
                                    <EditIcon /> ערוך
                                </button>
                                
                                <button 
                                    className="action-button add-to-branch" 
                                    onClick={() => addItem(p)}
                                >
                                    <StoreIcon /> הוסף לסניף
                                </button>
                                
                                <button 
                                    className="action-button delete" 
                                    onClick={() => deleteItem(p)}
                                >
                                    <DeleteIcon /> הסר מסניף
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                <InventoryIcon style={{ fontSize: '4rem', color: '#ddd' }} />
                <h3 className="empty-state-title">לא נמצאו מוצרים</h3>
                <p className="empty-state-text">
                    {searchTerm ? 'נסה לחפש מונח אחר או' : 'אין מוצרים במערכת כרגע.'}
                    {' '}הוסף מוצר חדש כדי להתחיל
                </p>
                <button 
                    className="empty-state-action"
                    onClick={() => { 
                        setShowEdit(true); 
                        setIndex1(-1);
                        setProd({ 
                            id: 0, 
                            name: "", 
                            url: "", 
                            details: "", 
                            idCattegory: 9000, 
                            idCattegoryNavigation: {}, 
                            productsMains: [] 
                        }); 
                    }}
                >
                    <AddIcon /> הוסף מוצר חדש
                </button>
            </div>
        )}
        
        {/* Edit Product Dialog */}
        {showEdit && (
            <dialog className="edit-dialog" ref={refDialog}>
                <div className="dialog-header">
                    <h2 className="dialog-title">{index1 === -1 ? 'הוספת מוצר חדש' : 'עריכת מוצר'}</h2>
                    <button 
                        className="close-dialog-button" 
                        onClick={() => { setShowEdit(false); }}
                    >
                        <CloseIcon />
                    </button>
                </div>
                
                <div className="dialog-content">
                    <div className="form-group">
                        <label htmlFor="product-name">שם המוצר</label>
                        <input 
                            id="product-name"
                            className="form-input" 
                            value={prod.name} 
                            onChange={e => { setProd({ ...prod, name: e.target.value, url: e.target.value }); }} 
                            placeholder="הזן שם מוצר" 
                            autoFocus
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="product-details">תיאור המוצר</label>
                        <textarea 
                            id="product-details"
                            className="form-input textarea" 
                            value={prod.details} 
                            onChange={e => { setProd({ ...prod, details: e.target.value }); }} 
                            placeholder="הזן תיאור מפורט של המוצר" 
                            rows="3"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="product-category">קטגוריה</label>
                        {prod.id !== 0 ? (
                            <select 
                                id="product-category"
                                className="form-input" 
                                value={prod.idCattegoryNavigation.name || ''} 
                                onChange={e => { findId(e.target.value); }}
                            >
                                {catt.map(c => (
                                    <option key={c.id} value={c.name}>{c.name}</option>
                                ))}
                            </select>
                        ) : (
                            <select 
                                id="product-category"
                                className="form-input" 
                                onChange={e => { findId(e.target.value); }}
                            >
                                <option value="">בחר קטגוריה</option>
                                {catt.map(c => (
                                    <option key={c.id} value={c.name}>{c.name}</option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>
                
                <div className="dialog-actions">
                    <button 
                        className="cancel-button" 
                        onClick={() => { setShowEdit(false); }}
                    >
                        ביטול
                    </button>
                    <button 
                        className="save-button" 
                        onClick={() => { save(); setShowEdit(false); }}
                        disabled={!prod.name || !prod.details || prod.idCattegory === 9000}
                    >
                        {index1 === -1 ? 'הוסף מוצר' : 'שמור שינויים'}
                    </button>
                </div>
            </dialog>
        )}
        
        {/* Add Product to Branch Dialog */}
        {showAdd && (
            <dialog className="edit-dialog branch-dialog" ref={refDialog}>
                <div className="dialog-header">
                    <h2 className="dialog-title">הוספת מוצר לסניף</h2>
                    <button 
                        className="close-dialog-button" 
                        onClick={() => { setShowAdd(false); }}
                    >
                        <CloseIcon />
                    </button>
                </div>
                
                <div className="dialog-content">
                    <div className="selected-product-info">
                        <h3>מוצר נבחר: {prod.name}</h3>
                    </div>
                    
                    <div className="branches-list">
                        <h4 className="branches-title">בחר סניף להוספת המוצר:</h4>
                        
                        {sniffim.map((s) => (
                            <div 
                                className={`branch-item ${s.id === snif.id ? 'selected' : ''}`} 
                                onClick={() => { 
                                    setSnif(s); 
                                    setProdMain({ 
                                        ...prodMain, 
                                        idSnif: s.id, 
                                        idProduct: prod.id 
                                    }); 
                                }} 
                                key={s.id}
                            >
                                <StoreIcon className="branch-icon" />
                                <div className="branch-name">{s.name}</div>
                                
                                {s.id === snif.id && (
                                    <div className="branch-price-input">
                                        <div className="form-group">
                                            <label htmlFor="product-price">מחיר המוצר</label>
                                            <div className="price-input-wrapper">
                                                <AttachMoneyIcon className="price-icon" />
                                                <input 
                                                    id="product-price"
                                                    className="form-input" 
                                                    type="number" 
                                                    min="0"
                                                    step="0.01"
                                                    onChange={e => { 
                                                        setProdMain({ 
                                                            ...prodMain, 
                                                            price: parseFloat(e.target.value) 
                                                        }); 
                                                    }} 
                                                    placeholder="הזן מחיר" 
                                                    autoFocus
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="dialog-actions">
                    <button 
                        className="cancel-button" 
                        onClick={() => { setShowAdd(false); }}
                    >
                        ביטול
                    </button>
                    <button 
                        className="save-button" 
                        onClick={saveNewMain}
                        disabled={!snif.id || !prodMain.price}
                    >
                        הוסף לסניף
                    </button>
                </div>
            </dialog>
        )}
        
        {/* Delete Product from Branch Dialog */}
        {showDelete && (
            <dialog className="edit-dialog delete-dialog" ref={refDialog}>
                <div className="dialog-header">
                    <h2 className="dialog-title">הסרת מוצר מסניף</h2>
                    <button 
                        className="close-dialog-button" 
                        onClick={() => { setShowDelete(false); }}
                    >
                        <CloseIcon />
                    </button>
                </div>
                
                <div className="dialog-content">
                    <div className="selected-product-info">
                        <h3>מוצר נבחר: {prod.name}</h3>
                    </div>
                    
                    <div className="branches-list">
                        <h4 className="branches-title">בחר סניף להסרת המוצר:</h4>
                        
                        {sniffim.map((s) => (
                            <div 
                                className={`branch-item ${s.id === snif.id ? 'selected' : ''}`} 
                                onClick={() => { setSnif(s); }} 
                                key={s.id}
                            >
                                <StoreIcon className="branch-icon" />
                                <div className="branch-name">{s.name}</div>
                                
                                {s.id === snif.id && (
                                    <div className="product-instances">
                                        <div className="form-group">
                                            <label htmlFor="product-instance">בחר מופע מוצר להסרה</label>
                                            <select 
                                                id="product-instance"
                                                className="form-input" 
                                                onChange={(e) => { 
                                                    setProdMain({ ...prodMain, id: e.target.value }); 
                                                }}
                                            >
                                                <option value="">בחר מופע מוצר</option>
                                                {prod.productsMains?.filter(c => 
                                                    c.idSnif === s.id && 
                                                    c.available.toString() === "true" && 
                                                    c.canBeUsed.toString() === "true"
                                                ).map(c => (
                                                    <option key={c.id} value={c.id}>
                                                        מופע #{c.id} - מחיר: {c.price} ₪
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="dialog-actions">
                    <button 
                        className="cancel-button" 
                        onClick={() => { setShowDelete(false); }}
                    >
                        ביטול
                    </button>
                    <button 
                        className="delete-button" 
                        onClick={() => {
                            dispatch(DeleteProdMainThunk(prodMain.id));
                            setShowDelete(false);
                        }}
                        disabled={!prodMain.id}
                    >
                        הסר מוצר מהסניף
                    </button>
                </div>
            </dialog>
        )}
    </div>
);
};
