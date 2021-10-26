goog.require('goog.math.Coordinate');

/**
 * scratch-blocks/cor/gesture.js 方法重新/覆盖
 **/
export default function Gesture(ScratchBlocks) {
  /**
   * DO MATH to set currentDragDeltaXY_ based on the most recent mouse position.
   * @param {!goog.math.Coordinate} currentXY The most recent mouse/pointer
   *     position, in pixel units, with (0, 0) at the window's top left corner.
   * @return {boolean} True if the drag just exceeded the drag radius for the
   *     first time.
   * @private
   */
  ScratchBlocks.Gesture.prototype.updateDragDelta_ = function(currentXY) {
    this.currentDragDeltaXY_ = goog.math.Coordinate.difference(
      currentXY,
      this.mouseDownXY_
    );

    if (this.isDraggingBlock_) {
      var delta = this.blockDragger_.pixelsToWorkspaceUnits_(this.currentDragDeltaXY_);
      var newLoc = goog.math.Coordinate.sum(this.blockDragger_.startXY_, delta);
      if (newLoc.x < 0) {
        this.currentDragDeltaXY_.x = -this.workspaceCoordinateToPixel(this.blockDragger_.startXY_.x);
      }
      if (newLoc.y < 0) {
        this.currentDragDeltaXY_.y = -this.workspaceCoordinateToPixel(this.blockDragger_.startXY_.y);
      }
    }

    if (!this.hasExceededDragRadius_) {
      var currentDragDelta = goog.math.Coordinate.magnitude(
          this.currentDragDeltaXY_);

      // The flyout has a different drag radius from the rest of Blockly.
      var limitRadius = this.flyout_ ? ScratchBlocks.FLYOUT_DRAG_RADIUS :
          ScratchBlocks.DRAG_RADIUS;

      this.hasExceededDragRadius_ = currentDragDelta > limitRadius;
      return this.hasExceededDragRadius_;
    }
    return false;
  };
  
  /**
   * 函数pixelsToWorkspaceUnits_ 逆过程
   */
  ScratchBlocks.Gesture.prototype.workspaceCoordinateToPixel = function(coordinate) {
    let result = coordinate * this.blockDragger_.workspace_.scale;
    if (this.blockDragger_.workspace_.isMutator) {
      var mainScale = this.blockDragger_.workspace_.options.parentWorkspace.scale;
      result = coordinate * mainScale;
    }
    return result;
  }
};