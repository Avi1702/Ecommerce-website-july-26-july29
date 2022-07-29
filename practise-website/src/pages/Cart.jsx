import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Link } from 'react-router-dom';
export const Cart = () => {

const [cartData,setCartData]=useState([])
// const [count,setCount]=useState(1)

useEffect(()=>{
    axios({
        method:"get",
        url:"http://localhost:3000/cartItems"
    })
    .then((res)=>setCartData(res.data))
},[])

const handleInc=(Id)=>{
  
    const find=cartData.find((item)=>item.id===Id)

axios({
    method:"patch",
    url:`http://localhost:3000/cartItems/${Id}`,
    data:{
        count: find.count + 1
    }
})
.then((res)=>console.log(res.data))
}

const handleDec=(id)=>{

}

  return (
    <div style={{width:"28%",margin:"auto",textAlign:"center",display:"flex",flexDirection:"column",gap:"15px"}}>
        <h2>Cart Items</h2>

{cartData.map((item)=>{return <Card sx={{ maxWidth: 345 }}>

<CardMedia
  component="img"
  alt="green iguana"
  height="140"
  image={`${item.imageBase}/${item.hex.slice(1)}`}
/>
<CardContent>
  <Typography gutterBottom variant="h5" component="div">
   {item.color} - {item.title}
  </Typography>
  <Typography id="price_rating" variant="body2" color="text.secondary">
   <div>₹{item.price}</div> <div>{item.rating}⭐</div>
  </Typography>
 </CardContent>
 <CardActions>
  <Box style={{width:"70%",margin:"auto"}}>
  <Button size="small" variant='contained' onClick={()=>handleInc(item.id)}>+</Button>
  <Button size="small" variant='outlined'>1</Button>
  <Button size="small" variant='contained' onClick={()=>handleDec(item.count,item.id)}>-</Button>
  </Box>
  </CardActions>
  </Card>
})
  }
        
  </div>
  )
}
