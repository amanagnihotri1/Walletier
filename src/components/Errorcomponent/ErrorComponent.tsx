import React, { Fragment } from 'react'
import errorgif from "../../assets/Empty.gif";
import styles from "../Errorcomponent/error.module.scss";
import { Link } from 'react-router-dom';
export const ErrorComponent = () => {
  return (
    <>
     <h1 style={{
        textAlign:"center",
        fontSize:'3.4rem',
        color:"#00b4d8",
        marginTop:"10px"    
    }}>
      404
      </h1>
        <p style={{
          fontSize:"20px",
          textAlign:'center'
          }}>
          This is not the page you're looking for.
          </p>
      <div style={{
        display:"flex",
        width:'100%',
        flexDirection:"column",
        justifyContent:"center"
        }}>
      <img 
      src={errorgif} 
      className={styles["errorimage"]} 
      alt="not found"/>
      <Link className={styles["buttonStyle"]} to={localStorage.getItem("uid")?`/user/${localStorage.getItem("uid")}`:`/welcome`}>Back to Home</Link>
      </div>
    </>
  )
}
