var isEmpty = function(obj) {
  for (var key in obj)
    return false;
  return true;
}
export { isEmpty }