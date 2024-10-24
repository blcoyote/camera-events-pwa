import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CameraEvent } from '../models/camera-event.model'

const API_URL = import.meta.env.VITE_BaseURL

export const cameraApi = createApi({
  reducerPath: 'cameraApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${API_URL}/api`, 
    
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json;charset=UTF-8"')
      headers.set('Access-Control-Allow-Origin', '*')
      headers.set('Access-Control-Allow-Credentials', 'true')
      headers.set('x-token', sessionStorage.getItem('fbtoken') ?? '')
      return headers
    }
    
  }),
  tagTypes: ['CameraEvents'],
  endpoints: (builder) => ({
    getCameraEvents: builder.query<CameraEvent[], number>({
       query: (queryArg) => ({ 
        method: 'GET',
        url: `/v2/events/`, 
        params: { limit: queryArg }} ),
        providesTags: ['CameraEvents']
    }),
    getCameraEventDetails: builder.query<CameraEvent, string>({
      query: (id) => ({ method: 'GET', url:`/v2/events/${id}`}),
      providesTags:['CameraEvents'],
    }),
    
  }),
  
})


export const { useGetCameraEventsQuery, useGetCameraEventDetailsQuery } = cameraApi