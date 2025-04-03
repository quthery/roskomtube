import styles from '../app/styles/button.module.scss'

export function Button({ children, text, onClick, disabled }) {
  return (
    <button 
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      {children || text}
    </button>
  )
}
