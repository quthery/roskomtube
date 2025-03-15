import style from './styles.module.css'


export function Sidebar() {
  return <>
    <div className={style.sidebar}>
      <a className={style.sidebarLink} href="#home">
        <img
          className={style.sidebarImg}
          src="https://www.svgrepo.com/show/22031/home-icon-silhouette.svg"
          alt="logo"
        />
      </a>
      {/* this link for youtube shorts */}
      <a className={style.sidebarLink} href="#shorts">
        <img
          className={style.sidebarImg}
          src="https://www.svgrepo.com/show/34825/short-pants.svg"
          alt="logo"
        />
      </a>
      <a className={style.sidebarLink} href="#history">
        <img
          className={style.sidebarImg}
          src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/history-line-icon.png"
          alt="logo"
        />
      </a>
      <a className={style.sidebarLink} href="https://github.com/quthery/roskomtube">
        <img
          className={style.sidebarImg}
          src="https://cdn.freebiesupply.com/logos/large/2x/github-icon-1-logo-black-and-white.png"
          alt="logo"
        />
      </a>
    </div>
  </>
}
