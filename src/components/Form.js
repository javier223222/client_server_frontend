"use client"
import "@/css/form.css"
import { Button, Container,Grid, Paper, TextField} from '@mui/material'
import axios from "axios"
import React, { useEffect, useState } from 'react'


const Form = props => {
    const [movie,setMovies]=useState({
        tittlemovie:null,
        descriptionMovie:null,
        year:null,
        timeduration:null,
        namegender:null,
        namedirector:null,
        portImage:null,
        backgImage:null,
        token:sessionStorage.getItem("adminToken"),
        idMovie:null
    })

 

    
   const  socket= new WebSocket(`ws://localhost:3001/moviesPrincipal?tokenAdmin=${movie.token}`)
  

  
  
    
    const onInputChange=(e)=>{
        const {name,value,files}=e.target

       setMovies(x=>{
        return {
            ...x,
            [name]:files?files[0]:value
        }
       })


    }

    const handelSubmit=async(e)=>{
      e.preventDefault()
      if(!movie.backgImage && !movie.descriptionMovie && !movie.namedirector && !movie.namegender && !movie.portImage && !movie.timeduration && !movie.tittlemovie && !movie.year){
        alert("you need provide all fills")
        return 
      }
      const data=new FormData()

      data.append("titleMovie",movie.tittlemovie)
      data.append("descriptionMovie",movie.descriptionMovie)
      data.append("year",movie.year)
      data.append("timeduration",movie.timeduration)
      data.append("namegener",movie.namegender)
      data.append("imageMovie",movie.portImage)
      data.append("portimage",movie.backgImage)
      data.append("namedirector",movie.namedirector)

      
      axios.post("http://localhost:3001/movies",data,{
        headers:{
            "x-access-token":sessionStorage.getItem("adminToken")
          
        }
      }).then((res)=>{
        socket.send("zza")
        console.log(res.data)
      }).catch(err=>console.log(err))
   
   
     

      
    }
  return (
    <Container maxWidth="sm"  >
     <Grid container spacing={2} >
       <Grid item xs={4}>
      <TextField  id="standard-basic" label="tittle movie" variant="standard" name='tittlemovie' onChange={onInputChange} ></TextField>
          
       </Grid>
       <Grid item xs={4}>
      <TextField id="standard-basic" label="description movie" variant="standard" name='descriptionMovie' onChange={onInputChange} ></TextField>
          
       </Grid>
       <Grid item xs={4}>
      <TextField id="standard-basic" label="year" variant="standard" name='year' onChange={onInputChange}></TextField>
          
       </Grid>

       <Grid item xs={4}>
      <TextField id="standard-basic"  label="time duration" variant="standard" name='timeduration' onChange={onInputChange}></TextField>
          
       </Grid>

       <Grid item xs={4}>
      <TextField id="standard-basic" label="name gender" variant="standard" name='namegender' onChange={onInputChange}></TextField>
          
       </Grid>
       <Grid item xs={4}>
      <TextField id="standard-basic" label="name direction" variant="standard" name='namedirector' onChange={onInputChange}></TextField>
          
       </Grid>

       <Grid item xs={4}>

     <input className="inputFile" accept="image/*" onChange={onInputChange} id='portImgae' name='portImage' type="file"></input>

     
     <label htmlFor='portImgae'>
     {
        movie.portImage?<img style={{
            height: 140,
                  width: 100,
        }} src={URL.createObjectURL(movie.portImage)}></img>:<Grid  item>
              <Paper
                sx={{
                    height: 140,
                  width: 100,
                
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              />
              
            </Grid>
     }
  
     </label>
   
          
       </Grid>
       <Grid item xs={4}>
      <input accept="image/*" className="inputFile" onChange={onInputChange} id='backgroundImaG' name='backgImage' type="file"></input>
      <label htmlFor='backgroundImaG'>
      {
        movie.backgImage?<img style={{
            height: 140,
                  width: 100,
        }} src={URL.createObjectURL(movie.backgImage)}></img>: <Grid  item>
              <Paper
                sx={{
                  height: 140,
                  width: 100,
                
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              />
              
            </Grid>
      }
     </label>
       </Grid>
       <Grid item xs={12}>
       <Button variant="contained" color="primary" onClick={handelSubmit}>Add movie</Button>
       </Grid>


     </Grid>
   
     
       
    </Container>
  )
}


export default Form