"use client" ;
import * as d3 from "d3";
// import { type } from "os";
import { useEffect, useRef } from "react";

// interface MYcomponentProps{
//   data: {x: number; y: number} [];
// }

type ptsData = {x: number, y: number} [] ;

const DrawLand: React.FC<{data: ptsData}> = ( {data} ) => {
  const svgImg = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    const svg = d3.select(svgImg.current);
    const curves = d3
      .line<{ x: number; y: number }>(0)
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(d3.curveCatmullRom);

    const onies = svg
      .append("path").datum(data)
      .attr("d", curves).attr('fill','none')
      .attr("stroke", "red")
      .attr("stroke-width",1.5);
  }, []);
  return (
    <div>
      <svg ref={svgImg} width='100%' height='100%' />
    </div>
  );
};
export default DrawLand;