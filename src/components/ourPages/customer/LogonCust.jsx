import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GetCostumerByIdThunk } from "../../../redux/slices/costumers/GetCostumerByIdThunk";
import { AddCustomersThunk } from "../../../redux/slices/costumers/AddCustomersThunk";
import { GetCostumersThunk } from "../../../redux/slices/costumers/GetCostumersThunk";
import { setCurrentCust, setcustCameFrom } from "../../../redux/slices/costumers/CostumerSlice";
import { GetProductsByIdThunk } from "../../../redux/slices/products/GetProductsByIdThunk";

export const LogonCust = () => {
    const navigate = useNavigate();
    const costumers = useSelector(state => state.costumers.costumersList);
    const isLoadingCust = useSelector(state => state.costumers.loading);
    const dispatch = useDispatch();
    const status = useSelector(state => state.costumers.status);
    const [newUse, setnewUse] = useState(false);
    const custCameFrom = useSelector(state => state.costumers.custCameFrom);
    const catt = useSelector(state => state.cattegory.cattagoryList);
    const currentCust = useSelector(state => state.costumers.currentCust);
    const [user, setUser] = useState({ 
        id: currentCust.id, 
        name: currentCust.name, 
        address: "", 
        telephone: "" 
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const refDialog = useRef();

    useEffect(() => {
        if (custCameFrom != "") {
            dispatch(GetProductsByIdThunk(custCameFrom.substring(28)));
        }
    }, [user]);

    useEffect(() => {
        refDialog.current.showModal();
    }, []);

    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;

        // Name validation
        if (!user.name.trim()) {
            tempErrors.name = "שם משתמש נדרש";
            isValid = false;
        }

        // Password validation
        if (!user.id.trim()) {
            tempErrors.id = "סיסמה נדרשת";
            isValid = false;
        } else if (user.id.length < 4) {
            tempErrors.id = "סיסמה חייבת להכיל לפחות 4 תווים";
            isValid = false;
        }

        // Address validation
        if (!user.address.trim()) {
            tempErrors.address = "כתובת נדרשת";
            isValid = false;
        }

        // Phone validation
        if (!user.telephone.trim()) {
            tempErrors.telephone = "מספר טלפון נדרש";
            isValid = false;
        } else if (!/^\d{9,10}$/.test(user.telephone.replace(/[- ]/g, ''))) {
            tempErrors.telephone = "מספר טלפון לא תקין";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const check = () => {
        setIsSubmitting(true);
        
        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        // Check if user already exists
        const userExists = costumers.some(c => c.id === user.id);
        if (userExists) {
            setErrors({...errors, id: "משתמש עם סיסמה זו כבר קיים במערכת"});
            setIsSubmitting(false);
            return;
        }

        dispatch(AddCustomersThunk(user));
        dispatch(setCurrentCust(user));
        
        // Wait for the loading to complete
        setTimeout(() => {
            if (custCameFrom != "") {
                navigate(custCameFrom);
            } else {
                navigate("/home");
            }
        }, 1000);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && isFormValid()) {
            check();
        }
    };

    const isFormValid = () => {
        return user.name && user.id && user.address && user.telephone;
    };

    return (
        <dialog className="dialoglogon" ref={refDialog} onKeyPress={handleKeyPress}>
            <Link className="buttonx" to={'/home'}> X</Link>
            
            <h2 className="form-title">הרשמה</h2>
            <p className="form-subtitle">צור חשבון חדש כדי להתחיל להשתמש בשירותים שלנו</p>
            
            <div className="wrapButtons">
                <div className="input-group">
                    <input 
                        className={`buttonForm ${errors.name ? 'error' : ''}`} 
                        placeholder="שם משתמש" 
                        value={user.name}  
                        onChange={e => {
                            setUser({ ...user, name: e.target.value });
                            if (errors.name) {
                                const { name, ...rest } = errors;
                                setErrors(rest);
                            }
                        }} 
                        required 
                        autoFocus={true}
                    />
                    {errors.name && <div className="error-text">{errors.name}</div>}
                </div>
                
                <div className="input-group">
                    <input 
                        className={`buttonForm ${errors.id ? 'error' : ''}`} 
                        placeholder="סיסמא" 
                        value={user.id}  
                        onChange={e => {
                            setUser({ ...user, id: e.target.value });
                            if (errors.id) {
                                const { id, ...rest } = errors;
                                setErrors(rest);
                            }
                        }} 
                        required 
                        type="password"
                    />
                    {errors.id && <div className="error-text">{errors.id}</div>}
                    
                    {user.id && (
                        <div className="validation-indicator">
                            <div className={`validation-item ${user.id.length >= 4 ? 'valid' : 'invalid'}`}>
                                <span className={`validation-icon ${user.id.length >= 4 ? 'valid' : 'invalid'}`}></span>
                                לפחות 4 תווים
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="input-group">
                    <input 
                        className={`buttonForm ${errors.address ? 'error' : ''}`} 
                        placeholder="כתובת" 
                        value={user.address} 
                        required 
                        onChange={e => {
                            setUser({ ...user, address: e.target.value });
                            if (errors.address) {
                                const { address, ...rest } = errors;
                                setErrors(rest);
                            }
                        }} 
                    />
                    {errors.address && <div className="error-text">{errors.address}</div>}
                </div>
                
                <div className="input-group">
                    <input 
                        className={`buttonForm ${errors.telephone ? 'error' : ''}`} 
                        placeholder="טלפון" 
                        value={user.telephone} 
                        required 
                        onChange={e => {
                            setUser({ ...user, telephone: e.target.value });
                            if (errors.telephone) {
                                const { telephone, ...rest } = errors;
                                setErrors(rest);
                            }
                        }} 
                    />
                    {errors.telephone && <div className="error-text">{errors.telephone}</div>}
                    
                    {user.telephone && (
                        <div className="validation-indicator">
                            <div className={`validation-item ${/^\d{9,10}$/.test(user.telephone.replace(/[- ]/g, '')) ? 'valid' : 'invalid'}`}>
                                <span className={`validation-icon ${/^\d{9,10}$/.test(user.telephone.replace(/[- ]/g, '')) ? 'valid' : 'invalid'}`}></span>
                                מספר טלפון תקין
                            </div>
                        </div>
                    )}
                </div>
                
                <button 
                    className="buttonForm submit" 
                    onClick={check} 
                    disabled={isSubmitting || !isFormValid()}
                >
                    {isSubmitting ? 'מבצע רישום...' : 'הירשם'}
                </button>
                
                <div className="form-footer">
                    כבר יש לך חשבון? 
                    <Link to="/home/login" className="form-link"> התחבר כאן</Link>
                </div>
            </div>
        </dialog>
    );
};

