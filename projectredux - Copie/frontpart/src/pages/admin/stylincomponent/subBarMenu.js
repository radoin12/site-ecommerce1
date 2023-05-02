import React from 'react';
import styled from'styled-components'
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function SubBarMenu({data,identify}) {

    const[subNav,setSubNav]=useState(false)

    const showSubNav=()=>{
        setSubNav(!subNav)
    }
  return (
    <div>
      <SubLinkMenu to={data.path&&data.path} key={identify} onClick={showSubNav}>
      <FixedIcon>
        {data.icon}
        <SideBarLabel>
            {data.title}
        </SideBarLabel>
        <IconTest>
           {
            data.subNav&&subNav
            ?data.iconOpen
            :data.subNav
            ?data.iconClosed
            :null
           }
        </IconTest>
      </FixedIcon>
      </SubLinkMenu>
       {data.subNav&&
        data.subNav.map((item,index)=>
        <DropDownLink to={item.path} subNavs={subNav} key={index}>
         {item.icon}
         <LabelTitle>{item.titles}</LabelTitle>
        </DropDownLink>
        )

       }
    </div>
  );
}

const SubLinkMenu=styled(Link)`
margin:0 20px ;
display: flex;
color:white;
justify-content:space-between;
align-items:center;
padding:20px;
list-style:none;
height:60px;
text-decoration:none;
font-size:18px;
&:hover{
    background-color:gray;
    border-left:4px solid white;
    cursor: pointer;
    color:white;
    
}

`
const SideBarLabel=styled.div`
padding-left:16px;
`

const FixedIcon=styled.div`

display:flex;
justify-content:space-between;
align-items:center;
`
const IconTest=styled.div`
margin-left:50px;
`
const DropDownLink=styled(Link)`
text-decoration:none;
height:60px;

justify-content:center;
display:${({subNavs})=>subNavs?'flex':'none'};
transition:2s;
align-items:center;
color:white;
padding:3px;
font-size:20px;
&:hover{
    background-color:rgb(44, 123, 213);
    color:beige;
   
}
`
const LabelTitle=styled.div`
 padding:0 10px

`