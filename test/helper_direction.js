const rp = require('request-promise');
const {getUrlVars} = require('./helper');
const {
  directionValidator
} = require('../utils/validator');

module.exports = (url) => {

    const p = new Promise((resolve, reject) => {
      let direction = getUrlVars(url)["direction"];
      if(direction && !directionValidator(direction)){
        reject(Error({"error": "direction parameter is invalid"}));
      }else if((direction && directionValidator(direction)) || !direction ){
        rp(url).then(data => resolve(data));
      }
    })

    return p;
}
