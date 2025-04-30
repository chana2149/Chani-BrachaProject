import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSniffimThunk } from "../../../redux/slices/sniffim/GetSniffimThunk";
import { EditSniffimThunk } from "../../../redux/slices/sniffim/EditSniffimThunk";
import { addSniffimThunk } from "../../../redux/slices/sniffim/AddSniffimThunk";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import StoreIcon from '@mui/icons-material/Store';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';

export const Sniffim = () => {
    const dispatch = useDispatch();
    const [index1, setIndex1] = useState(-1);
    const sniffim = useSelector(state => state.sniffim.sniffimList);
    const [snif, setSnif] = useState({ id: -1, name: "", address: "", telephone: "", productsMains: [] });
    const [showEdit, setShowEdit] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const refDialog = useRef();
    const isLoading = useSelector(state => state.sniffim.loading);
    
    const save = () => {
        if (index1 === -1) {
            dispatch(addSniffimThunk(snif));
        } else { 
            dispatch(EditSniffimThunk(snif));
        }
        
        if (!isLoading) {
            dispatch(GetSniffimThunk());
        }
    };
    
    useEffect(() => {
        if (showEdit) {
            refDialog.current.showModal();
        }
        dispatch(GetSniffimThunk());
    }, []);
    
    useEffect(() => {
        if (showEdit) {
            refDialog.current.showModal();
        } else {
            setSnif({ id: -1, name: "", address: "", telephone: "", productsMains: [] });
        }
    }, [showEdit]);
    
    const handleAddSnif = () => {
        setIndex1(-1);
        setSnif({ id: -1, name: "", address: "", telephone: "", productsMains: [] });
        setShowEdit(true);
    };
    
    const handleEditSnif = (index) => {
        setIndex1(index);
        setSnif(sniffim[index]);
        setShowEdit(true);
    };
    
    const filteredSniffim = sniffim.filter(snif => 
        snif.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snif.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snif.telephone.includes(searchTerm)
    );
    
    return (
        <div className="sniffim-page">
            <div className="page-actions">
                <div className="search-container">
                    <SearchIcon className="search-icon" />
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="חיפוש סניפים..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <button className="add-button" onClick={handleAddSnif}>
                    <AddIcon /> הוסף סניף
                </button>
            </div>
            
            {isLoading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>טוען סניפים...</p>
                </div>
            ) : filteredSniffim.length > 0 ? (
                <div className="sniffim-grid">
                    {filteredSniffim.map((p, index) => (
                        <div className="snif-card" key={p.Id}>
                            <div className="snif-header">
                                <StoreIcon className="snif-icon" />
                                <h3 className="snif-name">{p.name}</h3>
                            </div>
                            
                            <div className="snif-details">
                                <div className="snif-detail">
                                    <LocationOnIcon />
                                    <span>{p.address}</span>
                                </div>
                                <div className="snif-detail">
                                    <PhoneIcon />
                                    <span>{p.telephone}</span>
                                </div>
                            </div>
                            
                            <div className="snif-actions">
                                <button 
                                    className="edit-button" 
                                    onClick={() => handleEditSnif(index)}
                                >
                                    <EditIcon /> עריכה
                                </button>
                                <button className="delete-button">
                                    <DeleteIcon /> מחיקה
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <StoreIcon style={{ fontSize: '4rem', color: '#ddd' }} />
                    <h3 className="empty-state-title">לא נמצאו סניפים</h3>
                    <p className="empty-state-text">
                        {searchTerm ? 'נסה לחפש מונח אחר או' : 'אין סניפים במערכת כרגע.'}
                        {' '}הוסף סניף חדש כדי להתחיל
                    </p>
                    <button className="empty-state-action" onClick={handleAddSnif}>
                        <AddIcon /> הוסף סניף חדש
                    </button>
                </div>
            )}
            
            {showEdit && (
                <dialog className="edit-dialog" ref={refDialog}>
                    <div className="dialog-header">
                        <h2 className="dialog-title">{index1 === -1 ? 'הוספת סניף חדש' : 'עריכת סניף'}</h2>
                        <button 
                            className="close-dialog-button" 
                            onClick={() => { setShowEdit(false); }}
                        >
                            <CloseIcon />
                        </button>
                    </div>
                    
                    <div className="dialog-content">
                        <div className="form-group">
                            <label htmlFor="snif-name">שם הסניף</label>
                            <input 
                                id="snif-name"
                                className="form-input" 
                                value={snif.name} 
                                onChange={e => { setSnif({ ...snif, name: e.target.value }); }} 
                                placeholder="הזן שם סניף" 
                                autoFocus 
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="snif-phone">מספר טלפון</label>
                            <input 
                                id="snif-phone"
                                className="form-input" 
                                value={snif.telephone} 
                                onChange={e => { setSnif({ ...snif, telephone: e.target.value }); }} 
                                placeholder="הזן מספר טלפון" 
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="snif-address">כתובת</label>
                            <input 
                                id="snif-address"
                                className="form-input" 
                                value={snif.address} 
                                onChange={e => { setSnif({ ...snif, address: e.target.value }); }} 
                                placeholder="הזן כתובת מלאה" 
                            />
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
                            disabled={!snif.name || !snif.telephone || !snif.address}
                        >
                            {index1 === -1 ? 'הוסף סניף' : 'שמור שינויים'}
                        </button>
                    </div>
                </dialog>
            )}
        </div>
    );
};
