import * as d3 from "d3";
import { useEffect , useRef } from "react";

interface xycoord {
  x: number;
  y: number;
}
interface ndata{
  data:xycoord [] ;
}

const DrawCatmul = ({ datac , colors , svg_dim  } : { datac: ndata , colors?: string , svg_dim?:xycoord } ) => {
  const svgRef = useRef<SVGSVGElement | null > (null) ;
  const defaultColor = 'red' ;
  const color = colors !== undefined ? colors : defaultColor;
    if ( svg_dim == undefined ){ svg_dim = { x: 400, y: 400 }  }
  useEffect(()=>{
    const svg = d3.select( svgRef.current ) ;

    const catmullRom = d3.line< { x: number, y: number } >()
                         .x(d=> d.x)
                         .y(d=>d.y)
                         .curve(d3.curveCatmullRom) ;

    for (let i = 0; i < datac.data.length ; i++) {
      const new_data = [datac.data[i]] ;
      
      svg.append('path').datum(new_data).attr('d' , catmullRom ).attr('fill', 'none')
      .attr('stroke', color )
      .attr('stroke-width', 1.5);
      
    }
  })
    
  return (
    <>
    <div>

    <svg ref= {svgRef} width={svg_dim.x}  height={svg_dim.y}/>
    </div>
      </>
  )
}
export default DrawCatmul ;