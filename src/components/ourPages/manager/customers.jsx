import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCostumersThunk } from "../../../redux/slices/costumers/GetCostumersThunk";
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';

export const Costumer = () => {
    const dispatch = useDispatch();
    const costumers = useSelector(state => state.costumers.costumersList);
    const isLoading = useSelector(state => state.costumers.loading);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("all");
    
    useEffect(() => {
        dispatch(GetCostumersThunk());
    }, [dispatch]);
    
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    
    const toggleFilter = () => {
        setFilterOpen(!filterOpen);
    };
    
    const applyFilter = (filter) => {
        setSelectedFilter(filter);
        setFilterOpen(false);
    };
    
    // Filter and search costumers
    const filteredCostumers = costumers.filter(customer => {
        const matchesSearch = 
            customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.telephone?.includes(searchTerm);
            
        if (selectedFilter === "all") return matchesSearch;
        // Add more filter conditions as needed
        return matchesSearch;
    });
    
    return (
        <div className="customers-page">
            <div className="page-header">
                <h1 className="page-title">ניהול לקוחות</h1>
                <p className="page-description">צפייה וניהול של כל הלקוחות במערכת</p>
            </div>
            
            <div className="page-actions">
                <div className="search-container">
                    <SearchIcon className="search-icon" />
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="חיפוש לקוחות..." 
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                
                <div className="filter-container">
                    <button className="filter-button" onClick={toggleFilter}>
                        <FilterListIcon />
                        <span>סינון</span>
                    </button>
                    
                    {filterOpen && (
                        <div className="filter-dropdown">
                            <button 
                                className={`filter-option ${selectedFilter === 'all' ? 'active' : ''}`}
                                onClick={() => applyFilter('all')}
                            >
                                כל הלקוחות
                            </button>
                            <button 
                                className={`filter-option ${selectedFilter === 'active' ? 'active' : ''}`}
                                onClick={() => applyFilter('active')}
                            >
                                לקוחות פעילים
                            </button>
                            <button 
                                className={`filter-option ${selectedFilter === 'inactive' ? 'active' : ''}`}
                                onClick={() => applyFilter('inactive')}
                            >
                                לקוחות לא פעילים
                            </button>
                        </div>
                    )}
                </div>
                
                {/* <button className="add-button">
                    <AddIcon />
                    <span>הוסף לקוח</span>
                </button> */}
            </div>
            
            {isLoading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>טוען לקוחות...</p>
                </div>
            ) : filteredCostumers.length > 0 ? (
                <div className="customers-grid">
                    {filteredCostumers.map(customer => (
                        <div className="customer-card" key={customer.id}>
                            <div className="customer-avatar">
                                <PersonIcon />
                            </div>
                            
                            <div className="customer-info">
                                <h3 className="customer-name">{customer.name}</h3>
                                
                                <div className="customer-details">
                                    <div className="customer-detail">
                                        <PhoneIcon />
                                        <span>{customer.telephone || 'לא צוין'}</span>
                                    </div>
                                    
                                    <div className="customer-detail">
                                        <LocationOnIcon />
                                        <span>{customer.address || 'לא צוין'}</span>
                                    </div>
                                    
                                    <div className="customer-detail">
                                        <EmailIcon />
                                        <span>{customer.email || 'לא צוין'}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="customer-actions">
                                <button className="action-button edit">ערוך</button>
                                <button className="action-button view">צפה בהזמנות</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <PersonIcon style={{ fontSize: '4rem', color: '#ddd' }} />
                    <h3 className="empty-state-title">לא נמצאו לקוחות</h3>
                    <p className="empty-state-text">
                        {searchTerm ? 'נסה לחפש מונח אחר או' : 'אין לקוחות במערכת כרגע.'}
                        {' '}הוסף לקוח חדש כדי להתחיל
                    </p>
                    <button className="empty-state-action">
                        <AddIcon /> הוסף לקוח חדש
                    </button>
                </div>
            )}
        </div>
    );
};
