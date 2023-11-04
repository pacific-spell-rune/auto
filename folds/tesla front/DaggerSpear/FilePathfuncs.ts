enum Side {
  Left ,
  Right 
}
type DataPoint = {
  x: number;
  y: number;
};
interface catmullinter {
  data:{x: number, y: number} [] ;
}
function get_Side_Points( arr : catmullinter , apms: number  ) {
    let cur_side : Side = Side.Left , new_side :Side ;
    let left_arr_x = [] , right_arr_y = [] ;
    if(cur_side == Side.Left) {
      let pick_side : Side ;
      let diff : [number,number] ;
      for(var i=0 ; i < arr.data.length -1 ; i++ ){
        left_arr_x.push(arr.data[i].x - apms) ;
        right_arr_y[i] = arr.data[i].y  ;
        diff =[( left_arr_x[i] - left_arr_x[i+1]) , (arr.data[i].y - arr.data[i].y)];
        if (diff[0] <0) {
          // Breaking in right
          let atanxy = Math.atan( diff[1] / diff[0] )
          left_arr_x.push(apms*Math.sin( atanxy ))
        }
      }
    }
    
  }

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