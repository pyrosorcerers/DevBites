const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

/* This function receives two inputs: (1) a "recipeLinks" array and (2) an HTML
document of the recipe cookbook page from blueapron.com/cookbook scraped through
cheerio.js. The function pushes the links into the given "recipeLinks" array */
const getLinks = (recipeLinks, html) => {
  const $ = cheerio.load(html)
  const thumbnails = $('div.recipe-thumb')
  for (let i = 0; i < thumbnails.length; i++) {
    recipeLinks.push(
      `https://www.blueapron.com${$(thumbnails[i])
        .find('a')
        .attr('href')}`
    )
  }
}

/* This function receives two inputs: (1) a "recipes" array and (2) an HTML
document of a singleRecipe page from blueapron.com/recipe scraped through
cheerio.js. The function pushes "recipe" objects (with name, image, desccription,
calories, ingredients, price) into the given "recipes" array */
const getData = (recipes, html) => {
  const $ = cheerio.load(html)
  const recipe = {}
  recipe.name = $('h1.ba-recipe-title__main')
    .text()
    .trim()
    .split('\n')[0]
  recipe.image = $('div.ba-hero-image__hldr')
    .find('img.img-max')
    .attr('src')
  recipe.description = $('div.recipe-main__description')
    .find('p')
    .text()
    .trim()
  recipe.calories = $('div.js-NutritionCalories')
    .find('span')
    .find('span')
    .text()
  recipe.ingredients = []
  recipe.price = Math.floor(Math.random() * 5) + 15
  const ingredients = $("*[itemprop = 'ingredients']")
  for (let i = 0; i < ingredients.length; i++) {
    recipe.ingredients.push(
      $(ingredients[i])
        .find('div.non-story, a.js-IngModalLink')
        .text()
        .trim()
        .split('\n')[3]
    )
  }
  recipes.push(recipe)
}

/* This function returns an array of all the recipe objects inside a list of
recipes rendered on "https://www.blueapron.com/cookbook" */
const createMagicRecipes = async () => {
  const recipeLinks = []
  const recipes = []
  await axios
    .get('https://www.blueapron.com/cookbook')
    .then(response => {
      getLinks(recipeLinks, response.data)
    })
    .catch(error => {
      console.error(error)
    })
  const promises = recipeLinks.map(async link => {
    await axios
      .get(link)
      .then(response => {
        getData(recipes, response.data)
      })
      .catch(error => {
        console.error(error)
      })
  })
  await Promise.all(promises)
  writeRecipesArraytoJSONFile(recipes)
}

/* This function takes the recipes array and writes a JSON formatted file
of the array to the local directory */
const writeRecipesArraytoJSONFile = recipes => {
  const json = JSON.stringify(recipes)
  fs.writeFile(`${__dirname}/recipes.json`, json, 'utf8', err => {
    if (err) throw err
  })
}

createMagicRecipes()
