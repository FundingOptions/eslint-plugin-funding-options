module.exports = {
  transform: {
    '\\.m?js$': 'babel-jest'
  },
  testPathIgnorePatterns: ['node_modules', '.cache', 'public'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'mjs']
};
