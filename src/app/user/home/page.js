"use client"
import { Container, Grid, Paper } from '@mui/material'
import axios from 'axios'
import { useRouter} from 'next/navigation'

import React, { useEffect, useState } from 'react'


const HomepageUser = props => {
  const [movies,setMovies]=useState([])
  const [token,setToken]=useState(sessionStorage.getItem("tokenUser"))
  const [socket,setSocket]=useState(new WebSocket(`ws://localhost:3001/moviesPrincipal?tokenUser=${token}`))
  const router=useRouter()
  socket.onmessage = event => {

    try{
      const result=JSON.parse(event.data)
      setMovies(result.allMovies)
      console.log(result.allMovies)
    }catch(e){
     console.log(event.data)
    }

   
}
useEffect(()=>{
  axios.get("http://localhost:3001/movies",{
    headers:{
      "x-access-token":sessionStorage.getItem("tokenUser")
    }
  }).then((res)=>{
    setMovies(res.data.movies)
  })
},[])


const navigateTo=(id,idfor)=>{
  router.push(`home/movie/${id}?idForoMovie=${idfor}`)
}

  return (
    <div>
    <Container  maxWidth="sm" >

      <Grid container spacing={9}>
      {
     movies.length!=0?movies.map((x,i)=>  <Grid  key={i} item xs={4}>
          <img onClick={()=>navigateTo(x.idmovie,x.idForoMovie)} style={{
            height: 140,
                  width: 100,
        }} src={x.urlMovie}></img>
       
     </Grid>):<></>
    }


      </Grid>
    </Container>
    
    </div>
  )
}



export default HomepageUser