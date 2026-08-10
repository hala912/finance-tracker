
import { NavLink } from "react-router-dom";

export function Navbar (){

    const navbarItems = [
        {label: "Dashboard", path: "/"},
        {label: "Transactions", path: "/transaction"},
        {label: "Budget", path: "/budget"},
    ];

    
     return(
    
      <header className="flex items-center justify-between border-b border-stone-200 bg-white px-8 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-sm font-semibold text-white">
            S
          </div>
          <span className="text-lg font-semibold text-stone-800">
            SaaSBrian
          </span>
        </div>
        <nav className="flex items-center gap-8 text-sm font-medium text-stone-500">
          {navbarItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="cursor-pointer hover:text-stone-800"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        {/* TODO: wire this to auth signOut() from AuthContext */}
        <button className="text-sm font-medium text-stone-500 hover:text-stone-800">
          Log out
        </button>
      </header>
)
}
