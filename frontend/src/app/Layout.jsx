import { NavBar } from "@/widgets/navigation/NavBar";
import { SideBar } from "@/widgets/navigation/SideBar";
import styles from './styles/layout.module.scss';

export function Layout({children}) {
  return (
    <div className={styles.layout}>
      <NavBar />
      <div className={styles.content}>
        <SideBar />
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  )
}
