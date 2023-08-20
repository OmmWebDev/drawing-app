import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function Home() {
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef();
  const ctxRef = useRef();

  useEffect(() => {
    let canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    let ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctxRef.current = ctx;
  }, []);

  let handleMouseDown = ({ nativeEvent }) => {
    let { offsetX, offsetY } = nativeEvent;
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  let handleMouseMove = ({ nativeEvent }) => {
    if (!isDrawing) return
    else {
      const { offsetX, offsetY } = nativeEvent;
      ctxRef.current.lineTo(offsetX, offsetY);
      ctxRef.current.stroke();
    }
  }

  let handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <>
      <section>
        <div className='canvas-container'>
          <canvas ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          ></canvas>
        </div>
      </section>
    </>
  )
}

export default Home;