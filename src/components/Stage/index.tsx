import React, { useEffect, useRef } from 'react';
import { useSetState } from 'react-use';
import Renderer from 'scratch-render';
import './index.css';

interface StageProps {
  vm: any;
}

export default function Stage(props: StageProps) {
  const { vm } = props;
  const canvasRef = useRef<any>(null);
  const [state, setState] = useSetState({
    renderer: null,
  });
  useEffect(() => {
    const renderer = new Renderer(canvasRef.current);
    vm.attachRenderer(renderer);
    attachMouseEvents(canvasRef.current);
    vm.renderer.draw();
    setState({
      renderer,
    });
  }, []);
  
  function attachMouseEvents (canvas) {
    document.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mousedown', onMouseDown);
  }
  function onMouseMove (e) {
      console.log('onMouseMove')
      const rect = canvasRef.current.getBoundingClientRect();
      const coordinates = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          canvasWidth: rect.width,
          canvasHeight: rect.height
      };
      vm.postIOData('mouse', coordinates);
  }
  function onMouseUp (e) {
      const rect = canvasRef.current.getBoundingClientRect();
      const data = {
          isDown: false,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          canvasWidth: rect.width,
          canvasHeight: rect.height
      };
      vm.postIOData('mouse', data);
      e.preventDefault();
  }
  function onMouseDown (e) {
      console.log('onMouseDown')
      const rect = canvasRef.current.getBoundingClientRect();
      const data = {
          isDown: true,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          canvasWidth: rect.width,
          canvasHeight: rect.height
      };
      vm.postIOData('mouse', data);
      e.preventDefault();
  }

  return (
    <>
      <div className="stage-canvas-wrap">
        <canvas ref={canvasRef}></canvas> 
      </div>
    </>
  );
}