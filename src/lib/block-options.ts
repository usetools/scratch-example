import makeToolboxXML from '@src/lib/make-toolbox-xml';

const blockOptions = {
  toolboxPosition: 'end',
  zoom: {
    wheel: true,
    // 积木缩放
    startScale: 0.8,
  },
  // 图标文件位置
  media: 'static/blocks-media/',
  colours: {
    // 代码编辑区，背景色
    workspace: '#292b32',
    // 代码抽屉区
    flyout: '#33353c',
    // 代码块分类导航区
    toolbox: '#1b1d23',
    // 代码分类导航，选中后的颜色
    toolboxSelected: '#292b32',
    // toolbox 文本颜色
    toolboxText: '#d5c1c1',
    // 滚动条颜色
    scrollbar: 'rgba(255, 255, 255, 0.2)',
    // hover状态下，滚动条颜色
    scrollbarHover: 'rgba(255, 255, 255, 0.2)',
    insertionMarker: '#000000',
    insertionMarkerOpacity: 0.2,
    fieldShadow: 'rgba(255, 255, 255, 0.3)',
    dragShadowOpacity: 0.6
  },
  // 积木xml
  toolbox: makeToolboxXML(false, false),
  comments: false,
  collapse: false,
  sounds: false
};

export default blockOptions;
