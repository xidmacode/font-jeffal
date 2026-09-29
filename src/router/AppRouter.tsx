import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";

import Products from "../pages/Products/Products";
import ProductDetails from "../pages/Products/ProductDetails";

import Sales from "../pages/Sales/Sales";
import CreateSale from "../pages/Sales/CreateSale";

import Expenses from "../pages/Expenses/Expenses";
import CreateExpense from "../pages/Expenses/CreateExpense";

import Debts from "../pages/Debts/Debts";
import DebtDetails from "../pages/Debts/DebtDetails";

import Activity from "../pages/Activity/Activity";

import Profile from "../pages/Profile/Profile";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ========================= */}
        {/* ROUTES PUBLIQUES           */}
        {/* ========================= */}

        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route
              path="/login"
              element={<Login />}
            />
          </Route>
        </Route>


        {/* ========================= */}
        {/* ROUTES PROTÉGÉES           */}
        {/* ========================= */}

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            {/* PRODUITS */}
            <Route
              path="/products"
              element={<Products />}
            />

            <Route
              path="/products/:id"
              element={<ProductDetails />}
            />

            {/* VENTES */}
            <Route
              path="/sales"
              element={<Sales />}
            />

            <Route
              path="/sales/create"
              element={<CreateSale />}
            />

            {/* DÉPENSES */}
            <Route
              path="/expenses"
              element={<Expenses />}
            />

            <Route
              path="/expenses/create"
              element={<CreateExpense />}
            />

            {/* DETTES */}
            <Route
              path="/debts"
              element={<Debts />}
            />

            <Route
              path="/debts/:id"
              element={<DebtDetails />}
            />

            {/* ACTIVITÉ */}
            <Route
              path="/activity"
              element={<Activity />}
            />

            {/* PROFIL */}
            <Route
              path="/profile"
              element={<Profile />}
            />

          </Route>
        </Route>


        {/* ========================= */}
        {/* ROUTE PAR DÉFAUT           */}
        {/* ========================= */}

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        {/* ========================= */}
        {/* PAGE INEXISTANTE           */}
        {/* ========================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}