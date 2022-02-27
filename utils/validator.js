exports.sortValidator = (sort) => {
  let sortArray = ["id", "reads", "likes", "popularity"];
  return sortArray.includes(sort.trim().toLowerCase());
}


exports.directionValidator = (direction) => {
  let directionArray = ["desc", "asc"];
  return directionArray.includes(direction.trim().toLowerCase());
}

const sortResult = (arr, sortBy, direction) => {
  if(sortBy == "id" && direction == "asc"){
    return arr;
  }else if(sortBy == "id" && direction == "desc"){
    return arr.reverse();
  }else if(sortBy != "id" && direction == "asc"){
    arr.sort((x, y) => {
      return x[sortBy] - y[sortBy];
    });
    return arr;
  } else {
    arr.sort((x, y) => {
      return y[sortBy] - x[sortBy];
    });
    return arr;
  }
}


exports.removeDuplicate = (tags, arr, sortBy = "id", direction="asc") => {
  let arrayPost = [];
  if(tags.length < 2){
    arrayPost = arr[0].posts;
  }else{
    arrayPost = [...new Set(arr[0].posts)];
  }

  return sortResult(arrayPost, sortBy, direction);


}
