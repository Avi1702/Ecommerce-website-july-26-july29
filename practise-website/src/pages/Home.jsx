// import React from 'react'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/system';
import { useState } from 'react';

export const Home = () => {

  const [fetchData,setFetchData]=React.useState([])
  const [page,setPage]=React.useState(1)
  const [sort,setSort]=useState(null)
  const [filterData,setFilterData]=useState([])


  const fetching_func=()=>{
    axios({
      method:"get",
      url:`http://localhost:3000/products?_page=${page}&_limit=6`
    })
    .then((res)=>setFetchData(res.data))
    .catch((err)=>{console.log(err)})
  }

  useEffect(()=>{
   fetching_func()
  },[page])


const pagination=(value)=>{
   setSort(null)
  setPage(page+(value))
}

const handleSort=(type)=>{

  if(sort===type){
    setSort(null)
    fetching_func()
  }
  else{
 setSort(type)
  axios({
    method:"get",
    url:`http://localhost:3000/products?_page=${page}&_limit=6&_sort=price&_order=${type}`
  })
  .then((res)=>{setFetchData(res.data)})
  .catch((err)=>{console.log(err)})
 }
}

const handleFilter=(star)=>{  
  // fetching_func()
  const updatedData=  fetchData.filter((item)=>{return item.rating>=star})
  setFetchData(updatedData)
}

  return (
    <React.Fragment>

      <Box id="Asc_Desc">
    <Button variant='outlined'> Sort : </Button>
   <Button variant={sort==="asc"?'contained':"outlined"} onClick={()=>handleSort("asc")}>Asc</Button>
   <Button variant={sort==="desc"?'contained':"outlined"}  onClick={()=>handleSort("desc")}>Desc</Button>

      </Box>

      <Box id="rating_filter">
    <Button variant='outlined' Color='error'>Filter</Button>
   <Button variant='contained' onClick={()=>{handleFilter(1)}}>1⭐</Button>
   <Button variant='contained' onClick={()=>{handleFilter(2)}}>2⭐</Button>
   <Button variant='contained' onClick={()=>{handleFilter(3)}}>3⭐</Button>
   <Button variant='contained' onClick={()=>{handleFilter(4)}}>4⭐</Button>
   <Button variant='contained' onClick={()=>{handleFilter(5)}}>5⭐</Button>
      </Box>

    <div id='data_grid'>
 
{

  fetchData.map((item)=>{return <Card sx={{ maxWidth: 345 }}>

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
        <Button size="small">Add To Cart</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    })
  }
  </div>
  
  <div id="pagination">
  <Button disabled={page===1} variant='contained' onClick={()=>pagination(-1)}>Prev</Button>
  <Button variant='outlined' >{page}</Button>
  <Button disabled={page===8}variant='contained' onClick={()=>pagination(1)}>Next</Button>
  </div>


    
</React.Fragment>
  )
}
