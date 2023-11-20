function line(dts , i ){
    const y2 = dts[i+1].y ;
    const y1 = dts[i].y ;
    const x2 = dts[i+1].x ;
    const x1 = dts[i].x ;
    
    const slope = (y2 - y1) / (x2 - x1) ;
    const c = y1 - slope*x1 

    const th = Math.atan(slope) ;

    function parametric () {
        const x = (r* Math.cos(th)) + x1 ;
        const y = (r* Math.sin(th)) + y1 ;

        return x , y ;
    }
}

// is there anything left to do