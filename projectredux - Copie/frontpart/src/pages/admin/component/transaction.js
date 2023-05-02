import React, { useEffect } from 'react';
import{getAllOrder} from'../../../redux/features/order'
import { useDispatch,useSelector } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment'
export default function Transaction() {
 const {allOrderData,allOrderStatus}=useSelector((state)=>state.order)
 const dispatch=useDispatch()
 console.log(allOrderData,"myorder")
 useEffect(()=>{
    dispatch(getAllOrder())
 },[dispatch])
 function formatDollar(num) {
    var p = num?.toFixed(2)?.split(".");
    return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return num + (num != "-" && i && !(i % 3) ? "," : "") + acc;
    }, "");
  }
  return (
    <div>
     <StyledTransaction>
        {allOrderStatus==="loading"?<Para>...transaction loading</Para>
        :<div>
        <h2>transfert argent</h2>
         { allOrderData.length>0&&<Title>
            <h3>nom du client</h3>
            <h3>prix du commande</h3>
            <h3>date</h3>

          </Title>}
         {
            allOrderData?.map((item,index)=>
             <Transactions key={index}>
               <p>{item.shipping.name}</p> 
               <p>{formatDollar(item.total*10)}</p> 
               <p>{moment(item.createdAt).fromNow()}</p>
              
             </Transactions>
            )
         }
        </div>
        
        }
     </StyledTransaction>
    </div>
  );
}
const StyledTransaction=styled.div`

box-shadow:2px 2px 5px rgb(55, 49, 49,0.4) ,-2px -2px 5px rgb(55, 49, 49,0.3);
background-color:rgb(19, 16, 16);
color:white;
border-radius:15px;
padding:1rem;
margin:10px;
h2{
    text-align:center;
    color: rgb(162, 251, 221);
    background-color:rgb(162, 251, 221,0.17);
}
@media (max-width: 700px) {

width:100%;
padding:0;
margin:20px 0


}
`
const Para=styled.div``

const Transactions=styled.div`
  display:flex;
  border-radius:3px;
  font-size:15px;
  margin-top:10px;
  padding:10px  ;
 
  background-color: rgb(147, 89, 59,0.4);
  p{
    flex:1;
    padding:0 10px;
  

  };
  &:nth-child(even){
    background-color:rgb(19, 16, 16,0.17);
  }
  @media (max-width: 1300px) {
p{
    padding:0 70px
}
}
@media (max-width: 700px) {

p{
    padding:0 20px
}


}


`
const Title=styled.div`
padding:15px;
display:flex;
background-color:green;
h3{
    font-size:15px;
    padding:0 5px;
    &:last-child{
        padding-left:20px
    }
}
@media (max-width: 1300px) {

 display:flex;
 justify-content:space-around;
 h3{
    padding-right:80px
 }

}


`