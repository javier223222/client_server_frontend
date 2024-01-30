"use client"
import { Avatar, Grid, TextField } from '@mui/material'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import React, {  useEffect, useState } from 'react'

import { io } from 'socket.io-client'






const Movie = ({params}) => {
   const [socket,setSocket]=useState(undefined)
   const [message,setMessages]=useState([])
   const [newMessage,setNewMessage]=useState("")
   const [informationMovies,setInformationMovies]=useState({})
   const [portImGE,setPootImage]=useState("")
   const [cartel,setCartel]=useState("")
   
  const search=useSearchParams()
  const idForoMovie=search.get("idForoMovie")

  const handelSubmit=()=>{
    
   socket.emit("message",{tokenuser:sessionStorage.getItem("tokenUser"),men:newMessage},idForoMovie)
  }
  const handleChane=(e)=>{
    setNewMessage(e.target.value)
   }


  


   useEffect(()=>{
    console.log(sessionStorage.getItem("tokenUser"))
    const socket=io("http://localhost:3001/forosmovies",{
      auth:{
        token:sessionStorage.getItem("tokenUser")

      },
      reconnection:true,

    
    })

    
   
    socket.emit("joinRoom",idForoMovie)

    socket.on("message",(data)=>{
      console.log(data)
      setMessages(x=>{
        return [...x,data]
      })

      
    })

    socket.on("joinRoom",(data)=>{
        
        setMessages(data)
      
    })

    setSocket(socket)
    axios.get(`http://localhost:3001/movies/movie?idmovie=${params.idmovie}`,{
      headers:{
        "x-access-token":sessionStorage.getItem("tokenUser")
      }
     }).then((res)=>{
       
       setInformationMovies(res.data.result)
     })

     axios.get(`http://localhost:3001/movies/media?idmovie=${params.idmovie}&type=portada`,{
      headers:{
        "x-access-token":sessionStorage.getItem("tokenUser")
      }
     }).then((res)=>{
      
       setPootImage(res.data.result.urlMovie)
     })
     axios.get(`http://localhost:3001/movies/media?idmovie=${params.idmovie}&type=cartel`,{
      headers:{
        "x-access-token":sessionStorage.getItem("tokenUser")
      }
     }).then((res)=>{
       
       setCartel(res.data.result.urlMovie)
     })
     

   },[])
  return (
    <div>
     <Grid container >
          <Grid item >
          <img style={{
            width:230,
            height:345,
            borderRadius:3
          }} src={cartel} >


          </img>

          </Grid>

          <Grid item>
            <Grid>
              <h1 style={{
                color:"#fff"
              }}>{informationMovies.titleMovie}</h1>
              <p style={{
                color:"#9ab"
              }}>{informationMovies.year}</p>
              <p  
               style={{
                color:"#9ab"
              }}
              >Directed by {informationMovies.nameOfDirector}</p>
            </Grid>
            <Grid>
            <p
             style={{
                color:"#9ab"
              }}
            >
            {informationMovies.descriptionMovie}
            </p>
            

            </Grid>
            <Grid>

            </Grid>

          </Grid>
     </Grid>
     <Grid>
       {
        message.map((x,i)=><Grid key={i}>
        <Grid>
        {x.urlImage?<Avatar src={x.urlImage}></Avatar>:<Avatar sx={{ bgcolor: "red" }}>{x.username[0]}</Avatar>}
        <p style={{
            color:"#9ab"
        }} >Review BY <strong >{x.username}</strong></p>
        </Grid>

        <Grid>
         <p style={{
          color:"#9ab"
         }}>
          {x.message}
         </p>
        </Grid>
         
        </Grid>)
       }
     </Grid>

     <Grid>
     <TextField style={{
      color:"#fff",
      borderColor:"#fff"
     }} name='newMessage' onChange={handleChane} fullWidth label="fullWidth" id="fullWidth" />
     <button style={{
      backgroundColor:"#fff",
     }} onClick={handelSubmit}>send</button>
     </Grid>
    </div>
  )
}

export default Movie