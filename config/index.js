require('dotenv').config()
export default {
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret'
};
