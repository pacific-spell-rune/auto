export interface xycoord {
    x: number;
    y: number;
}
//Main Gen
export function generator(nis: number = 6): { x: number }[] {
    const xrange: number = document.documentElement.clientWidth;
    const yrange: number = document.documentElement.clientHeight;

    const newArray: { x: number , y:number }[] = Array.from({ length: nis }, (_, i) => ({
        x: xrange * (Math.random() * 0.9 + 0.1) ,
        y:  ((yrange/nis) * (Math.random() * 0.9 + 0.1) *i  +  i*(yrange/nis))
    }) ) ;

    return newArray;
}

// Left side point finder function
export function sideLeft(arr: xycoord[], amps: number) {
    let xlnew: xycoord[] = [];

    for (let i = 0; i < arr.length; i++) {
        const diff = arr[i + 1]?.x - arr[i].x;
        const ydiff = arr[i + 1]?.y - arr[i].y;
        const theta = Math.atan((ydiff / diff) + (ydiff % diff)); // Direction

        if (i === 0) {
            // first is x shifted left
            xlnew.push({ x: arr[i].x - amps, y: arr[i].y });
            continue;
        }

        if (i === (arr.length - 1)) {
            xlnew.push({ x: arr[i].x - amps, y: arr[i].y });
            break;
        }

        if (diff > 0) {
            xlnew.push({ x: arr[i].x - amps, y: arr[i].y });
            xlnew.push({ x: arr[i].x - amps + Math.cos(theta) * amps, y: arr[i].y + Math.sin(theta) * amps });
        }

        if (diff < 0) {
            xlnew.push({ x: arr[i].x - amps - Math.cos(theta) * amps, y: arr[i].y - Math.sin(theta) * amps });
            xlnew.push({ x: arr[i].x - amps, y: arr[i].y });
        }

        if (diff === 0) {
            xlnew.push({ x: arr[i].x - amps, y: arr[i].y });
        }
    }

    return xlnew;
}
export function sideRight(arr: xycoord[], amps: number) {
    let xrnew: xycoord[] = [];

    for (let i = 0; i < arr.length; i++) {
        const diff = arr[i + 1]?.x - arr[i].x;
        const ydiff = arr[i + 1]?.y - arr[i].y;
        const theta = Math.atan((ydiff / diff) + (ydiff % diff)); // Direction

        if (i === 0) {
            // first is x shifted left
            xrnew.push({ x: arr[i].x + amps, y: arr[i].y });
            continue;
        }

        if (i === (arr.length - 1)) {
            xrnew.push({ x: arr[i].x + amps, y: arr[i].y });
            break;
        }

        if (diff > 0) {
            xrnew.push({ x: arr[i].x - amps, y: arr[i].y });
            xrnew.push({ x: arr[i].x - amps + Math.cos(theta) * amps, y: arr[i].y + Math.sin(theta) * amps });
        }

        if (diff < 0) {
            xrnew.push({ x: arr[i].x - amps - Math.cos(theta) * amps, y: arr[i].y - Math.sin(theta) * amps });
            xrnew.push({ x: arr[i].x - amps, y: arr[i].y });
        }

        if (diff === 0) {
            xrnew.push({ x: arr[i].x + amps, y: arr[i].y });
        }
    }

    return xrnew;
}