//import babel from 'rollup-plugin-babel';

export default {
    format: 'umd',
    entry: 'js/index.js',
    dest: 'dist/batterylevel.js',
    sourceMap: true,
    sourceMapFile: 'dist/batterylevel.js.map'
    //plugins: [ babel() ]
};