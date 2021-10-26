//@ts-nocheck
import ScratchBlocks from 'scratch-blocks';
import WorkspaceSvg from './workspace-svg';
import Scrollbar from './scrollbar';
import Gesture from './gesture';

WorkspaceSvg(ScratchBlocks);
Scrollbar(ScratchBlocks);
Gesture(ScratchBlocks);

/**
 * Connect scratch blocks with the vm
 * @param {VirtualMachine} vm - The scratch vm
 * @return {ScratchBlocks} ScratchBlocks connected with the vm
 */
export default ScratchBlocks;
