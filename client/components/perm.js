function recursiveStringPermutations(str) {
  let results = []
  getPerms(str, [])
  function getPerms(str, arr) {
    if (typeof str === 'string')
      // on first call, split the string into an array
      str = str.split('')
    if (!str.length)
      // base case - push the compiled results into the results variable
      results.push(arr.join(''))
    for (let i = 0; i < str.length; i++) {
      let letter = str.splice(i, 1)
      arr.push(letter)
      getPerms(str, arr) // recursive call
      arr.pop()
      str.splice(i, 0, letter)
    }
  }
  return results
    .filter(function(el, index) {
      return results.indexOf(el) === index // filter out non-unique words
    })
    .sort()
}
