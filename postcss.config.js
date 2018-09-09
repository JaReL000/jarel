// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: [
    require('autoprefixer')({
      // browsers: require('./package.json').browserslist
      browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8']
    }),
    require('postcss-adaptive')({
      sourceMap: true ,
      remUnit: 75, //number，rem unit value（默认值：75）
      baseDpr: 2, //数字，基本设备像素比（默认值：2）
      remPrecision: 6, //数字，rem值精度（默认值：6）
      hairlineClass: 'none', //string，类名为1px border（默认'hairlines'）
      autoRem: true //boolean，是否转换为rem单位（默认值：false）
    }),
  ]
}