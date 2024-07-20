import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CameraEvent } from '../models/camera-event.model'


export const cameraApi = createApi({
  reducerPath: 'cameraApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api', 
    
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json;charset=UTF-8"')
      headers.set('Access-Control-Allow-Origin', '*')
      headers.set('Access-Control-Allow-Credentials', 'true')
      headers.set('X-token', sessionStorage.getItem('fbtoken') ?? '')
      return headers
    }
  }),
  endpoints: (builder) => ({
    getCameraEvents: builder.query<CameraEvent[], number>({
       query: (queryArg) => ({ 
        method: 'GET',
        url: `/v2/events/`, 
        params: { limit: queryArg }} ),
    }),
    getCameraEventDetails: builder.query<CameraEvent, string>({
      query: (id) => ({ method: 'GET', url:`/v2/events/${id}`}),
      
    }),
  }),
})


export const { useGetCameraEventsQuery, useGetCameraEventDetailsQuery } = cameraApi