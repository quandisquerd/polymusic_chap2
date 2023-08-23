import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { pause } from '../util/pause'
const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
}

const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://node-postgresql-api-lemon.vercel.app/api',
        fetchFn: async (...args) => {
            await pause(1000)
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        signin: builder.mutation({
            query: (user: any) => ({
                url: `/users/signin`,
                headers: headers,
                mode: 'cors',
                method: 'POST',
                body: user
            }),
        }),
        signup: builder.mutation({
            query: (user: any) => ({
                url: `/users/signup`,
                headers: headers,
                mode: 'cors',
                method: 'POST',
                body: user
            }),
        }),
    })
})

export const { useSigninMutation, useSignupMutation } = authApi
export default authApi