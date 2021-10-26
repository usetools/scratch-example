/**
 * scratch-blocks/cor/workspace_svg.js 方法重新/覆盖
 **/
export default function WorkspaceSvg(ScratchBlocks) {
  /**
   * Calculate the size of a scrollable workspace, which should include room for a
   * half screen border around the workspace contents.
   * @param {!Blockly.WorkspaceSvg} ws The workspace to measure.
   * @param {!Object} svgSize An object containing height and width attributes in
   *     CSS pixels.  Together they specify the size of the visible workspace, not
   *     including areas covered up by the toolbox.
   * @return {!Object} The dimensions of the contents of the given workspace, as
   *     an object containing
   *     - height and width in pixels
   *     - left and top in pixels relative to the workspace origin.
   * @private
   */
  ScratchBlocks.WorkspaceSvg.getContentDimensionsBounded_ = function(ws, svgSize) {
    var content = ScratchBlocks.WorkspaceSvg.getContentDimensionsExact_(ws);

    // View height and width are both in pixels, and are the same as the SVG size.
    var viewWidth = svgSize.width;
    var viewHeight = svgSize.height;
    var halfWidth = viewWidth / 4;
    var halfHeight = viewHeight / 3;

    // Add a border around the content that is at least half a screenful wide.
    // Ensure border is wide enough that blocks can scroll over entire screen.
    // 内容区域，左边设置为0
    var left = 0;
    var right = Math.max(content.right + halfWidth, viewWidth);

    // 内容区域上边设置为0
    var top = 0;
    var bottom = Math.max(content.bottom + halfHeight, viewHeight);
    var dimensions = {
      left: left,
      top: top,
      height: bottom - top,
      width: right - left
    };
    return dimensions;
  }
}
