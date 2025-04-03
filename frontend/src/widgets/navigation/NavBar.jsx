import styles from "@/app/styles/navBar.module.scss"
import { NavLink } from "react-router";
import { useState, useEffect } from "react";
import logo from "/logo.png"
import logoText from "/logo-text.png"
import searchIcon from "/search.svg"
import settingsIcon from "/settings.svg"
import notificationsIcon from "/notifications.svg"
import themeIcon from "/theme.svg"

export function NavBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [dots, setDots] = useState("");
  const [currentPhrase, setCurrentPhrase] = useState("");

  const phrases = [
    "Ищу котика в интернете",
    "Гуглю как стать миллионером",
    "Ищу ответ на главный вопрос",
    "Размышляю о смысле жизни",
    "Ищу рецепт счастья",
    "Гуглю как не работать",
    "Ищу где спрятался баг",
    "Размышляю о вечном",
    "Ищу где моя мотивация",
    "Гуглю как стать гением"
  ];

  useEffect(() => {
    if (!isFocused) return;

    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) {
          setCurrentPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
          return "";
        }
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isFocused]);

  return (
    <nav className={styles.box}>
      <div className={styles.box__left}>
        <NavLink to="/" className={styles.box__logoLink}>
          <img className={styles.box__logo} src={logo} alt="Logo" />
          <img className={styles.box__logoText} src={logoText} alt="Logo Text" />
        </NavLink>
      </div>
      
      <div className={styles.box__mid}>
        <input 
          type="text" 
          placeholder={isFocused ? `${currentPhrase}${dots}` : "Поиск..."} 
          className={styles.box__search}
          onFocus={() => {
            setIsFocused(true);
            setCurrentPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
          }}
          onBlur={() => {
            setIsFocused(false);
            setDots("");
          }}
        />
        <button className={`${styles.box__buttonSearch} ${isFocused ? styles.box__buttonSearch_focused : ''}`}>
          <img className={styles.box__buttonSearch__icon} src={searchIcon} alt="Search" />
        </button>
      </div>

      <div className={styles.box__right}>
        <button className={styles.box__roundButton}>
          <img className={styles.box__roundButton__icon} src={settingsIcon} alt="Settings" />
        </button>
        <button className={styles.box__roundButton}>
          <img className={styles.box__roundButton__icon} src={notificationsIcon} alt="Notifications" />
        </button>
        <button className={styles.box__roundButton}>
          <img className={styles.box__roundButton__icon} src={themeIcon} alt="theme" />
        </button>
        <button className={styles.box__youtubeButton}>
          Добавить YouTube API
        </button>
      </div>
    </nav>
  )
}
