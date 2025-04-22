import logo from '/logo.png'
import styles from './LogoCycle.module.scss'

export default function LogoCycle() {
  return (
    <div className={styles.logoContainer}>
      <img src={logo} alt="Logo" className={styles.spinningLogo} />
    </div>
  );
}
