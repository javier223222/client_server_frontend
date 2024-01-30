"use client"


import { Avatar, Grid, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ProfileAdmin = ({params}) => {
    const [iduser,setIduser]=useState(null)
    const [imageUser,setImageuser]=useState(null)
    const [personal,setPersonaldata]=useState(null)
    const [bio,setBio]=useState(null)
    const [showEdit,setShowEdit]=useState(false)
    const [idImagen,setIdImagen]=useState(null)
    const [image,setImage]=useState(null)
    const [newImagen,setNewImagen]=useState(null)
    const [newBio,setNewBio]=useState(null)
    const submitImage=(e)=>{
      setImageuser(URL.createObjectURL(e.target.files[0]))
      setNewImagen(e.target.files[0])
      const formdata=new FormData()
      formdata.append("profileImage",(e.target.files[0]))
      axios.post(`http://localhost:3001/profile/media?idusermedia=${idImagen}`,formdata,{
        headers:{
          "x-access-token":sessionStorage.getItem("tokenUser")
        }
      }).then((res)=>{
        console.log(res.data)
      })
    }

    const handlesubmitbio=(e)=>{
      e.preventDefault()
      
     addBio()
       setBio({biographyContent:newBio})
       setNewBio(null)
       setShowEdit(false)
      }


    const handleBio=(e)=>{
      setNewBio(e.target.value)
    }
    const cancelar=()=>{
      setShowEdit(false)
    setNewBio(null)
    }

 
    const addBio=()=>{
      axios.post("http://localhost:3001/profile/bio",{biography:newBio},{
        headers:{
          "x-access-token":sessionStorage.getItem("tokenUser")
        }
       }).then((res)=>{
          console.log(res.data)
        
       })
    }
    useEffect(()=>{
       setIduser(params.iduser)
       axios.get(`http://localhost:3001/profile/user/getUsername`,{
        headers:{
            "x-access-token":sessionStorage.getItem("tokenUser")
        }
       }).then((res)=>{
              console.log(res.data)
              setPersonaldata(res.data.username)
             
        
         
       })
       
       axios.get(`http://localhost:3001/profile/media`,{
        headers:{
            "x-access-token":sessionStorage.getItem("tokenUser")
        }
       }).then((res)=>{
        console.log(res.data)
        setIdImagen(res.data.image.idUserMedia)
        setImageuser(res.data.image.urlImage)
       })
       axios.get(`http://localhost:3001/profile/bio`,{
        headers:{
            "x-access-token":sessionStorage.getItem("tokenUser")
        }
       }).then((res)=>{
        console.log(res.data)
        setBio(res.data.biographyContent)
       })
      
    

    },[])  
 

    // const getImages=()=>{
    //   console.log("hola")
    //   axios.get(`http://localhost:3001/profile/media`,{
    //     headers:{
    //         "x-access-token":sessionStorage.getItem("tokenUser")
    //     }
    //    }).then((res)=>{
       
    //     if(res.data.image.urlImage!=imageUser){
    //       setImageuser(res.data.image.urlImage)
    //     }
        
    //    })
    // }
    // setInterval(getImages(),2000)
    

    // axios.get(`http://localhost:3001/profile/bio/newBios?id=${params.iduser}`,{
    //   headers:{
    //     "x-access-token":sessionStorage.getItem("tokenUser")
    //   }
     
    // }).then((res)=>{
      
    //   setBio(res.data.biographyContent)
    // })
    
  return (
    <div>

    <Grid>
    <input onChange={submitImage} type="file"   name="file" id="file" class="inputfile" />
    <Grid>
      {imageUser?<label htmlFor='file'><Avatar style={{
        height: 110,
        width: 110,
      
      }}  src={imageUser}></Avatar></label>:<Avatar style={{
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
      {showEdit?<><TextField style={{
      color:"#fff",
      borderColor:"#fff"
     }} name='newbio' onChange={handleBio}  fullWidth label="Biography" id="fullWidth" ></TextField>
     <button onClick={handlesubmitbio}>agregar</button>
     <button onClick={cancelar}>cancelar</button>
     </>:   <p onClick={()=>{
        setShowEdit(true)
      }}  style={{

          color:"#9ab"
      }}>{bio?.biographyContent}</p>}
   
    </Grid>

    </Grid>
    </div>
  )
}


export default ProfileAdmin