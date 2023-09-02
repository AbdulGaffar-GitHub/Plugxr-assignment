import React, { useEffect, useState } from 'react';
import './wireframe1.css';

export default function Wireframe1() {

  const [x,setX] = useState(0);
  const [y, setY]=useState(0);
  const [box,setBox] = useState(false);

  useEffect(()=>{
    setX(x)
    setY(y)
  },[x,y])

  const minWidth1 = 10;
  const minWidth2 = 50;
  const minWidth3 = 5;
  
  const dividerWidth1=7;
  const dividerWidth2=7;

  const handleDividerDrag1 = (e) => {
    e.preventDefault();

    const newWidth = e.clientX;
    const totalWidth = window.innerWidth-dividerWidth1-dividerWidth2;

    const comp2NewWidth = Math.max(minWidth1,(newWidth/totalWidth)*100);
    // console.log(component2NewWidth);
    const comp3NewWidth = Math.max(minWidth2,100 - comp2NewWidth - 15);
    // console.log(component3NewWidth);

    document.querySelector('.component2').style.width= `${comp2NewWidth}%`;
    document.querySelector('.component3').style.width= `${comp3NewWidth}%`;
  };

  const stopDragging1 = () => {
    document.removeEventListener('mousemove', handleDividerDrag1);
    document.removeEventListener('mouseup', stopDragging1);
  };

  const startDragging1 = () => {
    document.addEventListener('mousemove', handleDividerDrag1);
    document.addEventListener('mouseup', stopDragging1);
  };

  const handleDividerDrag2 = (e) => {
    e.preventDefault();
   
    const newWidth = e.clientX - (0.25*window.innerWidth);
    const totalWidth = window.innerWidth-dividerWidth1-dividerWidth2 ;
    // console.log(totalWidth);

    const comp3NewWidth = Math.max(minWidth2, (newWidth/totalWidth) * 100);

    const comp4NewWidth = Math.max(minWidth3,100-comp3NewWidth- 25);
    //console.log(component3NewWidth);
    // console.log(component4NewWidth);

    document.querySelector('.component3').style.width = `${comp3NewWidth}%`;
    document.querySelector('.component4').style.width = `${comp4NewWidth}%`;
  };

  const stopDragging2 = () => {
    document.removeEventListener('mousemove', handleDividerDrag2);
    document.removeEventListener('mouseup', stopDragging2);
  };

  const startDragging2 = () => {
    document.addEventListener('mousemove', handleDividerDrag2);
    document.addEventListener('mouseup', stopDragging2);
  };



// box dragging
  const dragBox = (e) =>{
    if (!box) return;
    const x = e.clientX - (0.25 * window.innerWidth) - dividerWidth1 -10;
    const y = e.clientY - (0.13 * window.innerHeight) -10;
    setX(x);
    setY(y);
      //  console.log("x: " + x +"y:"+y )   
  }

  const stopDragging = () => {
    document.removeEventListener('mousemove', dragBox);
    document.removeEventListener('mouseup', stopDragging);
  };

  const startDragging = () => {
    document.addEventListener('mousemove', dragBox);
    document.addEventListener('mouseup', stopDragging);
  };

  return (
    <div className='outer'>
      <div className='component1'>
        <button className='btn1' onClick={() => setBox(true)}>Save</button>
      </div>
      <div className='inner'>
        <div className='component2' style={{width:"25%"}}>
          <div className='boxes'>
            <div className='box'></div>
            <div className='box'></div>
            <div className='box'></div>
            <div className='box'></div>
            <div className='box'></div>
            <div className='box'></div>
            <div className='box'></div>
            <div className='box'></div>
            <div className='box'></div>
          </div>
        </div>

        <div
          className='divider1'
          style={{ width: `${dividerWidth1}px`}}
          onMouseDown={startDragging1}
        ></div>

        <div className='component3' style={{width:"60%"}}>
          {box &&
              <div className="ebox"
              onMouseDown={startDragging}
              style={{top:`${y}px`, left:`${x}px`}}
              >
              
            </div>
          }
          <div
            className='divider2'
            style={{ width: `${dividerWidth2}px` }}
            onMouseDown={startDragging2}
          ></div>
        </div>

        <div className='component4' style={{width:"15%"}}>
        
        </div>

      </div>
    </div>
  );
}
