import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const baseQuery=fetchBaseQuery({baseUrl:'https://user-management-backend-cn9a.onrender.com'})
export const apiSlice=createApi({
    baseQuery,
    tagTypes:['User'],
    endpoints:(builder)=>({})
})