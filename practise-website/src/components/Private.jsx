import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const Private = ({children}) => {

    const {token}=useSelector(state=>state)

    if(!token){
        return <Navigate to="/login" />
    }

  return children
}
