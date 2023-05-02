import React from 'react';
import styled from'styled-components'
export default function Widget({data}) {
  return (
    <div>
      <StyledWidget >
       <Icons color={data.color} bgColor={data.bagroundColor}>
       { data.icon}
       </Icons>
       <Text>
        <h3>
           { 
           data.numbers
        }
        </h3>
        <p>{data.title}</p>
       </Text>
      
        {
           
        data.percentage<0
        ?<>
         <Percentage isPositive={false}>{Math.floor(data.percentage)+"%"}</Percentage>
        </>
        :<>
         <Percentage isPositive={true}>{Math.floor(data.percentage)+"%"}</Percentage>
        </>
           
        }
     
      </StyledWidget>
    </div>
  );
}


const StyledWidget=styled.div`
display: flex;
align-items:center;
justify-content:space-between;

@media (max-width: 700px) {
display:flex;
justify-content:center;


}
`
const Icons=styled.div`
margin-right: 15px;
padding:5px;
border-radius:3px;
font-size:20px;
color:${({color})=>color};
background-color:${({bgColor})=>bgColor};


`
const Text=styled.div`
   padding:5px;

`
const Percentage=styled.div`

margin-left:5px;
font-size: 18px;
color:${({isPositive})=>isPositive?'rgb(25, 149, 6)':'rgb(235, 43, 43)'};
font-weight:800;

`