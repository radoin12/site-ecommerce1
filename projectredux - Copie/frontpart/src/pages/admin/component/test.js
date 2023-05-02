import React from 'react';
import { useGetContactsQuery } from '../../../redux/features/api';
import { useState,useEffect } from 'react';
export default function Test() {
  const[recieve,setRecieve]=useState([])
    const{data,isLoading,isSuccess
    
    }=useGetContactsQuery()

  console.log(data)
    
  return (
    <div>
        {isLoading&&<div className='d-flex justify-content-center mt-5 tetx-danger border-5'>
          loading...
        </div>}
        <h2>test rtk querry</h2>
      {  
             data?.map((data)=>
          <div>
            <p>{data.name}</p>
          </div>
          
          )  }
        
  
</div>
  );
}
