import { NavBar } from "../components/navBar/NavBar";
import { Sidebar } from "../components/sidebar/Sidebar"

export function Layout({ children }) {
  return (
    <div>
      <NavBar />
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}

