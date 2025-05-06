import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GetCostumerByIdThunk } from "../../../redux/slices/costumers/GetCostumerByIdThunk";
import { AddCustomersThunk } from "../../../redux/slices/costumers/AddCustomersThunk";
import { GetCostumersThunk } from "../../../redux/slices/costumers/GetCostumersThunk";
import { setCurrentCust, setcustCameFrom } from "../../../redux/slices/costumers/CostumerSlice";
import { getProductsThunk } from "../../../redux/slices/products/GetAllProductsThunk";
import { GetProductsByIdThunk } from "../../../redux/slices/products/GetProductsByIdThunk";

export const LoginCust = () => {
    const navigate = useNavigate();
    const costumers = useSelector(state => state.costumers.costumersList);
    const isLoadingCust = useSelector(state => state.costumers.loading);
    const dispatch = useDispatch();
    const status = useSelector(state => state.costumers.status);
    const [user, setUser] = useState({ id: "", name: "", address: "", telephone: "" });
    const [showNotExsists, setShowNotExsists] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const custCameFrom = useSelector(state => state.costumers.custCameFrom);
    const catt = useSelector(state => state.cattegory.cattagoryList);
    const refDialog = useRef();

    useEffect(() => {
        refDialog.current.showModal();
        if (catt.length > 0) dispatch(GetCostumersThunk());
    }, []);

    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;

        if (!user.name.trim()) {
            tempErrors.name = "שם משתמש נדרש";
            isValid = false;
        }

        if (!user.id.trim()) {
            tempErrors.id = "סיסמה נדרשת";
            isValid = false;
        } else if (user.id.length < 1) {
            tempErrors.id = "סיסמה חייבת להכיל לפחות 1 תווים";
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

        var exists = 0;
        var flag = false;
       
        
        costumers.map((c) => {
            if (c.id === user.id && c.name === user.name) {
                exists = 5;
                flag = true;
            }
        });

        if (flag) {
            dispatch(setCurrentCust(user));
            navigate(`/home`);
        }
        
        if (exists === 0) {
            setShowNotExsists(true);
            setIsSubmitting(false);
        }
        
        if (custCameFrom !== "") {
            dispatch(GetProductsByIdThunk(custCameFrom.substring(28)));
            navigate(custCameFrom);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && user.name && user.id) {
            check();
        }
    };

    return (
        <dialog className="dialog" ref={refDialog} onKeyPress={handleKeyPress}>
            <Link className="buttonx" to={/* custCameFrom!== ""?navigate('/home/products'): */'/home'}   > X</Link>
            
            <h2 className="form-title">התחברות</h2>
            <p className="form-subtitle">ברוכים הבאים! אנא התחברו כדי להמשיך</p>
            
            <div className="wrapButtons">
                <div className="input-group">
                    <input 
                        className={`buttonForm ${errors.name ? 'error' : ''}`} 
                        placeholder="שם משתמש" 
                        value={user.name} 
                        onChange={e => {
                            setUser({ ...user, name: e.target.value });
                            setShowNotExsists(false);
                            if (errors.name) {
                                const { name, ...rest } = errors;
                                setErrors(rest);
                            }
                        }}
                        autoFocus
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
                            setShowNotExsists(false);
                            if (errors.id) {
                                const { id, ...rest } = errors;
                                setErrors(rest);
                            }
                        }} 
                        type="password"
                    />
                    {errors.id && <div className="error-text">{errors.id}</div>}
                </div>
                
                <button 
                    className="buttonForm submit" 
                    onClick={check} 
                    disabled={isSubmitting || !user.name || !user.id}
                >
                    {isSubmitting ? 'מתחבר...' : 'התחברות'}
                </button>
                
                {showNotExsists && 
                    <div className="error-text">
                        לקוח לא קיים. יתכן שיש שגיאה בנתונים או שהנך משתמש חדש
                    </div>
                }
                
                <div className="form-footer">
                    משתמש חדש? 
                    <Link 
                        to="/home/logon" 
                        className="form-link" 
                        onClick={() => dispatch(setCurrentCust(user))}
                    > הירשם עכשיו
                    </Link>
                </div>
            </div>
        </dialog>
    );
};
