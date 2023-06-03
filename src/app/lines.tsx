"use client";
import Sketch from "react-p5";
import type P5 from "p5";


type Position = "start" | "movingF" | "movingB" | "finish";
let position: Position = "start";

let t0 = 0;
//let play = false;
let duration = 1000;

type Animated = {
  start: number;
  current: number;
  end: number;
}

let angle: Animated = {start: 2.5, current: 2.5, end: 3.5};
let radius: Animated = {start: 300, current: 300, end: 250};
let firstLineAngle: Animated = {start: 120, current: 120, end: 100};

function current(v: Animated, t: number, axe: number) {
  let animationFactor = -0.5*Math.cos(t*3.14/duration) + 0.5;
  let increment = animationFactor*(v.end - v.start);
  let origin = axe>0 ? v.start : v.end;
  return origin + axe * increment;
}


interface LinesProps {
    playButton: boolean;
    setPlayButton: React.Dispatch<React.SetStateAction<boolean>>;
}


// props: LinesProps
export default function Lines(props: LinesProps) {


  const setup = (p5: P5, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  };

  const windowResized = (p5: P5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  }

  function colorG(i: number) {
    const color1 = {r: 19, v: 64, b: 231};
    const color2 = {r: 40, v: 177, b: 245};
    const R = color1.r + i * ((color2.r - color1.r)/18);
    const V = color1.v + i * ((color2.v - color1.v)/18);
    const B = color1.b + i * ((color2.b - color1.b)/18);
    return {r: R, v: V, b: B}
  }


  const draw = (p5: P5) => {
    p5.background(255);

    
    if (props.playButton) {
      t0 = p5.millis();
      props.setPlayButton(false);
      //play = false;

      if (position == "start") {
        position = "movingF";
      } else if (position == "finish") {
        position = "movingB";
      }
    }

    if (position == "movingF" || position == "movingB") {
      let axe = (position == "movingF") ? 1 : -1;

      let time = p5.millis()-t0;
      if(time >= duration) {
        position = axe>0 ? "finish" : "start";
      }
      angle.current = current(angle, time, axe);
      radius.current = current(radius, time, axe);
      firstLineAngle.current = current(firstLineAngle, time, axe);
      //circleX.current = current(circleX, time, axe);
      //circleY.current = current(circleY, time, axe);
    }





    let circleX = 400;
    let circleY = 2*p5.height/3;

    p5.fill(255, 255, 255, 0);
    p5.stroke(200, 200, 200, 0);
    p5.ellipse(circleX, circleY, radius.current * 2, radius.current * 2);
    

    for (let i = 0; i < 20; i++) {
      // Determine the angle in radians
      let angleDegrees = (angle.current * i) + firstLineAngle.current;
      let angleRadians = p5.radians(angleDegrees);
  
      // Calculate the point of tangency on the circle
      let tangentX = circleX + radius.current * p5.cos(angleRadians);
      let tangentY = circleY + radius.current * p5.sin(angleRadians);
  
      // Calculate the direction of the tangent line
      let tangentDirectionX = -p5.sin(angleRadians);
      let tangentDirectionY = p5.cos(angleRadians);
  
      // Calculate the slope of the tangent line
      let slope = tangentDirectionY / tangentDirectionX;
  
      // Calculate the intersection points with the canvas edges
      let intersections = [
        {x: 0, y: slope * (0 - tangentX) + tangentY},
        {x: p5.windowWidth, y: slope * (p5.windowWidth - tangentX) + tangentY},
        {x: (0 - tangentY) / slope + tangentX, y: 0},
        {x: (p5.windowHeight - tangentY) / slope + tangentX, y: p5.windowHeight}
      ];
  
      // Filter the intersections to keep only those inside the canvas
      let validIntersections = intersections.filter(pt => {
        return pt.x >= 0 && pt.x <= p5.windowWidth && pt.y >= 0 && pt.y <= p5.windowHeight;
      });
  
      // Draw the tangent lines
      const col = colorG(i);
      p5.stroke(col.r, col.v, col.b);
      p5.strokeWeight(1.7);
  
      if (validIntersections.length == 2) {
        // Draw a line between the two valid intersections
        p5.line(validIntersections[0].x, validIntersections[0].y, validIntersections[1].x, validIntersections[1].y);
      }
    }


  };


  return (
    <div>
      <Sketch setup={setup} draw={draw} windowResized={windowResized} className="my-canvas"/>
      {/*<button onClick={() => props.setPlayButton(true)}>Play</button>*/}
    </div>
  )
}
