import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import{getAllOrders}from'../../../redux/features/order'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
export default function ViewOrdercustomer() {
    const {id}=useParams()
    const navigate=useNavigate()
    console.log(typeof(id))
    const dispatch=useDispatch()
    const{OrdersDataAll,statusOperationOrder}=useSelector((state)=>state.order)
  const memory=(OrdersDataAll.filter((item)=>item.userId===id))
 useEffect(() => {
  dispatch(getAllOrders())

  
 }, []);

 function formatDollar(num) {
    var p = num?.toFixed(2)?.split(".");
    return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return num + (num != "-" && i && !(i % 3) ? "," : "") + acc;
    }, "") ;
  }
console.log(memory,'memory')
  return (
    <div>
    <StyledOrder>
    {memory.length>0&&<h3 style={{textAlign:'center',color:'blue',fontWeight:'bold'}}>liste de commande pour cet utilisateur</h3>}
           <Button onClick={()=>navigate(-1)}>page precedent</Button>
        
        
        {
             statusOperationOrder==="loading"?<Loading></Loading>:
             <StyledForm>
              {  memory.length===0?<Notfound>il n'ya pas du commande pour le moment à cet utlisateur</Notfound>:(
                <>
                
                {memory?.map((item)=>
                 <Containerstyled>
                          <StyledDate>
                                <p>demandé à:</p><span>{ moment(item?.createdAt).fromNow()}</span>
                                </StyledDate> 
                     {
                        item?.product?.map((pro)=>
                
                         <Styledproduct>
                          
                            <StyledDetail>
                            <p>nom:</p> <span> {pro?.name}</span>
                            </StyledDetail>
                          
                                <StyledDetail>
                                <p>type:</p><span>{pro?.type}</span>
                                </StyledDetail>
                              
                                <StyledDetail>
                              <p>quantité:</p><span>{pro?.quantity}</span>
                                </StyledDetail>
                                <StyledDetail>
                                <p>prix</p><span>{formatDollar (pro?.price*1000)}</span>
                                </StyledDetail>
                              
                                <StyledDetail>
                                <p>total unique:</p><span>{formatDollar((pro?.quantity*pro?.price)*1000)}</span>
                                </StyledDetail>
                              
                         
                            
                         
                          </Styledproduct>
                        
                        )
                     }
                               
                     {
                        item?.amount_subtotal===item?.total?
                        <Price>
                            <p>totale avec livraison gratuite:</p>
                           <span>{formatDollar(item?.amount_subtotal*10)}</span>
                        </Price>
                        :
                        <Price> 
                             <p> totale avec livraison:</p>
                           <span>{formatDollar(item?.total*10)}</span>
                        </Price>

                     }
                    
                    
                     
                      
                
                     
                 </Containerstyled>
                
                )

                }
               
                
                </>

              )
               
              
            }
             </StyledForm>

        }
       
    </StyledOrder>
    </div>
  );
}
const StyledOrder=styled.div`
 padding:20px;
 width:100%;
 height:auto;

`
const StyledForm=styled.div`
display:flex;
align-items:center;
justify-content:space-around;
flex-wrap:wrap;
flex-basis:100%;
`
const Containerstyled=styled.div`
 flex-basis:30%;
 display:flex;
 flex-direction:column;


 border:none;
 height:500px;

 background-color: rgb(16, 84, 143,0.8);
 color:white;
 border-radius:5px;
 margin:10px;
 box-shadow:2px 2px 5px rgb(16, 84, 143,0.5) ,-2px -2px 5px rgb(16, 84, 143,0.2) ;
 overflow-y:auto;
 padding-top:5px;
 padding-left:3px;



`
const Loading=styled.div`
 
 text-align:center;
 margin-top:20px;
 font-size:20px;

`
const Notfound=styled.div`
 text-align:center;
 margin:10px auto;


 font-size:20px;
 color:red;
 letter-spacing:1.17px

`
const Styledproduct=styled.div`
border-bottom:2px solid;
display:flex;
flex-direction:column;
align-items:center;
padding:3px 2px;
p{
   font-weight:bold;
   color: rgb(199, 222, 215);
   padding-right:6px;
}

`
const StyledDetail=styled.div`
display:flex;


`
const StyledDate=styled.div`
display:flex;
padding:5px;
p{
    font-weight:bold;
   color: rgb(199, 222, 215);
   padding-right:6px;
   flex:1;
}
span{
    
   color:whitesmoke;
    font-weight:600;

}


`
const Price=styled.div`
display:flex;
padding:0 5px;
 align-items:center;
 padding-top:20px;
 p{
  flex:1; 

 }
 span{
    font-weight:700;
    font-size:20px;
    height:40px;
 }

`
const Button=styled.div`
position: absolute;
right:38px;
top:80px;
font-size:18px;
cursor: pointer;
background-color: rgb(46, 46, 234);
transition:1s;
&:hover{
background-color:blue;
font-weight:600;
}
margin:5px;
width:150px;
outline:none;
padding:5px 10px ;

 text-align :center;
 color:white;
 border-radius:5px;
 box-shadow:3px 3px 8px rgb(25, 128, 10,0.5),-4px -4px 8px rgb(65, 128, 10,0.3),

`