'use strict'

const db = require('../server/db')
const {User, Meal, Order, MealOrder} = require('../server/db/models')

const users = [
  {
    id: 1,
    firstName: 'Celie',
    lastName: 'Elman',
    email: 'celman0@uiuc.edu',
    address: '9 Nobel Alley',
    birthDate: '1981-03-05',
    password: 'Bfn6p8N'
  },
  {
    id: 2,
    firstName: 'Jenni',
    lastName: 'Geraldini',
    email: 'jgeraldini1@kickstarter.com',
    address: '3372 Mayer Park',
    birthDate: '1983-01-22',
    password: 'BKKlg3fcRgm'
  },
  {
    id: 3,
    firstName: 'Othello',
    lastName: 'Kells',
    email: 'okells2@ehow.com',
    address: '512 Graedel Park',
    birthDate: '1999-03-11',
    password: '4BUHMOrBE9yi'
  },
  {
    id: 4,
    firstName: 'Lea',
    lastName: 'Seligson',
    email: 'lseligson3@dion.ne.jp',
    address: '637 Garrison Pass',
    birthDate: '1999-07-24',
    password: 'IIpmPxTUs'
  },
  {
    id: 5,
    firstName: 'Morganne',
    lastName: 'Kenington',
    email: 'mkenington4@slideshare.net',
    address: '15135 Center Park',
    birthDate: '1997-07-02',
    password: 'XOkPRfW'
  },
  {
    id: 6,
    firstName: 'Elfrida',
    lastName: 'Trahar',
    email: 'etrahar5@businesswire.com',
    address: '45 Shopko Place',
    birthDate: '1998-07-07',
    password: 'gmEOfk4tXu'
  },
  {
    id: 7,
    firstName: 'Imogen',
    lastName: 'Jentges',
    email: 'ijentges6@kickstarter.com',
    address: '68 Holmberg Place',
    birthDate: '1992-04-03',
    password: 'dYwUhQD6'
  },
  {
    id: 8,
    firstName: 'Cherrita',
    lastName: 'Taggerty',
    email: 'ctaggerty7@mail.ru',
    address: '9 Kinsman Alley',
    birthDate: '1981-04-21',
    password: 'uF6AotGqcX'
  },
  {
    id: 9,
    firstName: 'Lory',
    lastName: 'Lissandri',
    email: 'llissandri8@netlog.com',
    address: '085 Holmberg Center',
    birthDate: '1986-08-12',
    password: 'I0PGjoBqFc'
  },
  {
    id: 10,
    firstName: 'Elena',
    lastName: 'Porteous',
    email: 'eporteous9@webmd.com',
    address: '10258 Briar Crest Court',
    birthDate: '1980-09-30',
    password: 'xWIvp13Jvaz'
  },
  {
    id: 11,
    firstName: 'Lynnette',
    lastName: 'Dorran',
    email: 'ldorrana@engadget.com',
    address: '7 Shoshone Point',
    birthDate: '1995-11-12',
    password: 'qdOGQaVCKNd'
  },
  {
    id: 12,
    firstName: 'Darryl',
    lastName: 'Gilkes',
    email: 'dgilkesb@drupal.org',
    address: '16 Portage Avenue',
    birthDate: '1988-11-13',
    password: '7jXvz2jRBsg5'
  },
  {
    id: 13,
    firstName: 'Karrie',
    lastName: 'Khosa',
    email: 'kkhosac@goodreads.com',
    address: '7812 Gale Court',
    birthDate: '1984-04-20',
    password: '5gljv8k'
  },
  {
    id: 14,
    firstName: 'Rhoda',
    lastName: 'Blaise',
    email: 'rblaised@businessweek.com',
    address: '9795 Memorial Circle',
    birthDate: '1997-07-29',
    password: 'Q4yvbRmCjpl'
  },
  {
    id: 15,
    firstName: 'Clemens',
    lastName: 'Tzar',
    email: 'ctzare@scientificamerican.com',
    address: '45689 Pierstorff Lane',
    birthDate: '1987-07-01',
    password: 'iLdT6k'
  },
  {
    id: 16,
    firstName: 'Timmy',
    lastName: 'Camidge',
    email: 'tcamidgef@ovh.net',
    address: '1 Nancy Junction',
    birthDate: '1993-07-11',
    password: 'RrxdGbXK96Ai'
  },
  {
    id: 17,
    firstName: 'Itch',
    lastName: 'Sandels',
    email: 'isandelsg@nhs.uk',
    address: '451 Twin Pines Hill',
    birthDate: '1988-10-23',
    password: 'AVR9EPhWok6G'
  },
  {
    id: 18,
    firstName: 'Ivar',
    lastName: 'Oneil',
    email: 'ioneilh@a8.net',
    address: '00 Arrowood Terrace',
    birthDate: '1984-03-07',
    password: 'HwkR0T2uS'
  },
  {
    id: 19,
    firstName: 'Mavra',
    lastName: 'Chominski',
    email: 'mchominskii@booking.com',
    address: '347 Grim Road',
    birthDate: '1989-07-30',
    password: 'I5IPpSMQO'
  },
  {
    id: 20,
    firstName: 'Cozmo',
    lastName: 'Spottiswoode',
    email: 'cspottiswoodej@amazon.de',
    address: '389 Lakewood Way',
    birthDate: '2000-01-07',
    password: 'a9keXAq8dx'
  },
  {
    id: 21,
    firstName: 'Norma',
    lastName: 'Gregol',
    email: 'ngregolk@webs.com',
    address: '02 Hayes Hill',
    birthDate: '1982-03-21',
    password: '0qKjwYm5M'
  },
  {
    id: 22,
    firstName: 'Zola',
    lastName: 'Bysouth',
    email: 'zbysouthl@photobucket.com',
    address: '04687 Kedzie Point',
    birthDate: '1990-09-26',
    password: 'uBX5SRAdXb'
  },
  {
    id: 23,
    firstName: 'Kamila',
    lastName: 'Kirstein',
    email: 'kkirsteinm@mashable.com',
    address: '32599 Graceland Road',
    birthDate: '1993-12-23',
    password: 'y6g7d0gmAct'
  },
  {
    id: 24,
    firstName: 'Maurita',
    lastName: 'De Cruze',
    email: 'mdecruzen@last.fm',
    address: '651 Waywood Drive',
    birthDate: '1985-11-17',
    password: 'HddJ3Y6teF'
  },
  {
    id: 25,
    firstName: 'Emerson',
    lastName: 'Petticrew',
    email: 'epetticrewo@geocities.com',
    address: '95 Rutledge Place',
    birthDate: '1984-05-12',
    password: 'lkNCKmFu'
  },
  {
    id: 26,
    firstName: 'Edan',
    lastName: 'Tidswell',
    email: 'etidswellp@jigsy.com',
    address: '08 Dovetail Road',
    birthDate: '1997-07-02',
    password: 'LgayeJr'
  },
  {
    id: 27,
    firstName: 'Merl',
    lastName: 'Dorking',
    email: 'mdorkingq@bbb.org',
    address: '9 Upham Parkway',
    birthDate: '1992-02-24',
    password: 'ieecHT4'
  },
  {
    id: 28,
    firstName: 'Juditha',
    lastName: 'Coweuppe',
    email: 'jcoweupper@latimes.com',
    address: '550 8th Road',
    birthDate: '1990-06-21',
    password: 'Y6BvUqsPbCMI'
  },
  {
    id: 29,
    firstName: 'Vonny',
    lastName: 'Wauchope',
    email: 'vwauchopes@apache.org',
    address: '0860 Grover Park',
    birthDate: '1995-01-27',
    password: 'hhjNgaFVj'
  },
  {
    id: 30,
    firstName: 'Erica',
    lastName: 'Berrington',
    email: 'eberringtont@redcross.org',
    address: '8 Prairie Rose Trail',
    birthDate: '1980-09-20',
    password: 'DNDnREZts'
  },
  {
    id: 31,
    firstName: 'Vania',
    lastName: 'Slemmonds',
    email: 'vslemmondsu@macromedia.com',
    address: '0 Moose Circle',
    birthDate: '2000-06-29',
    password: 'Cm7Mb5g'
  },
  {
    id: 32,
    firstName: 'Rozamond',
    lastName: 'Godfree',
    email: 'rgodfreev@bing.com',
    address: '523 Mayfield Place',
    birthDate: '2000-07-17',
    password: 'VPRCAtTCj'
  },
  {
    id: 33,
    firstName: 'Kenon',
    lastName: 'Tretwell',
    email: 'ktretwellw@goo.gl',
    address: '15 Darwin Circle',
    birthDate: '1985-05-10',
    password: 'ruW7PTp'
  },
  {
    id: 34,
    firstName: 'Tonya',
    lastName: 'Gregoriou',
    email: 'tgregorioux@friendfeed.com',
    address: '3 Barby Point',
    birthDate: '1997-01-01',
    password: '5snTDLWOd2'
  },
  {
    id: 35,
    firstName: 'Huntley',
    lastName: 'Coard',
    email: 'hcoardy@flavors.me',
    address: '15 Esker Alley',
    birthDate: '1982-03-29',
    password: 'MXc6mEaaH'
  },
  {
    id: 36,
    firstName: 'Reese',
    lastName: 'Braiden',
    email: 'rbraidenz@alibaba.com',
    address: '624 Vidon Junction',
    birthDate: '1996-02-01',
    password: 'Hk6f7K'
  },
  {
    id: 37,
    firstName: 'Fayth',
    lastName: 'Shilvock',
    email: 'fshilvock10@ihg.com',
    address: '9056 Sutherland Trail',
    birthDate: '1990-12-27',
    password: '1PSrdx5i'
  },
  {
    id: 38,
    firstName: 'Gard',
    lastName: 'Dyble',
    email: 'gdyble11@house.gov',
    address: '32 Sachtjen Alley',
    birthDate: '1990-04-15',
    password: '4NFJ0g'
  },
  {
    id: 39,
    firstName: 'Zachary',
    lastName: 'Barbary',
    email: 'zbarbary12@usgs.gov',
    address: '23665 Cascade Park',
    birthDate: '1994-07-07',
    password: '8obZRfIb'
  },
  {
    id: 40,
    firstName: 'Alan',
    lastName: 'Wensley',
    email: 'awensley13@edublogs.org',
    address: '8 Paget Hill',
    birthDate: '1989-12-22',
    password: 'Fcf5r2E'
  },
  {
    id: 41,
    firstName: 'Cathrin',
    lastName: 'Sheber',
    email: 'csheber14@businesswire.com',
    address: '6582 Forest Drive',
    birthDate: '1993-04-30',
    password: 'QGYuYflUBO'
  },
  {
    id: 42,
    firstName: 'Gerry',
    lastName: 'Fieldgate',
    email: 'gfieldgate15@biblegateway.com',
    address: '2 Columbus Lane',
    birthDate: '1986-01-19',
    password: 'FxgVkTpTdf'
  },
  {
    id: 43,
    firstName: 'Lodovico',
    lastName: 'Bartle',
    email: 'lbartle16@printfriendly.com',
    address: '155 Marcy Street',
    birthDate: '1985-12-01',
    password: '2EbV1YcUu'
  },
  {
    id: 44,
    firstName: 'Boycey',
    lastName: 'Rapper',
    email: 'brapper17@illinois.edu',
    address: '85046 Rutledge Lane',
    birthDate: '1992-12-27',
    password: 'J34EjD7'
  },
  {
    id: 45,
    firstName: 'Jeannette',
    lastName: 'Senten',
    email: 'jsenten18@webs.com',
    address: '91 Lotheville Junction',
    birthDate: '1997-10-24',
    password: '9HWdL03Z'
  },
  {
    id: 46,
    firstName: 'Brittany',
    lastName: 'Allso',
    email: 'ballso19@php.net',
    address: '0 Algoma Trail',
    birthDate: '1985-07-13',
    password: 'XGvQIccq'
  },
  {
    id: 47,
    firstName: 'Whitney',
    lastName: 'Cana',
    email: 'wcana1a@geocities.com',
    address: '5 Texas Junction',
    birthDate: '1990-07-20',
    password: '1c9fJWcXslM9'
  },
  {
    id: 48,
    firstName: 'Marylin',
    lastName: 'Rispen',
    email: 'mrispen1b@ftc.gov',
    address: '4788 Lunder Circle',
    birthDate: '1981-09-24',
    password: '88rWIS'
  },
  {
    id: 49,
    firstName: 'Bruis',
    lastName: 'Christofle',
    email: 'bchristofle1c@blogger.com',
    address: '476 Dexter Lane',
    birthDate: '1995-06-05',
    password: 'iEtCKt2Q'
  },
  {
    id: 50,
    firstName: 'Cyril',
    lastName: 'Tallow',
    email: 'ctallow1d@sciencedirect.com',
    address: '4 High Crossing Point',
    birthDate: '1994-05-06',
    password: 'tPIQGK'
  }
]

