import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';

export const Login = () => {
    const [user, setUser] = useState({ name: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const refDialog = useRef();
    const navigate = useNavigate();
    
    useEffect(() => {
        refDialog.current.showModal();
    }, []);
    
    const handleClose = () => {
        refDialog.current.close();
        navigate('/manager123/HomeManager');
    };
    
    const check = () => {
        setIsLoading(true);
        setError("");
        
        // Simulate API call
        setTimeout(() => {
            if (user.password === "1234") {
                navigate('/manager123/HomeManager');
            } else {
                setError("שם משתמש או סיסמה שגויים");
                setIsLoading(false);
            }
        }, 800);
    };
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && user.name !== "" && user.password !== "") {
            check();
        }
    };
    
    return (
        <dialog className="login-dialog" ref={refDialog} onKeyDown={handleKeyDown}>
            <div className="login-container">
                <div className="login-header">
                    <button className="close-button" onClick={handleClose}>
                        <CloseIcon />
                    </button>
                    <h2 className="login-title">התחברות למערכת ניהול</h2>
                </div>
                
                <div className="login-logo">
                    <img src="/logo.png" alt="Logo" className="login-logo-image" />
                </div>
                
                <div className="login-form">
                    <div className="input-group">
                        <div className="input-icon">
                            <PersonOutlineOutlinedIcon />
                        </div>
                        <input 
                            className="login-input" 
                            placeholder="שם משתמש" 
                            value={user.name} 
                            onChange={e => setUser({ ...user, name: e.target.value })} 
                            autoFocus
                        />
                    </div>
                    
                    <div className="input-group">
                        <div className="input-icon">
                            <LockOutlinedIcon />
                        </div>
                        <input 
                            className="login-input" 
                            placeholder="סיסמה" 
                            value={user.password} 
                            onChange={e => setUser({ ...user, password: e.target.value })} 
                            type="password"
                        />
                    </div>
                    
                    {error && <div className="login-error">{error}</div>}
                    
                    <button 
                        className={`login-button ${isLoading ? 'loading' : ''}`} 
                        onClick={check} 
                        disabled={user.name === "" || user.password === "" || isLoading}
                    >
                        {isLoading ? 'מתחבר...' : 'התחברות'}
                    </button>
                    
                    <div className="login-help">
                        <a href="#" className="forgot-password">שכחתי סיסמה</a>
                    </div>
                </div>
            </div>
        </dialog>
    );
};
