import { collectionRef } from "../components/Transactions/Transactions";
import { getDocs,deleteDoc} from "firebase/firestore";
import { where,query } from "firebase/firestore";
export const incomeColor=['#123123','#154731', '#165f40','#16784f','#14915f', '#10ac6e','#04e38d'];
export const expenseColor=['#9b2226','#003049','#ffd60a','#f4f0bb','#708d81','#9d8189','#f35b04'];
export const incomeCategories:string[] = ['Business','Investments','Extra income','Deposits','Gifts','Salary','Miscellaneous'];
export const expenseCategories:string[] = ["Bills","Shopping", "Travel","Food","Entertainment","Daily Needs","Others" ];
export const getColor=(val:string):string=>
{
  expenseCategories.includes(val);
    let idx=expenseCategories.indexOf(val);
    return expenseColor[idx];
}
export const handleDelete=async(id:string)=>
{
  const docRef = query(collectionRef,where("tid","==",id));
  const docSnap=await getDocs(docRef);
  docSnap.forEach((doc)=>
  {
    deleteDoc(doc.ref);
    console.log("deleted doc with id:",id);
  });

}

// export const categoryWiseExpense=async(val:string,authUsername:string)=>
// {
//   let items:[]=[];
//   const categData=query(collectionRef,where("category","==",val),where("uid","==",authUsername));
//   const getData=await getDocs(categData);
//   getData.forEach((doc:any)=>
//   {
//     items.push(doc.data())
//   })
// return items;
// }
