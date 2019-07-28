//publicPath is set as vue-crypto-dashboard for production you can change it according to your application
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-crypto-dashboard/' : '/' ,
  filenameHashing: false
};