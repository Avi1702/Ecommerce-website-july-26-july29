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
import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { Int_Data, Sort_Data } from '../Redux/data/action';

export const Home = () => {

  const [fetchData,setFetchData]=React.useState([])
  const [page,setPage]=useState(1)
  const [sort,setSort]=useState(null)
  // const [ratingFilter,setRatingFilter]=useState([])
  const [ratingNum,setRatingNum]=useState(null)



  const fetching_func=(page)=>{
    axios({
      method:"get",
      url:`http://localhost:3000/products?_page=${page}&_limit=6`
    })
    .then((res)=>setFetchData(res.data))
    .catch((err)=>{console.log(err)})
  }

  useEffect(()=>{
    fetching_func(page)
  },[page])


const pagination=(value)=>{
   setSort(null)
  setPage(page+(value))
}

const handleSort=(type)=>{

  if(sort===type){
    setSort(null)
    fetching_func()
    // dispatch(Int_Data(page))
  }

  else{
setSort(type)
axios({
  method:"get",
  url:`https://practise-heroku-deployment.herokuapp.com/products?_page=${page}&_limit=6&_sort=price&_order=${type}`
})
.then((res)=>setFetchData(res.data))
.catch((err)=>{console.log(err)})
}
}



// const handleFilter=(star)=>{ 
  
//   if(ratingArray.includes(star)){
//     const updatedArray=ratingArray.filter((el)=>el!==star)
//     setRatingArray(updatedArray)
//    return;
//   }
//   else{

//     setRatingArray(prev=>([...prev,star]))
//   }
// }

const handleFilter=(value)=>{

if(ratingNum===value){
  setRatingNum(null)
  fetching_func()
  return;
}  

setRatingNum(value)
axios({
    method:"get",
    url:`https://practise-heroku-deployment.herokuapp.com/products?_page=${page}&_limit=6&rating_gte=${value}&rating_lte=${value+1}`
  })
  .then((res)=>{setFetchData(res.data)})

}

  return (
    <React.Fragment>

      <Box id="Asc_Desc">
    <Button variant='outlined'> Sort : </Button>
   <Button variant={sort==="asc"?'contained':"outlined"} onClick={()=>handleSort("asc")}>Asc</Button>
   <Button variant={sort==="desc"?'contained':"outlined"}  onClick={()=>handleSort("desc")}>Desc</Button>

      </Box>

      <Box id="rating_filter">
    <Button variant="outlined" >Filter</Button>
   <Button variant={ratingNum===4?"contained":"outlined"}  onClick={()=>{handleFilter(4)}}>5 to 4 ⭐</Button>
   <Button variant={ratingNum===3?"contained":"outlined"}  onClick={()=>{handleFilter(3)}}>4 to 3 ⭐</Button>
   <Button variant={ratingNum===2?"contained":"outlined"}  onClick={()=>{handleFilter(2)}}>3 to 2 ⭐</Button>
   <Button variant={ratingNum===1?"contained":"outlined"}  onClick={()=>{handleFilter(1)}}>2 to 1 ⭐</Button>
   {/* <Button variant={ratingArray.includes(4)?"contained":"outlined"} color="success" onClick={()=>{handleFilter(5)}}>5⭐</Button> */}
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
        <Link to={`/individual/${item.id}`}><Button size="small">View</Button></Link>
        {/* <Button size="small">Learn More</Button> */}
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

