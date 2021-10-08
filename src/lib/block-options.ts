import makeToolboxXML from '@src/lib/make-toolbox-xml';

const blockOptions = {
  toolboxPosition: 'end',
  grid: {
    spacing: 40,
    length: 2,
    colour: '#ddd'
  },
  zoom: {
    wheel: true,
    // 积木缩放
    startScale: 0.8,
  },
  // 图标文件位置
  media: 'static/blocks-media/',
  colours: {
    workspace: '#F9F9F9',
    flyout: '#F9F9F9',
    toolbox: '#FFFFFF',
    toolboxSelected: '#E9EEF2',
    scrollbar: '#CECDCE',
    scrollbarHover: '#CECDCE',
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