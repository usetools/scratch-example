module.exports = function vertFragLoader(source) {
  const json = source.replace(/module.exports = \\"/, '')
    .replace(/\\"/, '');

  return json;
}