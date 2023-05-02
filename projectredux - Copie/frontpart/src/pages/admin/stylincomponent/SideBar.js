import React from 'react';
import styled from"styled-components"
import * as FaIcons from'react-icons/fa'
import * as AiIcons from'react-icons/ai'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SideBarData } from './sideBarData';
import SubBarMenu from './subBarMenu';
import'../../../public/style.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart,faBars,faXmark } from '@fortawesome/free-solid-svg-icons'
 import decode from'jwt-decode'

  import { useSelector,useDispatch } from 'react-redux';
   import{ logout}from'../../../redux/features/auth/authSlice'

import { toast, ToastContainer } from 'react-toastify';

  

export default function SideBar() {
  const{quantite}=useSelector((state)=>state.card)
  const {id,image,name,isAdmin}=useSelector((state)=>state.regestration)
  const dispatch=useDispatch()
  const navigate=useNavigate()
 const[toggle,setToggle]=useState(false)
  const showNav=()=>{
    setToggle(!toggle)
  }
 const [showNavs,setShowNavs]=useState(false)
 const toggleNavBar=()=>{
  setShowNavs(!showNavs)
 }

  return (
    <>
    <ToastContainer></ToastContainer>
    <Nav shoping={toggle}>
    
   <NavIcon to='#'>
   { <FaIcons.FaBars className='text-white' onClick={toggleNavBar} />}
    
   </NavIcon>
   <ToggleButton onClick={showNav}>
       
       {!toggle?
       
       <FontAwesomeIcon  icon={faBars}/>:
       <FontAwesomeIcon  icon={faXmark}/>
       
       }
      
      
      </ToggleButton>
   <ALLNavBar shoping={toggle}>
    <InfoUser>
          <Name>
           
           
           <div>{name}</div>
           <Image src={image}/>
        
         </Name>
        <Admin>admin</Admin>
      </InfoUser>


     

                                       
     
    

      
     <OnlineShop to='/' className='shophome' > online shopping products</OnlineShop> 
     
     
   
     <OnlineShop to="/admin" className='shophome'>homePage</OnlineShop>
     
     
     <Shop shoping={toggle}>
        <OnlineShop to="/card"><FontAwesomeIcon icon={faShoppingCart} className='icon'/>
       
        </OnlineShop>
        <Number>
            <div>{quantite}</div>
        </Number>
       
      </Shop>
      <div className='homeuser'>
      
        
      
    
      <OnlineShop  to='profile' >profile</OnlineShop>
     
      
        
        
        
        <Logout  onClick={()=>{
        dispatch(logout())
     
        navigate('/')
       
      }}>  
         
       
         <div to='login'className='shophome'>logout</div>
        
     
      
      </Logout>
        

       </div>
     
       </ALLNavBar>







   
    </Nav>
    <SideNav sidebar={showNavs}>
      <SideWrap>
      <NavIcon to='#'>
   <AiIcons.AiOutlineClose  onClick={toggleNavBar}/>
    </NavIcon>
     {
      SideBarData.map((item,index)=>
      <SubBarMenu data={item} identify={index}/>
      )
     }
      </SideWrap>
    </SideNav>
    
    </>
  );
}


// stylin components
const Nav=styled.div`
*{
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	font-family: "Titillium Web", sans-serif;
}
height: 80px;
display:flex;
justify-content:space-between;
align-items:center;
width:100%;
padding:20px 0;
background-color:black;
@media (max-width: 968px) {

  display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
         height: ${({shoping})=>shoping?'400px':'80px'};
        transition: 1s;
     
        transition-timing-function: ease;
        padding:30px

}

`
const NavIcon=styled(Link)`
color:red;
margin-left:20px;
font-size:30px;
height :80px;
display:flex;
justify-content:flex-start;
align-items:center;
text-decoration:none;
position:relative;
top:0;
left:0;
@media (max-width: 968px) {

top:-20px;
left:-20px

}


`
const SideNav=styled.nav`
background-color:black;
width:250px;
height:100vh;

display:flex;
justify-content:center;
position: fixed;
top:0;
left:${({sidebar})=>sidebar?'0':'-100%'};
transition:350ms;
z-index:10;
`
const SideWrap=styled.div`
width:100%;


`

const InfoUser=styled.div`
    display: flex;
    align-items: center;
    justify-content:flex-start;

    padding-left: 35px;
    color: white;
    margin-top:3px;
    font-family:'Times New Roman', Times, serif;
    font-size:18px;
    letter-spacing:1.17px;
  


    @media (max-width: 968px) {

            border-bottom:2px solid ;
           margin:10px auto;
           padding:10px ;
            text-align:center;
           

}
   
`
const Image=styled.img`

   width: 70px;
    height: 60px;
    max-width: 100%;
    border-radius: 50%;
     margin: 0 5px;
    font-weight: 500;
    font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif
  
 

`
const Name=styled.div`
  
   display: flex;
  align-items: flex-start;

   justify-content: "center";
   

  
`

const ToggleButton=styled.div`

    position: absolute;
        top: 0.75rem;
        right: 1rem;
       color :white;
       font-size:20px;
        justify-content: space-between;
        display:none;
        font-size:25px ;
        @media (max-width: 968px) {

           display:flex

        }




`

const OnlineShop=styled(Link)`

 text-decoration:none;
 color:white;
 padding: 0 20px;
 &:hover{
  color:rgb(155, 250, 255);
 }
 @media (max-width: 968px) {
   text-align:center;
 
   border-bottom:2px solid;
   padding:10px;
   &:hover{
  background-color:gray;
 }


 }

`
const Shop=styled.div`


   display:flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 50px;
 
    font-weight: 700;
    font-size: 20px;
    @media (max-width: 968px) {
      &:hover{
  background-color:gray;
 }
 display: ${({shoping})=>shoping?'flex':'none'};
    margin:0 auto;


 }

`
const Logout=styled.div`
text-decoration:none;
color:white;
transition:0.5s;
cursor: pointer;
&:hover{
  color:skyblue;
}
margin-right:80px;
@media (max-width: 968px) {
  &:hover{
  background-color:red;
  
 }
  padding:10px;
  color:white;
  width:100%
 
 
  

  }

`
const ALLNavBar=styled.div`


 display:flex;
 justify-content:space-between;
 align-items:center;
 width: 100%;
 
 @media (max-width: 968px) {
 display:${({shoping})=>shoping?'flex':'none'};
 flex-direction:column;
 align-items: center;

 }



`





const Number=styled.div`


display: flex;
    align-items: center;
    background-color: rgb(243, 78, 44);
    justify-content: center;
    border-radius: 50%;
   
    width: 30px;
    height: 25px;
     text-align: center;
    color: white;
    margin: 10px ;

    @media (max-width: 968px) {
   
      
 
  

 }


`
const Admin=styled.div`
@media (max-width: 1200px) {
 
   padding:0 60px;
   &:hover{
   color:gray;
 }


 }

`














