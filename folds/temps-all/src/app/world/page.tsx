"use client" ;
import DrawLand from "./DrawLand"
import {useState , useEffect } from 'react'
import  { generator , sideLeft , sideRight , xycoord} from './Pathpoints'

const page = () => {
  const mainPts = generator() ;
 const [data , setData ] = useState (mainPts) ;
 useEffect(()=>{
  console.log(mainPts)
 } , [])


  return (
    <div>
      Page Login ,,,,,,,
      <DrawLand  data={data} />
    </div>
  )
}

export default page  ;