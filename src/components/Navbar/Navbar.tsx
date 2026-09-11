import { Button } from '@mantine/core';
import style from "../../components/Navbar/navbar.module.scss";
import { useNavigate } from 'react-router-dom';
import brandLogo from "../../assets/wallet.png";
import userlogo from "../../assets/user_image.png";
import { useDispatch } from 'react-redux';
import { clearAuthDetails } from '../../Auth/authSlice';
import apiCall from '../../utils/apiService';

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const HandleLogout = async () => {
    await apiCall('GET', '/auth/logout');
    navigate("/welcome");
    dispatch(clearAuthDetails());
    localStorage.clear();
  }; 
  const userName= localStorage.getItem("fullName");
  const userprofile=userlogo || localStorage.getItem("profileImage");
  return (
      <div className={style["menuList"]}>
        <div className={style['linkWrapper']}>
        <div className={style["logoWrapper"]}>
        <div className={style["logoimgwrapper"]}>
        <img src={brandLogo} alt="not_found" />
        </div>
        <h4
        style={{fontWeight:'600',textOverflow:"clip",overflow:'hidden'}}
        >Walletier</h4>
        </div>
     </div>
     <div className={style["roundedButton"]}>
      {userName && <div className={style["group"]}>
      <div className={style["usericon"]}>
    <img src={userprofile || " "} alt="not_found" />
    </div>
    <h3>{userName}</h3>
    </div>}
    <Button variant="filled" color="violet" style={{width:'100%',borderRadius:'24px'}} onClick={HandleLogout}>Logout</Button>
    </div>
     </div> 
  )
}
