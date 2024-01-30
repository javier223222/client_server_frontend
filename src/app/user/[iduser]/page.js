"use client"
import { Avatar, Grid } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const HomeUser = ({params}) => {
    const [iduser,setIduser]=useState(null)
    const [imageUser,setImageuser]=useState(null)
    const [personal,setPersonaldata]=useState(null)
    const [idImagen,setIdImagen]=useState(null)
    const [image,setImage]=useState(null)
    const [newImagen,setNewImagen]=useState(null)
    const [bio,setBio]=useState(null)
    const submitImage=(e)=>{
      setImageuser(URL.createObjectURL(e.target.files[0]))
    }
    useEffect(()=>{
       setIduser(params.iduser)
       axios.get(`http://localhost:3001/profile/user/getUsername?iduser=${params.iduser}`,{
        headers:{
            "x-access-token":sessionStorage.getItem("tokenUser")
        }
       }).then((res)=>{
              console.log(res.data)
              setPersonaldata(res.data.username)
             
        
         
       })
       
       axios.get(`http://localhost:3001/profile/media?id=${params.iduser}`,{
        headers:{
            "x-access-token":sessionStorage.getItem("tokenUser")
        }
       }).then((res)=>{
        
       
        
        setImageuser(res.data.image.urlImage)
       })
       axios.get(`http://localhost:3001/profile/bio?id=${params.iduser}`,{
        headers:{
            "x-access-token":sessionStorage.getItem("tokenUser")
        }
       }).then((res)=>{
        
        setBio(res.data.biographyContent)
       })
      getNuevasBiografias()
      getImages(3000)

    },[])  
 

    const getImages=(interval)=>{
      
      axios.get(`http://localhost:3001/profile/media?id=${params.iduser}`,{
        headers:{
            "x-access-token":sessionStorage.getItem("tokenUser")
        }
       }).then((res)=>{
        

          setImageuser(res.data.image.urlImage)
        
        
       })
       
       setTimeout(()=>{
        getImages(interval)
       },interval)

    }

   
    const getNuevasBiografias=()=>{
      axios.get(`http://localhost:3001/profile/bio/newBios?id=${params.iduser}`,{
        headers:{
          "x-access-token":sessionStorage.getItem("tokenUser")
        }
       
      }).then((res)=>{
        
        setBio(res.data.biographyContent)
      }).finally(()=>
      getNuevasBiografias())
    }

  
  return (
    <div>

    <Grid>
    <Grid>
      {imageUser?<Avatar style={{
        height: 110,
        width: 110,
      
      }}  src={imageUser}></Avatar>:<Avatar style={{
        height: 110,
        width: 110,
      
      }}  src='https://s.ltrbxd.com/static/img/avatar220.1dea069d.png'>Use</Avatar>}
    </Grid>
    <Grid>
    <h1 style={{
      color:"white"
    }}>{personal}</h1>

    </Grid>
    <Grid>
      <h3  style={{

          color:"#9ab"
      }}>
      Biography
      </h3>
      <p  style={{

          color:"#9ab"
      }}>{bio?.biographyContent}</p>
    </Grid>

    </Grid>
    </div>
  )
}

export default HomeUser