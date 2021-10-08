import React, { useEffect, useRef } from 'react';
import { useSetState } from 'react-use';
import Renderer from 'scratch-render/dist/web/scratch-render';
import './index.css';

interface StageProps {
  vm: any;
}

interface StageState {
  renderer: any;
  width: number;
  height: number;
}

export default function Stage(props: StageProps) {
  const { vm } = props;
  const canvasRef = useRef<any>(null);
  const wrapRef = useRef<any>(null);
  const [state, setState] = useSetState<StageState>({
    renderer: null,
    width: 0,
    height: 0
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

  useEffect(() => {
    if (state.renderer && wrapRef.current) {
      const { offsetHeight, offsetWidth } = wrapRef.current;
      setState({
        width: offsetWidth,
        height: offsetHeight,
      });
      // 设置canvas画布大小
      state.renderer.resize(offsetWidth, offsetHeight);
      // 设置舞台
      state.renderer.setStageSize(-offsetWidth / 2, offsetWidth / 2, -offsetHeight / 2, offsetHeight / 2);
    } 
  }, [state.renderer, wrapRef.current?.offsetWidth]);
  
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
      <div className="stage-canvas-wrap" ref={wrapRef}>
        <canvas style={{width: state.width, height: state.height}} ref={canvasRef}></canvas> 
      </div>
    </>
  );
}