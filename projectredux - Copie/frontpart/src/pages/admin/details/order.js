import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components'
import{ getCommand}from'../../../redux/features/auth/recievestorepayment'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
export default function OrderView() {
    const {id}=useParams()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {recieveStatus,recieveCommond}=useSelector((state)=>state.command)
 
     
 
    console.log(recieveCommond,'order')
    useEffect(()=>{
    dispatch(getCommand(id))
    },[dispatch])
    function formatDollar(num) {
        var p = num?.toFixed(2)?.split(".");
        return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
            return num + (num != "-" && i && !(i % 3) ? "," : "") + acc;
        }, "") ;
      }
      
    
  return (
    <div>
     <StyledOrder>
        {
            recieveStatus==="loading"?(<p>...loading</p>):(
                <>
                 <OrderContainer>
                    <Section>
                     <p> etat de livraison:</p>{
                        recieveCommond.delevryStatus==="pending"?
                        <Pending>en attente</Pending>:
                        recieveCommond.delevryStatus==="dispatched"?
                        <Dispatched>envoyé</Dispatched>:
                        recieveCommond.delevryStatus==="delivered"?
                        <Delivered>livré</Delivered>:'error'

                      }

                    </Section>
                   <h3>carareterisque de commande</h3>
                   <Items>
                  {  
                  recieveCommond?.product?.map((pro,index)=>
                     
                  <Item key={index}>
                    <div>
                    <p>nom du produit:</p> <span>{pro.name}</span>
                    </div>
                    <div>
                    <p>type:</p> <span>{pro?.type}</span>
                    </div>
                    <div>
                    <p>quantité:</p><span>{pro?.quantity}</span>
                    </div>
                    <div>
                    <p>prix:</p><span>{ formatDollar(pro?.price*1000)}</span>
                    </div>
                  
                   
                    
                   
                
                  </Item>

                  )
                  
                  }
                   </Items>
                   { 
                   recieveCommond?.amount_subtotal!==recieveCommond.total&&
                  
                   <>
                   <Section>
                   <p>prix avec livraison </p> <span>{formatDollar(recieveCommond?.total*10)}</span>
                   </Section>
                   
                   </>
                   
                   }
                   <Section>
                
                     <p>prix avec livraison gratuite</p> <span>{formatDollar (recieveCommond?.amount_subtotal*10)}</span>
                   </Section>
                   <div>
                    <h3>information du client</h3>
                    <p> nom: {recieveCommond?.shipping?.name}</p>
                    <p>email:{recieveCommond?.shipping?.email}</p>
                    <p>telephone{recieveCommond?.shipping?.phone}</p>
                   </div>
                   <StyleButton onClick={()=>navigate(-1)}>go back</StyleButton>
                 </OrderContainer>
                </>
            )

        }
     </StyledOrder>
    </div>
  );
}
const Section=styled.div`
display:flex;
align-items:center;
p{
    flex:1;
}
span{
  font-weight:bold  
}
`
const StyledOrder=styled.div`
 margin:3rem;
 display:flex;
 justify-content:center;
 h3{
   text-align:center;
   color:gray;
   font-weight:bold;
 }

`
const OrderContainer=styled.div`
 max-width:500px;
 width:100%;
 height:auto;
 border-radius:5px;
  box-shadow:rgb(42, 156, 7,0.3) 0px 5px 18px 0px;
  padding:20px;



`

const Items=styled.div`
 span{
    color:'black';
    margin-right:15px;
    &:first-child{
        font-weight:bold;
    }
 }

`
const Item=styled.div`
div{
    display:flex;
    justify-content:center
}
p{
    padding-right:10px
}

`
const Pending=styled.div`
background-color:orange;
background:rgb(245, 183, 69,0.17);
border-radius:5px;
font-size:14px;
padding:5px 10px


`
const Dispatched=styled.div`
background-color:rgb(79, 140, 13);

border-radius:5px;
font-size:17px;
padding:5px 10px;
font-weight:700;

`
const Delivered=styled.div`

background-color:rgb(122, 61, 178);
border-radius:5px;
font-size:17px;
padding:5px 20px;
font-weight:700;
 
`
const StyleButton=styled.button`
 background-color:rgb(71, 71, 227);
 color:white;
 outline:none;
 border-radius:5px;
 transition:1s;
  &:hover{
    background-color: blue;
  }
 text-align:center;
  margin-left:180px;
 width:130px;
 

`