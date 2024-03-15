import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import App from "../App";
import DashboardScreen from "../pages/interface/DashboardScreen";
import CatalogueScreen from "../pages/interface/CatalogueScreen";
import NotFoundScreen from "../pages/errors/NotFoundScreen";
import LoginScreen from "../pages/authentication/LoginScreen";
import RegisterScreen from "../pages/authentication/RegisterScreen";
import ProductScreen from "../pages/interface/ProductScreen";
import ProfileScreen from "../pages/user/ProfileScreen";
import EditProductsScreen from "../pages/admin/EditProductsScreen";
import UsersScreen from "../pages/admin/UsersScreen";
import EditSingleProductsScreen from "../pages/admin/EditSingleProductsScreen";
import SingleUserScreen from "../pages/admin/SingleUserScreen";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoute from "./AdminRoutes";

// Create routes with to go to different screens
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      // user interface routes
      <Route index={true} path="/" element={<DashboardScreen />} />
      <Route path="/catalogue" element={<CatalogueScreen />} />
      <Route path="/catalogue/:id" element={<ProductScreen />} />
      // authentication routes
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      // error routes
      <Route path="/not-found" element={<NotFoundScreen />} />
      <Route path="/*" element={<Navigate replace to="/not-found" />} />

      // private routes (user must be logged in)
      <Route path='' element={<PrivateRoutes />}>
        // profile routes
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>

      // admin routes (user must be logged in and have admin role)
      <Route path='' element={<AdminRoute />}>
        // admin routes
        <Route path="/admin/products-list" element={<EditProductsScreen />} />
        <Route path="/admin/products-list/:id" element={<EditSingleProductsScreen />} />
        <Route path="/admin/users" element={<UsersScreen />} />
        <Route path="/admin/users/:id" element={<SingleUserScreen />} />
      </Route>
    </Route>
  )
)

export default router;

// Shopping basket
// Borrowing basket
// Checkout screen
// Payment screen
// Order screen
// My Orders