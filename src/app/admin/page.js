"use client"

import React, { useState, useEffect } from 'react'


const HomePage = props => {
  const [movies,setMovies]=useState([])
  const [token,setToken]=useState(sessionStorage.getItem("adminToken"))
  const [socket,setSocket]=useState(new WebSocket(`ws://localhost:3001/moviesPrincipal?tokenAdmin=${token}`))

  socket.onmessage = event => {

    try{
      const result=JSON.parse(event.data)
      setMovies(result.allMovies)
      console.log(result.allMovies)
    }catch(e){
     console.log(event.data)
    }
   
}

  
  return (
    <div>{
     movies.length!=0?movies.map(x=><h1  key={x}>{x.titleMovie}</h1>):<></>
    }</div>
  )
}


export default HomePage