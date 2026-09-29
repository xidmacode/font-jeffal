import { NavLink } from "react-router-dom";

const navigationItems = [
  {
    label: "Tableau de bord",
    path: "/dashboard",
  },
  {
    label: "Produits",
    path: "/products",
  },
  {
    label: "Ventes",
    path: "/sales",
  },
  {
    label: "Dépenses",
    path: "/expenses",
  },
  {
    label: "Dettes",
    path: "/debts",
  },
  {
    label: "Activité",
    path: "/activity",
  },
  {
    label: "Profil",
    path: "/profile",
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span>JËFAL</span>
      </div>

      <nav className="sidebar-navigation">
        {navigationItems.map(
          (item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              {item.label}
            </NavLink>
          )
        )}
      </nav>
    </aside>
  );
}