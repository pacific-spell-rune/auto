import { useRef, useEffect } from "react";
import * as d3 from "d3";
import DrawCatmul from "./DrawCatmul";

var smt1 , smt2 ; 

// @ts-check
const DrawPoints = () => {
  // @dev under it to be executed in original paper
  // alert('If these page is comming in unsupported size , use browser normally');
  // console.log(document.documentElement.clientWidth + ' and such')

  return (
    <>
    
    {/* <Drawtopend /> */}
    <p>html svg</p>
    <DrawExact />
    </>
  );
};

interface catmullinter {
  data:{x: number, y: number} [] ;
}

export default DrawPoints;

const DrawExact = () => { 
  const svgRef = useRef< SVGSVGElement | null > (null) ;
  let x_range , y_range ;

  useEffect(() => {
    const svg = d3.select(svgRef.current) ;

    const { n , xn, yn  } = points() ;
    
    x_range = points().xr -150 ;
    y_range = points().yr ;
    
    let new_ptr = Array.from({length : n} , ( _ , i) => ({
      x: xn[i ], y: yn[i] ,
    })) ;

    smt1 = { data : new_ptr }

    console.log(smt1)
    console.log(smt1.data)
    console.log(smt1.data[0])

    console.log(new_ptr) ;
    
    let new_ptr1 = Array.from({length : n} , ( _ , i) => ({  
      x: xn[i ] + 25 , y: yn[i] ,
    }));
    const new_x = side_points(new_ptr ).side_x ;
    const new_y = side_points(new_ptr ).side_y ;
    let cor_arr = Array.from({length : new_x.length} , ( _ , i) => ({ 
      x: new_x[i] , y: new_y[i] ,
     })) ;
    
    const catmullLine = d3.line<{x: number ; y: number}>()
    .x(d=> d.x)
    .y(d=> d.y)
    .curve(d3.curveCatmullRom) ;

    for (let i = 0; i < 2; i++) {
      if( i = 1) {
        svg.append('path').datum(new_ptr1).attr('d' , catmullLine).attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke-width', 1.5);
      }
      svg.append('path').datum(new_ptr).attr('d' , catmullLine).attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 1.5);      
    }

    return () =>{
      svg.selectAll('*').remove();
    }
  })

  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" ref= {svgRef} width="100%" height="750" fill="blue" >
      </svg>
    </div>
  )
  
}

function points( n? : number , xr? : number , yr? : number) {
  if (n!==null) {   n = 10 ;     }
  if (!xr ) {   xr = document.documentElement.clientWidth - 100 ;}
  if (!yr ) {   yr = document.documentElement.clientHeight ;}
  let xn = [  ] , yn = [ ] ;

  const xp = (xr/10) + (xr%10) ;   const yp = (yr/10) + (yr%10) ;

  for (let i = 0; i < n; i++) {
    const xi = xr ;
    const yi = yp * i ;

   let rd ;
   do{ 
    rd = Math.random() * 10 ;
   }while(!(rd >= 1) ) 
   let rdy ;
   do{ 
    rdy = Math.random()  * 10 ;
   }while(!(rdy >= 1) ) 

   const xj = ((xr/rd) + (xr % rd)) 
   const yj = ((yp/rdy) + (yp % rdy)) 
   xn.push((xj +70 ) )
   yn.push((yj + yi ) )
  }

  return { n, xn, yn , xr, yr }
}

enum Side {
  Left ,
  Right 
}
type DataPoint = {
  x: number;
  y: number;
};

function side_points(arr:DataPoint[]  , apms ?: number) {
  let side_x = [] , side_y = [] , diffsx: number , sidyy : Side ; 
  if(apms == undefined ) {
    const widthscreen = document.documentElement.clientWidth ;
    apms = (widthscreen / 15) <40 ? (widthscreen / 15) : 28 ;
  }
  for (let i = 0; i < arr.length-1 ; i++) {
    const ele = arr[i];
    const nxt_ele = arr[i+1];
    const theta2 = (nxt_ele.y - ele.y) / ( nxt_ele.x - ele.x );
    
    diffsx = nxt_ele.x - ele.x ;
    if (diffsx = 0 ) {
      side_x.push(arr[i].x + apms)
      side_y.push(ele.y)
      continue ;
    }
    if (diffsx > 0 ) {
      side_x.push(ele.x - apms)
      side_y.push(ele.y )
      side_x.push(ele.x + apms* Math.cos(theta2))    // Adjustment points
      side_y.push(ele.y + apms* Math.sin(theta2))    // Adjustment points
      sidyy = Side.Right ;

    }
    if (diffsx < 0 ) {
      side_x.push(ele.x - apms* Math.cos(theta2))    // Adjustment points
      side_y.push(ele.y - apms* Math.sin(theta2))    // Adjustment points
      side_x.push(ele.x - apms)
      side_y.push(ele.y )
      sidyy = Side.Left    }
  }
  return {side_x , side_y } ;
} 