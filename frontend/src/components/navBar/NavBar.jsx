import styles from './styles.module.css';
import avatar from '/avatar.jpg'

export function NavBar() {
  return (
    <>
      <nav>
        <div className={styles.logo}>
          <a className={styles.homeLink} href="/">
            <img className={styles.logoImg} src="youtube.svg" alt="logo" />
            <p className={styles.homeText} href="/home" >RoskomTube</p>
          </a>
        </div>
        <div className={styles.centerContent}>
          <div className={styles.searchContainer}>
            <div className={styles.inputSearchContainer}>
              <input className={styles.searchInput} type="text" name="" />
              <button className={styles.searchButton} type="submit">
                <img
                  className={styles.searchImg}
                  src="https://static-00.iconduck.com/assets.00/search-icon-2048x2048-cmujl7en.png"
                  alt="search"
                />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.profileContainer}>
          <label id="switch" className={styles.switch}>
            <input type="checkbox" id="slider" />
            <span className="slider round"></span>
          </label>
          <a className={styles.profileLink} href="#" >
            <img className={styles.profileImg} src={avatar} alt="profile" />
          </a>
        </div>
      </nav>
    </>
  );
}

