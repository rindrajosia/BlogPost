const rp = require('request-promise');
const {getUrlVars} = require('./helper');
const {
  sortValidator
} = require('../utils/validator');

module.exports = (url) => {

    const p = new Promise((resolve, reject) => {
      let sortBy = getUrlVars(url)["sortBy"];

      if(sortBy && !sortValidator(sortBy)){
        reject(Error({"error": "sortBy parameter is invalid"}));
      }else if((sortBy && sortValidator(sortBy)) || !sortBy ){
        rp(url).then(data => resolve(data));
      }
    })

    return p;
}
