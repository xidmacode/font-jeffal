import { NavLink } from "react-router-dom";

const navigationItems = [
  {
    label: "Accueil",
    path: "/dashboard",
  },
  {
    label: "Ventes",
    path: "/sales",
  },
  {
    label: "Stock",
    path: "/products",
  },
  {
    label: "Dettes",
    path: "/debts",
  },
  {
    label: "Plus",
    path: "/activity",
  },
];

export default function MobileNavigation() {
  return (
    <nav className="mobile-navigation">
      {navigationItems.map(
       (item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "mobile-nav-link active"
                : "mobile-nav-link"
            }
          >
            {item.label}
          </NavLink>
        )
      )}
    </nav>
  );
}