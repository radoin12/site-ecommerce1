 import{createApi,fetchBaseQuery} from'@reduxjs/toolkit/query/react'

  export const apiSlice=createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3000'}),
    endpoints:(builder)=>({
       getContacts:builder.query({
        query: () =>'/displayBook',
      }),
    })
 })



 export const{useGetContactsQuery}=apiSlice