const meals = [
  {
    name: 'Ribs',
    image:
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/7/21/3/FNM_090115-Best-Barbecue-Ribs-Ever-Recipe_s4x3.jpg.rend.hgtvcom.826.620.suffix/1437691887821.jpeg',
    description:
      'Best Barbecue Ribs Ever. Unbelievably tender and tasty. This is the only way You will eat ribs from now on',
    calories: 600,
    ingredients: [
      'sugar',
      'chili powder',
      'salt and freshly ground black pepper',
      'oregano',
      'cayenne pepper',
      'garlic powder',
      'onion powder',
      '2 racks baby back ribs',
      'chicken broth',
      'apple cider vinegar',
      'barbecue sauce'
    ]
  },
  {
    name: 'Spaghetti alla Carbonara',
    image:
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/6/12/2/FO1D41_23785_s4x3.jpg.rend.hgtvcom.826.620.suffix/1431766590243.jpeg',
    description:
      'One of the best recipes Spaghetti alla Carbonara you will found!',
    calories: 700,
    ingredients: [
      'spaghetti',
      'extra-virgin olive oil',
      'bacon, cubed or sliced into small strips',
      'garlic cloves, finely chopped',
      'eggs',
      'freshly grated Parmigiano-Reggiano, plus more for serving',
      'black pepper',
      'fresh flat-leaf parsley, chopped'
    ]
  },
  {
    name: 'Grilled Steak',
    image:
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2010/4/26/0/FNM_060110-Bobby-Grilling-013_s4x3.jpg.rend.hgtvcom.826.620.suffix/1382539247827.jpeg',
    description: 'Perfectly Grilled Steak',
    calories: 500,
    ingredients: [
      '1 1/4-to-1 1/2-inch-thick boneless rib-eye or New York strip steaks (about 12 ounces each) or filets mignons (8 to 10 ounces each), trimmed',
      'canola or extra-virgin olive oil',
      'salt and freshly ground pepper'
    ]
  },
  {
    name: 'Seared Salmon & Miso-Butter Glaze',
    image:
      'https://media.blueapron.com/recipes/22171/square_newsletter_images/1562687446-33-0025-8899/0805_2PF-Salmon_4441_SQ_hi_res.jpg',
    description:
      'This simple, sophisticated dish features flaky salmon, cooked with an irresistibly rich glaze made from butter and miso paste until browned and tender. A side of sautéed corn and snow peas makes for a naturally sweet, seasonal accompaniment, while a bed of fluffy jasmine rice rounds out the dish on a hearty note.',
    calories: 500,
    ingredients: [
      'Skin-On Salmon Fillet',
      'Jasmine Rice',
      'Snow Peas',
      'Of Corn',
      'Garlic',
      'Sweet White Miso Paste',
      'Butter',
      'Mirin',
      'Vegetable Demi-Glace'
    ]
  },
  {
    name: 'Caribbean-Spiced Chicken Thighs',
    image:
      'https://media.blueapron.com/recipes/22318/square_newsletter_images/1563207469-34-0004-6645/0415_2PM_Caribbean-Chicken_0017_Square_hi_res.jpg',
    description:
      'This summer, we’re bringing you 12 weeks of recipes designed with busy schedules and flexibility in mind. We’re celebrating the bold, exciting flavors of West Indian cuisine with this recipe, which features chicken coated with spices like green bell pepper powder, cayenne, and allspice, then served over cooling coconut rice.',
    calories: 800,
    ingredients: [
      'Boneless, Skinless Chicken Thighs',
      'Jasmine Rice',
      'Light Coconut Milk',
      'Persian Cucumber',
      'Sweet Peppers',
      'Sugar',
      'Apple Cider Vinegar',
      'Mayonnaise',
      'Sambal Oelek',
      'Caribbean Spice Blend (Green Bell Pepper Powder, Onion Powder, Cayenne Pepper, Ground Thyme & Ground Allspice)'
    ]
  },
  {
    name: 'Caramelized Onion & Cheddar Beyond Burgers',
    image:
      'https://media.blueapron.com/recipes/22488/square_newsletter_images/1563983848-34-0049-6496/0819_2PRE07_White-Cheddar-Burger_4748_sq_Web_hi_res.jpg',
    description:
      'Chefs, we’re excited to introduce you to the star of this delicious recipe, the plant-based Beyond Burger™, which gets a gourmet lift from two of our favorite toppings: melty white cheddar and sweet onion caramelized with balsamic vinegar.',
    calories: 800,
    ingredients: [
      'Beyond Burger ™ Plant-Based',
      'Potato Buns',
      'Garlic',
      'Green Beans',
      'White Cheddar Cheese',
      'Balsamic Vinegar',
      'Italian Seasoning (Whole Dried Basil, Sage, Oregano, Savory, Rosemary, Thyme & Marjoram)',
      'Pickled Peruvian Peppers',
      'Apple Cider Vinegar',
      'Sweet Onion'
    ]
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )

  await Promise.all(
    meals.map(meal => {
      return Meal.create(meal)
    })
  )

  // console.log(`seeded ${addedUsers.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
