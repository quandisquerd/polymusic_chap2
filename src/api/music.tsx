import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { pause } from '../util/pause'
const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
}
const musicApi = createApi({
    reducerPath: 'music',
    tagTypes: ['Music'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://node-postgresql-api-lemon.vercel.app/api',
        fetchFn: async (...args) => {
            await pause(1000)
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getMusic: builder.query({
            query: () => ({
                url: `/musics`,
                headers: headers,
                mode: 'cors',
            }),
            providesTags: ['Music'],
        }),
        getOneMusic: builder.query({
            query: (id) => `/musics/${id}`,
            providesTags: ['Music']
        }),
        removeMusic: builder.mutation({
            query: (id) => ({
                url: `/musics/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Music']
        }),
        addMusic: builder.mutation({
            query: (music) => ({
                url: `/musics/add`,
                method: "POST",
                body: music
            }),
            invalidatesTags: ['Music']
        }),
        updateMusic: builder.mutation({
            query: (music) => ({
                url: `/musics/${music.id}`,
                method: "PATCH",
                body: music
            }),
            invalidatesTags: ['Music']
        }),
        search: builder.mutation({
            query: (music) => ({
                url: `/musics/search`,
                method: "POST",
                body: music
            }),
            invalidatesTags: ['Music']
        })
    })
})


export const { useGetMusicQuery, useGetOneMusicQuery, useAddMusicMutation, useUpdateMusicMutation, useRemoveMusicMutation , useSearchMutation} = musicApi
export default musicApi