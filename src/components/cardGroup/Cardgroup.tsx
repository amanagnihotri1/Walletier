import React from 'react';
import style from "../cardGroup/cardgroup.module.scss";
import increaseimg from "../../assets/increase.png";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';
import coinImage from "../../assets/coin.png";
export const Cardgroup = () => {

    const data = [
        {
          name: 'Grocery',
          uv: 4000,
          amount: 2400,
          amt: 2400,
        },
        {
          name: 'Shopping',
          uv: 3000,
          amount: 1398,
          amt: 2210,
        },
        {
          name: 'Daily Essentials',
          uv: 2000,
          amount: 9800,
          amt: 2290,
        },
        {
          name: 'Pag',
          uv: 2780,
          amount: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          amount: 4800,
          amt: 2181,
        },
      ];   
    return (
    <div className={style["cardWrapper"]}>
    <div className={style['incomeTile']}>
    <div className={style['tileIcon']}><img src={coinImage} alt="not_found" />
    </div>   
     <div>Total Income</div>
     <div style={{fontWeight:'600',fontSize:'24px'}}>$ 5460</div>
     <ResponsiveContainer width="100%" height="40%">
        <LineChart width={250} height={60} data={data}>
          <Line type="monotone" dataKey="amount" stroke="#4361ee" strokeWidth={3} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className={style['incomeTile']}>
    <div className={style['tileIcon']}><img src={coinImage} alt="" />
    </div>   
     <div>Total Expenses</div>
     <div style={{fontWeight:'600',fontSize:'24px'}}>$ 5460</div>
     <ResponsiveContainer width="100%" height="40%">
        <LineChart width={250} height={60} data={data}>
          <Line type="monotone" dataKey="amount" stroke="#fb8b24" strokeWidth={3} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className={style['incomeTile']}>
    <div className={style['tileIcon']}><img src={increaseimg} alt="" />
    </div>   
     <div>Saving Goal</div>
     <div style={{fontWeight:'600',fontSize:'24px'}}>$ 5460</div>
    </div>
    </div>
  )
}
