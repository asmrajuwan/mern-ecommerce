import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AdminRoute from "./components/Layout/routes/AdminRoute";
import PrivateRoute from "./components/Layout/routes/Private";
import About from "./pages/About";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminOrders from "./pages/Admin/AdminOrders";
import CraeteCategory from "./pages/Admin/CraeteCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Users from "./pages/Admin/Users";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import CartPage from "./pages/CartPage";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import Contact from "./pages/Contact";
import HomePage from "./pages/HomePage";
import Inventory from "./pages/Inventory";
import PageNotFound from "./pages/PageNotFound";
import Policy from "./pages/Policy";
import ProductDetails from "./pages/ProductDetails";
import Search from "./pages/Search";
import Dashboard from "./pages/user/Dashboard";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:slug" element={<ProductDetails />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/category/:slug" element={<CategoryProduct />} />
                <Route path="/search" element={<Search />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/dashboard" element={<PrivateRoute/>}>
                    <Route path="user" element={<Dashboard/>} />
                    <Route path="user/orders" element={<Orders/>} />
                    <Route path="user/profile" element={<Profile/>} />
                </Route>
                <Route path="/dashboard" element={<AdminRoute/>}>
                    <Route path="admin" element={<AdminDashboard/>} />
                    <Route path="admin/create-category" element={<CraeteCategory/>} />
                    <Route path="admin/create-product" element={<CreateProduct/>} />
                    <Route path="admin/product/:slug" element={<UpdateProduct/>} />
                    <Route path="admin/products" element={<Products/>} />
                    <Route path="admin/users" element={<Users/>} />
                    <Route path="admin/orders" element={<AdminOrders/>} />
                </Route>
                <Route path="/register" element={<Register/>} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/contact" element={<Contact/>} />
                <Route path="/policy" element={<Policy />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    );
}

export default App;
