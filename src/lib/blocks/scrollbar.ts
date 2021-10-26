/**
 * scratch-blocks/cor/scrollbar.js 方法重新/覆盖
 **/
export default function Scrollbar(ScratchBlocks) {
  /**
   * Recalculate a vertical scrollbar's location on the screen and path length.
   * This should be called when the layout or size of the window has changed.
   * @param {!Object} hostMetrics A data structure describing all the
   *     required dimensions, possibly fetched from the host object.
   */
  ScratchBlocks.Scrollbar.prototype.resizeViewVertical = function(hostMetrics) {
    var viewSize = hostMetrics.viewHeight - 1;
    if (this.pair_) {
      // Shorten the scrollbar to make room for the corner square.
      viewSize -= ScratchBlocks.Scrollbar.scrollbarThickness;
    }
    this.setScrollViewSize_(Math.max(0, viewSize));
    var xCoordinate = hostMetrics.absoluteLeft + 0.5;
    if (!this.workspace_.RTL) {
      xCoordinate += hostMetrics.viewWidth -
          ScratchBlocks.Scrollbar.scrollbarThickness - 1;
    }
    var yCoordinate = hostMetrics.absoluteTop + 0.5;
    // 如果是工作区的垂直滚动条，则设置其x坐标为0.5
    if ([
      this.outerSvg_.classList.contains('blocklyMainWorkspaceScrollbar'),
      !this.horizontal_,
    ].every(v => v)) {
      xCoordinate = 0.5;
    }
    this.setPosition_(xCoordinate, yCoordinate);

    // If the view has been resized, a content resize will also be necessary.  The
    // reverse is not true.
    this.resizeContentVertical(hostMetrics);
  };

  /**
   * Recalculate a horizontal scrollbar's location on the screen and path length.
   * This should be called when the layout or size of the window has changed.
   * @param {!Object} hostMetrics A data structure describing all the
   *     required dimensions, possibly fetched from the host object.
   */
  ScratchBlocks.Scrollbar.prototype.resizeViewHorizontal = function(hostMetrics) {
    var viewSize = hostMetrics.viewWidth - 1;
    if (this.pair_) {
      // Shorten the scrollbar to make room for the corner square.
      viewSize -= ScratchBlocks.Scrollbar.scrollbarThickness;
    }
    this.setScrollViewSize_(Math.max(0, viewSize));

    var xCoordinate = hostMetrics.absoluteLeft + 0.5;
    if ([
      this.pair_ && this.workspace_.RTL,
      // 工作区水平滚动条时，x坐标加上滚动条厚度占位符
      this.horizontal_ && this.outerSvg_.classList.contains('blocklyMainWorkspaceScrollbar'),
    ].some(v => v)) {
      xCoordinate += ScratchBlocks.Scrollbar.scrollbarThickness;
    }

    // Horizontal toolbar should always be just above the bottom of the workspace.
    var yCoordinate = hostMetrics.absoluteTop + hostMetrics.viewHeight -
        ScratchBlocks.Scrollbar.scrollbarThickness - 0.5;
    this.setPosition_(xCoordinate, yCoordinate);

    // If the view has been resized, a content resize will also be necessary.  The
    // reverse is not true.
    this.resizeContentHorizontal(hostMetrics);
  };


  /**
   * Recalculate a vertical scrollbar's location within its path and length.
   * This should be called when the contents of the workspace have changed.
   * @param {!Object} hostMetrics A data structure describing all the
   *     required dimensions, possibly fetched from the host object.
   */
  ScratchBlocks.Scrollbar.prototype.resizeContentVertical = function(hostMetrics) {
    if (!this.pair_) {
      // Only show the scrollbar if needed.
      this.setVisible(this.scrollViewSize_ < hostMetrics.contentHeight);
    }

    this.ratio_ = this.scrollViewSize_ / hostMetrics.contentHeight;
    if (this.ratio_ === -Infinity || this.ratio_ === Infinity ||
        isNaN(this.ratio_)) {
      this.ratio_ = 0;
    }
    // 若_ratio趋近于0，则设置滚动条高度为0
    var handleLength = hostMetrics.contentHeight === hostMetrics.viewHeight ? 0 : hostMetrics.viewHeight * this.ratio_;
    this.setHandleLength_(Math.max(0, handleLength));
    var handlePosition = (hostMetrics.viewTop - hostMetrics.contentTop) *
        this.ratio_;
    this.setHandlePosition(this.constrainHandle_(handlePosition));
  };

  /**
   * Recalculate a horizontal scrollbar's location within its path and length.
   * This should be called when the contents of the workspace have changed.
   * @param {!Object} hostMetrics A data structure describing all the
   *     required dimensions, possibly fetched from the host object.
   */
  ScratchBlocks.Scrollbar.prototype.resizeContentHorizontal = function(hostMetrics) {
    if (!this.pair_) {
      // Only show the scrollbar if needed.
      // Ideally this would also apply to scrollbar pairs, but that's a bigger
      // headache (due to interactions with the corner square).
      this.setVisible(this.scrollViewSize_ < hostMetrics.contentWidth);
    }

    this.ratio_ = this.scrollViewSize_ / hostMetrics.contentWidth;
    if (this.ratio_ === -Infinity || this.ratio_ === Infinity ||
        isNaN(this.ratio_)) {
      this.ratio_ = 0;
    }
    // 若_ratio趋近于0，则设置滚动条宽度为0
    var handleLength = hostMetrics.contentWidth === hostMetrics.viewWidth ? 0 : hostMetrics.viewWidth * this.ratio_;
    this.setHandleLength_(Math.max(0, handleLength));

    var handlePosition = (hostMetrics.viewLeft - hostMetrics.contentLeft) *
        this.ratio_;
    this.setHandlePosition(this.constrainHandle_(handlePosition));
  }
}
