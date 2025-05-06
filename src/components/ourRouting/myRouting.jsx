
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../ourPages/customer/home";
import { Login } from "../ourPages/manager/Login";
import { ManagerHome } from "../ourPages/manager/ManagerHome";
import { Sniffim } from "../ourPages/manager/sniffim";
import { Products1 } from "../ourPages/manager/products";
import { Costumer } from "../ourPages/manager/customers";
import { Products } from "../ourPages/customer/products";
import { LoginCust } from "../ourPages/customer/LoginCust";
import { ProductsMain } from "../ourPages/customer/productsMain";
import { Favorate } from "../ourPages/customer/favorate";
import { Cart } from "../ourPages/customer/cart";
import { Orders } from "../ourPages/customer/orders";
import { LogonCust } from "../ourPages/customer/LogonCust";
import { OrderDetails } from "../ourPages/customer/OrderDetails";
import { OrderM } from "../ourPages/manager/orders";
import { Instructions } from "../ourPages/manager/instrucyions";

export const Routing = () => {

    return <>
        <Routes>
            <Route path={''} element={<Navigate to="/home" />} />
            <Route path={'/home'} element={<Home />} >
                <Route path={'products'} element={<Products />} />
                <Route path={'showCart'} element={<Cart />} />
                <Route path={'showOrders'} element={<Orders />} >
                    {/* <Route path={':orderId'} element={<OrderDetails />} /> */}
                </Route>
                <Route path={'showLove'} element={<Favorate />} />
                <Route path={'products/productsMain/:id'} element={<ProductsMain />} />
                <Route path={'login'} element={<LoginCust />} />
                <Route path={'logon'} element={<LogonCust />} />
            </Route>
            <Route path={'/manager123'} element={<Login />} />
            <Route path={'/manager123/HomeManager'} element={<ManagerHome />} >
                <Route path={'sniffim'} element={<Sniffim />} />
                <Route path={'products'} element={<Products1 />} />
                <Route path={'costumer'} element={<Costumer />} />
                <Route path={'instructions'} element={<Instructions />} />

                <Route path={'order'} element={<OrderM />} />

            </Route>
        </Routes>
    </>
}


