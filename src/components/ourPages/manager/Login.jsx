import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {


    const [user, setUser] = useState({ name: "", password: "" });

    const refDialog = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        refDialog.current.showModal();
    }, []);
    const check=() => {
      if( user.password==="1234"){
          navigate('/manager123/HomeManager')
      
      }
        
    }
    return   <dialog className="dialog" ref={refDialog}>
    <Link className="buttonx" to={'/manager123/HomeManager'}> X</Link>
    {/* <label>שם</label> */}
    <div className="wrapButtons">
        <form>
      
            <input className="buttonForm" placeholder="שם" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} autoFocus="true"></input>
            {/* <label>סיסמא</label> */}
            <input className="buttonForm" placeholder="סיסמא" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} type="password"></input>
            
            <button className="buttonForm submit" onClick={() => check()} disabled={user.name === "" || user.password === "" }>התחברות</button>
        </form>
        </div>

</dialog>

    
}