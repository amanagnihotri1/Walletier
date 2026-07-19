import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './mainpage.module.scss';
export const Main = () => {
  const navigate=useNavigate();
  return (
    <>
    <section className={styles["mainWrapper"]}>  
    <div className={styles['wrapper1']}>
    <span className={styles["headText"]}>
   Walletier
    </span>
    <p className={styles["subtext"]}>
      Your Personal Finance Tracker—Simple,Smart,and Secure.
    </p>
    <div className={styles["wrapper2"]}>
    <button type='button' className={styles['userButton']} onClick={()=>navigate("/auth/signup")}>Signup</button>
    <button type="button" className={styles['loginBtn']} onClick={()=>navigate("/auth/login")}>Login</button>
    </div>
    </div>
    </section>
    </>
  )
}
