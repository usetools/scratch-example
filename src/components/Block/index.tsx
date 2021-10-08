import { useEffect, useRef } from 'react';
import { useSetState } from 'react-use';
import ScratchBlocks from '@src/lib/blocks';
import blockOptions from '@src/lib/block-options';
import './index.css';

interface BlockState {
  scratchBlocks: any;
  workspace: any;
  flyoutWorkspace: any;
  options: any;
};

interface BlockProps {
  vm: any;
}

export default function Block(props: BlockProps) {
  const { vm } = props;
  const divRef = useRef(null); 
  const [state, setState] = useSetState<BlockState>({
    scratchBlocks: ScratchBlocks,
    workspace: null,
    flyoutWorkspace: null,
    options: blockOptions,
  }); 

  useEffect(() => {
    if (state?.workspace) {
      state.workspace?.dispose?.();
    };
    if (divRef.current) {
      // state.scratchBlocks.ScratchMsgs.setLocale(document.documentElement.lang);
      const workspace = state.scratchBlocks.inject(divRef.current, state.options);
      setState({
        workspace,
        flyoutWorkspace: workspace
          .getFlyout()
          .getWorkspace() 
      });
    }
    return () => {
      state.workspace?.dispose?.();
    };
  }, [state.scratchBlocks]);

  useEffect(() => {
    if (state?.workspace) {
      attachVM();
    }
  }, [state?.workspace]);

  function attachVM () {
    state.workspace.addChangeListener(vm.blockListener);
    state.flyoutWorkspace.addChangeListener(vm.flyoutBlockListener);
    vm.addListener('SCRIPT_GLOW_ON', onScriptGlowOn);
    vm.addListener('SCRIPT_GLOW_OFF', onScriptGlowOff);
    vm.addListener('BLOCK_GLOW_ON', onBlockGlowOn);
    vm.addListener('BLOCK_GLOW_OFF', onBlockGlowOff);
    vm.addListener('VISUAL_REPORT', onVisualReport);
    vm.addListener('workspaceUpdate', onWorkspaceUpdate);
  }
  function onScriptGlowOn (data) {
    console.log(1,data)
    state.workspace.glowStack(data.id, true);
  }
  function onScriptGlowOff (data) {
    console.log(2,data)
    state.workspace.glowStack(data.id, false);
  }
  function onBlockGlowOn (data) {
    console.log(3,data)
    state.workspace.glowBlock(data.id, true);
  }
  function onBlockGlowOff (data) {
    console.log(4,data)
    state.workspace.glowBlock(data.id, false);
  }
  function onVisualReport (data) {
    console.log('onVisualReport')
    state.workspace.reportValue(data.id, data.value);
  }
  function onWorkspaceUpdate (data) {
    console.log('WorkspaceUpdate event')
    ScratchBlocks.Events.disable();
    state.workspace.clear();
    const dom = ScratchBlocks.Xml.textToDom(data.xml);
    ScratchBlocks.Xml.domToWorkspace(dom, state.workspace);
    ScratchBlocks.Events.enable();
  }

  return (
    <div className="block-wrap" ref={divRef}></div>
  );
}
