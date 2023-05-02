import styled from'styled-components';


export  const Mystyle=styled.form`
     max-width:100%;
     width:550px;
     height:300px;
     margin:70px auto;
     padding:25px;
      background-color: rgb(158, 180, 185,0.7);
     box-shadow: -2px -2px 5px  rgb(52, 56, 56,0.3),  5px 5px 10px  rgb(52, 56, 56,0.2) ;
     input,button{
      width:100%;
      height:35px;
       
      border:1px solid  rgb(216, 223, 223);
      border-radius:5px;
      outline:none;
      border:none;
      margin-bottom:10px;
      &:focus{
        border:2px solid blue; 
      }
     }
     border:0.5px solid ;
     border-radius:5px;
     button{
        &:focus{
            border:none;
          
        }
        cursor: pointer;
        background-color: rgb(2, 87, 172); 
       
         text-align:center;
        height:40px;
        color:white;
        border-radius:10px;
        margin-top:10px;
        box-shadow:2px 2px 5px  rgb(52, 56, 56,0.4),-2px -2px 5px  rgb(52, 56, 56,0.4); 
        border:none;
    
        &:hover{
            background-color:  blue ;
        }

     }
     
       label{
        padding-bottom:15px
       }
    

    
     
`;
