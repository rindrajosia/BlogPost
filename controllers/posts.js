const async = require("async");
const ErrorResponse = require("../utils/errorResponse");
const { default: axios } = require("axios");
const {
  removeDuplicate,
  arrayIsEmpty,
  sortValidator,
  directionValidator
} = require('../utils/validator');

exports.getPosts = (req, res, next) => {
  let tags = [];
  let sortBy = "id";
  let direction = "asc";
  if (req.query.tags) {
      tags = req.query.tags.split(',');
  }else{
    return res.status(400).json({"error": "Tags parameter is required"});
  }

  if(req.query.sortBy && !sortValidator(req.query.sortBy)){
    return res.status(400).json({"error":  "sortBy parameter is invalid"});
  }else if(req.query.sortBy && sortValidator(req.query.sortBy)){
    sortBy = req.query.sortBy;
  }

  if(req.query.direction && !directionValidator(req.query.direction)){
    return res.status(400).json({"error":  "direction parameter is invalid"});
  }else if(req.query.direction && sortValidator(req.query.direction)){
    direction = req.query.direction;
  }

  const postsArray = tags.map((tag) => {
    return async function () {
      const data = await axios.get(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}`);
      return data.data;
    }
  });

  async.parallel(postsArray, (err, result) => {
    if(err){
      return res.status(500).json({"error":  "Error"});
    }
    let uniqueValues = removeDuplicate(tags, result, sortBy, direction);
    res.status(200).json({posts: uniqueValues });
  });

};
