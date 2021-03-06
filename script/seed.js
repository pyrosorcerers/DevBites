'use strict'

const db = require('../server/db')
const {User, Meal, Order, MealOrder} = require('../server/db/models')

const mealOrders = [
  {quantity: 3, mealId: 1, orderId: 1},
  {quantity: 1, mealId: 1, orderId: 19},
  {quantity: 2, mealId: 2, orderId: 6},
  {quantity: 1, mealId: 2, orderId: 11},
  {quantity: 1, mealId: 2, orderId: 23},
  {quantity: 2, mealId: 2, orderId: 26},
  {quantity: 1, mealId: 2, orderId: 27},
  {quantity: 2, mealId: 2, orderId: 30},
  {quantity: 3, mealId: 3, orderId: 2},
  {quantity: 2, mealId: 3, orderId: 6},
  {quantity: 4, mealId: 3, orderId: 4},
  {quantity: 4, mealId: 3, orderId: 9},
  {quantity: 2, mealId: 3, orderId: 13},
  {quantity: 4, mealId: 3, orderId: 28},
  {quantity: 2, mealId: 4, orderId: 4},
  {quantity: 2, mealId: 4, orderId: 13},
  {quantity: 1, mealId: 4, orderId: 24},
  {quantity: 2, mealId: 4, orderId: 25},
  {quantity: 1, mealId: 5, orderId: 2},
  {quantity: 4, mealId: 5, orderId: 3},
  {quantity: 3, mealId: 5, orderId: 21},
  {quantity: 2, mealId: 5, orderId: 24},
  {quantity: 1, mealId: 5, orderId: 22},
  {quantity: 2, mealId: 5, orderId: 26},
  {quantity: 4, mealId: 5, orderId: 27},
  {quantity: 3, mealId: 5, orderId: 30},
  {quantity: 1, mealId: 6, orderId: 1},
  {quantity: 3, mealId: 6, orderId: 5},
  {quantity: 2, mealId: 6, orderId: 25},
  {quantity: 4, mealId: 6, orderId: 26},
  {quantity: 1, mealId: 6, orderId: 28},
  {quantity: 4, mealId: 7, orderId: 14},
  {quantity: 3, mealId: 7, orderId: 20},
  {quantity: 2, mealId: 7, orderId: 28},
  {quantity: 2, mealId: 8, orderId: 5},
  {quantity: 4, mealId: 8, orderId: 6},
  {quantity: 1, mealId: 8, orderId: 19},
  {quantity: 4, mealId: 8, orderId: 10},
  {quantity: 1, mealId: 8, orderId: 11},
  {quantity: 4, mealId: 8, orderId: 22},
  {quantity: 2, mealId: 9, orderId: 1},
  {quantity: 1, mealId: 9, orderId: 2},
  {quantity: 3, mealId: 9, orderId: 5},
  {quantity: 2, mealId: 9, orderId: 9},
  {quantity: 3, mealId: 9, orderId: 25},
  {quantity: 3, mealId: 10, orderId: 1},
  {quantity: 1, mealId: 10, orderId: 5},
  {quantity: 1, mealId: 10, orderId: 9},
  {quantity: 4, mealId: 10, orderId: 14},
  {quantity: 3, mealId: 10, orderId: 24},
  {quantity: 3, mealId: 10, orderId: 27},
  {quantity: 3, mealId: 11, orderId: 2},
  {quantity: 1, mealId: 11, orderId: 8},
  {quantity: 3, mealId: 11, orderId: 11},
  {quantity: 3, mealId: 11, orderId: 18},
  {quantity: 3, mealId: 11, orderId: 23},
  {quantity: 3, mealId: 11, orderId: 20},
  {quantity: 4, mealId: 11, orderId: 28},
  {quantity: 4, mealId: 11, orderId: 29},
  {quantity: 4, mealId: 12, orderId: 3},
  {quantity: 4, mealId: 12, orderId: 1},
  {quantity: 3, mealId: 12, orderId: 12},
  {quantity: 2, mealId: 12, orderId: 20},
  {quantity: 3, mealId: 12, orderId: 16},
  {quantity: 1, mealId: 12, orderId: 24},
  {quantity: 1, mealId: 13, orderId: 2},
  {quantity: 3, mealId: 13, orderId: 6},
  {quantity: 2, mealId: 13, orderId: 11},
  {quantity: 3, mealId: 13, orderId: 21},
  {quantity: 2, mealId: 13, orderId: 24},
  {quantity: 1, mealId: 13, orderId: 27},
  {quantity: 1, mealId: 14, orderId: 7},
  {quantity: 2, mealId: 14, orderId: 14},
  {quantity: 3, mealId: 14, orderId: 27},
  {quantity: 4, mealId: 14, orderId: 29},
  {quantity: 3, mealId: 15, orderId: 13},
  {quantity: 1, mealId: 15, orderId: 18},
  {quantity: 3, mealId: 15, orderId: 22},
  {quantity: 4, mealId: 15, orderId: 23},
  {quantity: 2, mealId: 15, orderId: 24},
  {quantity: 1, mealId: 15, orderId: 25},
  {quantity: 4, mealId: 15, orderId: 30},
  {quantity: 3, mealId: 15, orderId: 21},
  {quantity: 4, mealId: 16, orderId: 3},
  {quantity: 2, mealId: 16, orderId: 4},
  {quantity: 3, mealId: 16, orderId: 7},
  {quantity: 3, mealId: 16, orderId: 10},
  {quantity: 1, mealId: 16, orderId: 21},
  {quantity: 4, mealId: 16, orderId: 23},
  {quantity: 2, mealId: 16, orderId: 25},
  {quantity: 1, mealId: 17, orderId: 2},
  {quantity: 3, mealId: 17, orderId: 18},
  {quantity: 1, mealId: 17, orderId: 3},
  {quantity: 4, mealId: 17, orderId: 5},
  {quantity: 1, mealId: 17, orderId: 8},
  {quantity: 4, mealId: 17, orderId: 11},
  {quantity: 4, mealId: 17, orderId: 14},
  {quantity: 3, mealId: 17, orderId: 16},
  {quantity: 1, mealId: 17, orderId: 17},
  {quantity: 3, mealId: 17, orderId: 27},
  {quantity: 4, mealId: 18, orderId: 2},
  {quantity: 4, mealId: 18, orderId: 3},
  {quantity: 4, mealId: 18, orderId: 11},
  {quantity: 1, mealId: 18, orderId: 19},
  {quantity: 1, mealId: 18, orderId: 21},
  {quantity: 4, mealId: 19, orderId: 15},
  {quantity: 1, mealId: 19, orderId: 7},
  {quantity: 2, mealId: 19, orderId: 12},
  {quantity: 2, mealId: 19, orderId: 13},
  {quantity: 1, mealId: 19, orderId: 18},
  {quantity: 4, mealId: 19, orderId: 19},
  {quantity: 3, mealId: 19, orderId: 25},
  {quantity: 1, mealId: 19, orderId: 26},
  {quantity: 1, mealId: 20, orderId: 3},
  {quantity: 2, mealId: 20, orderId: 7},
  {quantity: 4, mealId: 20, orderId: 14},
  {quantity: 1, mealId: 20, orderId: 20},
  {quantity: 1, mealId: 20, orderId: 24},
  {quantity: 3, mealId: 20, orderId: 23},
  {quantity: 3, mealId: 21, orderId: 2},
  {quantity: 3, mealId: 21, orderId: 6},
  {quantity: 3, mealId: 21, orderId: 9},
  {quantity: 4, mealId: 21, orderId: 17},
  {quantity: 4, mealId: 21, orderId: 22},
  {quantity: 1, mealId: 22, orderId: 2},
  {quantity: 1, mealId: 22, orderId: 3},
  {quantity: 1, mealId: 22, orderId: 13},
  {quantity: 4, mealId: 22, orderId: 15},
  {quantity: 2, mealId: 22, orderId: 19},
  {quantity: 2, mealId: 22, orderId: 21},
  {quantity: 3, mealId: 23, orderId: 2},
  {quantity: 2, mealId: 23, orderId: 3},
  {quantity: 4, mealId: 23, orderId: 7},
  {quantity: 3, mealId: 23, orderId: 8},
  {quantity: 2, mealId: 23, orderId: 18},
  {quantity: 2, mealId: 23, orderId: 22},
  {quantity: 2, mealId: 24, orderId: 12},
  {quantity: 3, mealId: 24, orderId: 14},
  {quantity: 1, mealId: 24, orderId: 21},
  {quantity: 4, mealId: 24, orderId: 23},
  {quantity: 1, mealId: 25, orderId: 2},
  {quantity: 2, mealId: 25, orderId: 10},
  {quantity: 1, mealId: 25, orderId: 17},
  {quantity: 4, mealId: 26, orderId: 1},
  {quantity: 2, mealId: 26, orderId: 20},
  {quantity: 4, mealId: 26, orderId: 21},
  {quantity: 4, mealId: 27, orderId: 4},
  {quantity: 2, mealId: 27, orderId: 6},
  {quantity: 4, mealId: 27, orderId: 25},
  {quantity: 2, mealId: 27, orderId: 26},
  {quantity: 3, mealId: 27, orderId: 28},
  {quantity: 1, mealId: 28, orderId: 9},
  {quantity: 1, mealId: 28, orderId: 10},
  {quantity: 2, mealId: 28, orderId: 14},
  {quantity: 3, mealId: 28, orderId: 21},
  {quantity: 1, mealId: 28, orderId: 27},
  {quantity: 3, mealId: 28, orderId: 29},
  {quantity: 4, mealId: 29, orderId: 19},
  {quantity: 4, mealId: 29, orderId: 22},
  {quantity: 2, mealId: 30, orderId: 2},
  {quantity: 2, mealId: 30, orderId: 3},
  {quantity: 2, mealId: 30, orderId: 4},
  {quantity: 4, mealId: 30, orderId: 6},
  {quantity: 1, mealId: 30, orderId: 8},
  {quantity: 3, mealId: 30, orderId: 9},
  {quantity: 1, mealId: 30, orderId: 25},
  {quantity: 1, mealId: 30, orderId: 27},
  {quantity: 1, mealId: 30, orderId: 30},
  {quantity: 4, mealId: 31, orderId: 10},
  {quantity: 3, mealId: 31, orderId: 18},
  {quantity: 2, mealId: 31, orderId: 19},
  {quantity: 3, mealId: 31, orderId: 30},
  {quantity: 2, mealId: 32, orderId: 5},
  {quantity: 3, mealId: 32, orderId: 8},
  {quantity: 4, mealId: 32, orderId: 10},
  {quantity: 3, mealId: 32, orderId: 14},
  {quantity: 1, mealId: 33, orderId: 3},
  {quantity: 2, mealId: 33, orderId: 22},
  {quantity: 1, mealId: 33, orderId: 30},
  {quantity: 2, mealId: 34, orderId: 4},
  {quantity: 4, mealId: 34, orderId: 9},
  {quantity: 3, mealId: 34, orderId: 14},
  {quantity: 3, mealId: 34, orderId: 19},
  {quantity: 4, mealId: 34, orderId: 22},
  {quantity: 4, mealId: 34, orderId: 23},
  {quantity: 2, mealId: 34, orderId: 24},
  {quantity: 3, mealId: 35, orderId: 6},
  {quantity: 4, mealId: 35, orderId: 8},
  {quantity: 1, mealId: 35, orderId: 10},
  {quantity: 2, mealId: 35, orderId: 12},
  {quantity: 2, mealId: 35, orderId: 20},
  {quantity: 2, mealId: 35, orderId: 21},
  {quantity: 2, mealId: 35, orderId: 24},
  {quantity: 4, mealId: 35, orderId: 27},
  {quantity: 2, mealId: 35, orderId: 28},
  {quantity: 1, mealId: 36, orderId: 5},
  {quantity: 4, mealId: 36, orderId: 9},
  {quantity: 3, mealId: 36, orderId: 11},
  {quantity: 2, mealId: 36, orderId: 13},
  {quantity: 3, mealId: 36, orderId: 29}
]

const orders = [
  {userId: 1, isCart: true},
  {userId: 2, isCart: true},
  {userId: 2, isCart: false},
  {userId: 2, isCart: false},
  {userId: 3, isCart: true},
  {userId: 3, isCart: false},
  {userId: 3, isCart: false},
  {userId: 3, isCart: false},
  {userId: 3, isCart: false},
  {userId: 3, isCart: false},
  {userId: 4, isCart: true},
  {userId: 4, isCart: false},
  {userId: 5, isCart: false},
  {userId: 5, isCart: true},
  {userId: 6, isCart: true},
  {userId: 6, isCart: false},
  {userId: 6, isCart: false},
  {userId: 6, isCart: false},
  {userId: 7, isCart: true},
  {userId: 7, isCart: false},
  {userId: 8, isCart: true},
  {userId: 8, isCart: false},
  {userId: 9, isCart: true},
  {userId: 9, isCart: false},
  {userId: 9, isCart: false},
  {userId: 9, isCart: false},
  {userId: 9, isCart: false},
  {userId: 10, isCart: true},
  {userId: 10, isCart: false},
  {userId: 10, isCart: false}
]

const users = [
  {
    firstName: 'Celie',
    lastName: 'Elman',
    email: 'celman0@uiuc.edu',
    address: '9 Nobel Alley',
    password: 'Bfn6p8N'
  },
  {
    firstName: 'Jenni',
    lastName: 'Geraldini',
    email: 'jgeraldini1@kickstarter.com',
    address: '3372 Mayer Park',
    password: 'BKKlg3fcRgm'
  },
  {
    firstName: 'Othello',
    lastName: 'Kells',
    email: 'okells2@ehow.com',
    address: '512 Graedel Park',
    password: '4BUHMOrBE9yi'
  },
  {
    firstName: 'Lea',
    lastName: 'Seligson',
    email: 'lseligson3@dion.ne.jp',
    address: '637 Garrison Pass',
    password: 'IIpmPxTUs'
  },
  {
    firstName: 'Morganne',
    lastName: 'Kenington',
    email: 'mkenington4@slideshare.net',
    address: '15135 Center Park',
    password: 'XOkPRfW'
  },
  {
    firstName: 'Elfrida',
    lastName: 'Trahar',
    email: 'etrahar5@businesswire.com',
    address: '45 Shopko Place',
    password: 'gmEOfk4tXu'
  },
  {
    firstName: 'Imogen',
    lastName: 'Jentges',
    email: 'ijentges6@kickstarter.com',
    address: '68 Holmberg Place',
    password: 'dYwUhQD6'
  },
  {
    firstName: 'Cherrita',
    lastName: 'Taggerty',
    email: 'ctaggerty7@mail.ru',
    address: '9 Kinsman Alley',
    password: 'uF6AotGqcX'
  },
  {
    firstName: 'Lory',
    lastName: 'Lissandri',
    email: 'llissandri8@netlog.com',
    address: '085 Holmberg Center',
    password: 'I0PGjoBqFc'
  },
  {
    firstName: 'Elena',
    lastName: 'Porteous',
    email: 'eporteous9@webmd.com',
    address: '10258 Briar Crest Court',
    password: 'xWIvp13Jvaz'
  },
  {
    firstName: 'Lynnette',
    lastName: 'Dorran',
    email: 'ldorrana@engadget.com',
    address: '7 Shoshone Point',
    password: 'qdOGQaVCKNd'
  },
  {
    firstName: 'Darryl',
    lastName: 'Gilkes',
    email: 'dgilkesb@drupal.org',
    address: '16 Portage Avenue',
    password: '7jXvz2jRBsg5'
  },
  {
    firstName: 'Karrie',
    lastName: 'Khosa',
    email: 'kkhosac@goodreads.com',
    address: '7812 Gale Court',
    password: '5gljv8k'
  },
  {
    firstName: 'Rhoda',
    lastName: 'Blaise',
    email: 'rblaised@businessweek.com',
    address: '9795 Memorial Circle',
    password: 'Q4yvbRmCjpl'
  },
  {
    firstName: 'Clemens',
    lastName: 'Tzar',
    email: 'ctzare@scientificamerican.com',
    address: '45689 Pierstorff Lane',
    password: 'iLdT6k'
  },
  {
    firstName: 'Timmy',
    lastName: 'Camidge',
    email: 'tcamidgef@ovh.net',
    address: '1 Nancy Junction',
    password: 'RrxdGbXK96Ai'
  },
  {
    firstName: 'Itch',
    lastName: 'Sandels',
    email: 'isandelsg@nhs.uk',
    address: '451 Twin Pines Hill',
    password: 'AVR9EPhWok6G'
  },
  {
    firstName: 'Ivar',
    lastName: 'Oneil',
    email: 'ioneilh@a8.net',
    address: '00 Arrowood Terrace',
    password: 'HwkR0T2uS'
  },
  {
    firstName: 'Mavra',
    lastName: 'Chominski',
    email: 'mchominskii@booking.com',
    address: '347 Grim Road',
    password: 'I5IPpSMQO'
  },
  {
    firstName: 'Cozmo',
    lastName: 'Spottiswoode',
    email: 'cspottiswoodej@amazon.de',
    address: '389 Lakewood Way',
    password: 'a9keXAq8dx'
  },
  {
    firstName: 'Norma',
    lastName: 'Gregol',
    email: 'ngregolk@webs.com',
    address: '02 Hayes Hill',
    password: '0qKjwYm5M'
  },
  {
    firstName: 'Zola',
    lastName: 'Bysouth',
    email: 'zbysouthl@photobucket.com',
    address: '04687 Kedzie Point',
    password: 'uBX5SRAdXb'
  },
  {
    firstName: 'Kamila',
    lastName: 'Kirstein',
    email: 'kkirsteinm@mashable.com',
    address: '32599 Graceland Road',
    password: 'y6g7d0gmAct'
  },
  {
    firstName: 'Maurita',
    lastName: 'De Cruze',
    email: 'mdecruzen@last.fm',
    address: '651 Waywood Drive',
    password: 'HddJ3Y6teF'
  },
  {
    firstName: 'Emerson',
    lastName: 'Petticrew',
    email: 'epetticrewo@geocities.com',
    address: '95 Rutledge Place',
    password: 'lkNCKmFu'
  },
  {
    firstName: 'Edan',
    lastName: 'Tidswell',
    email: 'etidswellp@jigsy.com',
    address: '08 Dovetail Road',
    password: 'LgayeJr'
  },
  {
    firstName: 'Merl',
    lastName: 'Dorking',
    email: 'mdorkingq@bbb.org',
    address: '9 Upham Parkway',
    password: 'ieecHT4'
  },
  {
    firstName: 'Juditha',
    lastName: 'Coweuppe',
    email: 'jcoweupper@latimes.com',
    address: '550 8th Road',
    password: 'Y6BvUqsPbCMI'
  },
  {
    firstName: 'Vonny',
    lastName: 'Wauchope',
    email: 'vwauchopes@apache.org',
    address: '0860 Grover Park',
    password: 'hhjNgaFVj'
  },
  {
    firstName: 'Erica',
    lastName: 'Berrington',
    email: 'eberringtont@redcross.org',
    address: '8 Prairie Rose Trail',
    password: 'DNDnREZts'
  },
  {
    firstName: 'Vania',
    lastName: 'Slemmonds',
    email: 'vslemmondsu@macromedia.com',
    address: '0 Moose Circle',
    password: 'Cm7Mb5g'
  },
  {
    firstName: 'Rozamond',
    lastName: 'Godfree',
    email: 'rgodfreev@bing.com',
    address: '523 Mayfield Place',
    password: 'VPRCAtTCj'
  },
  {
    firstName: 'Kenon',
    lastName: 'Tretwell',
    email: 'ktretwellw@goo.gl',
    address: '15 Darwin Circle',
    password: 'ruW7PTp'
  },
  {
    firstName: 'Tonya',
    lastName: 'Gregoriou',
    email: 'tgregorioux@friendfeed.com',
    address: '3 Barby Point',
    password: '5snTDLWOd2'
  },
  {
    firstName: 'Huntley',
    lastName: 'Coard',
    email: 'hcoardy@flavors.me',
    address: '15 Esker Alley',
    password: 'MXc6mEaaH'
  },
  {
    firstName: 'Reese',
    lastName: 'Braiden',
    email: 'rbraidenz@alibaba.com',
    address: '624 Vidon Junction',
    password: 'Hk6f7K'
  },
  {
    firstName: 'Fayth',
    lastName: 'Shilvock',
    email: 'fshilvock10@ihg.com',
    address: '9056 Sutherland Trail',
    password: '1PSrdx5i'
  },
  {
    firstName: 'Gard',
    lastName: 'Dyble',
    email: 'gdyble11@house.gov',
    address: '32 Sachtjen Alley',
    password: '4NFJ0g'
  },
  {
    firstName: 'Zachary',
    lastName: 'Barbary',
    email: 'zbarbary12@usgs.gov',
    address: '23665 Cascade Park',
    password: '8obZRfIb'
  },
  {
    firstName: 'Alan',
    lastName: 'Wensley',
    email: 'awensley13@edublogs.org',
    address: '8 Paget Hill',
    password: 'Fcf5r2E'
  },
  {
    firstName: 'Cathrin',
    lastName: 'Sheber',
    email: 'csheber14@businesswire.com',
    address: '6582 Forest Drive',
    password: 'QGYuYflUBO'
  },
  {
    firstName: 'Gerry',
    lastName: 'Fieldgate',
    email: 'gfieldgate15@biblegateway.com',
    address: '2 Columbus Lane',
    password: 'FxgVkTpTdf'
  },
  {
    firstName: 'Lodovico',
    lastName: 'Bartle',
    email: 'lbartle16@printfriendly.com',
    address: '155 Marcy Street',
    password: '2EbV1YcUu'
  },
  {
    firstName: 'Boycey',
    lastName: 'Rapper',
    email: 'brapper17@illinois.edu',
    address: '85046 Rutledge Lane',
    password: 'J34EjD7'
  },
  {
    firstName: 'Jeannette',
    lastName: 'Senten',
    email: 'jsenten18@webs.com',
    address: '91 Lotheville Junction',
    password: '9HWdL03Z'
  },
  {
    firstName: 'Brittany',
    lastName: 'Allso',
    email: 'ballso19@php.net',
    address: '0 Algoma Trail',
    password: 'XGvQIccq'
  },
  {
    firstName: 'Whitney',
    lastName: 'Cana',
    email: 'wcana1a@geocities.com',
    address: '5 Texas Junction',
    password: '1c9fJWcXslM9'
  },
  {
    firstName: 'Marylin',
    lastName: 'Rispen',
    email: 'mrispen1b@ftc.gov',
    address: '4788 Lunder Circle',
    password: '88rWIS'
  },
  {
    firstName: 'Bruis',
    lastName: 'Christofle',
    email: 'bchristofle1c@blogger.com',
    address: '476 Dexter Lane',
    password: 'iEtCKt2Q'
  },
  {
    firstName: 'Cyril',
    lastName: 'Tallow',
    email: 'ctallow1d@sciencedirect.com',
    address: '4 High Crossing Point',
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
    ],
    price: '10'
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
    ],
    price: '11'
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
    ],
    price: '12'
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
    ],
    price: '14'
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
    ],
    price: '15'
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
    ],
    price: '16'
  },
  {
    name: 'Chipotle Beef Taco Salad',
    image:
      'https://media.blueapron.com/recipes/22133/square_newsletter_images/1561058164-33-0066-3858/0722_W5_Beef-Salad_3176_Square_Web_hi_res.jpg',
    description:
      'Pepitas (or pumpkin seeds) are beloved in Mexican cuisine for their satisfying crunch and rich, nutty flavor, which shines here when briefly toasted in the pan, then tossed in a mixture of garlic and lime zest—the perfect garnish for our bright, zesty beef taco salad.This recipe was created in partnership with the wellness experts at WW. To learn more about WW and SmartPoints®visit ww.com',
    calories: '570',
    ingredients: [
      'Thinly Sliced Beef',
      'Romaine Lettuce Heart',
      'Of Corn',
      'Garlic',
      'Monterey Jack Cheese',
      'Lime',
      'Guacamole',
      'Chipotle Chile Paste',
      'Raw Pepitas'
    ],
    price: 17
  },
  {
    name: 'Creamy Chipotle Chicken',
    image:
      'https://media.blueapron.com/recipes/22118/square_newsletter_images/1561055853-33-0033-8885/0722_2PRE07_Chicken_3275_Square_Web_hi_res.jpg',
    description:
      'Our verdant cilantro sauce (which also features onions, garlic, jalapeño, and lime juice) lends bold, herbaceous flavor to sautéed vegetables and jasmine rice—a satisfying accompaniment to bites of tender chicken dressed with a delightfully spicy-sweet chipotle mayo.',
    calories: '740',
    ingredients: [
      'Chopped Chicken Breast',
      'Jasmine Rice',
      'Sweet Onion',
      'Poblano Pepper',
      'Cornstarch',
      'Grated Cotija Cheese',
      'Mayonnaise',
      'Chipotle Chile Paste',
      'Cilantro Sauce',
      'Honey'
    ],
    price: 19
  },
  {
    name: 'Southern-Style Chicken & Corn',
    image:
      'https://media.blueapron.com/recipes/22196/square_newsletter_images/1561056691-34-0045-6453/0722_W1_Chicken_3209_Square_Web_hi_res.jpg',
    description:
      'To contrast the bold, smoky spices on our seared chicken, we’re serving it with a side of sweet corn and topping them both with an irresistibly rich honey butter, which slowly melts onto the corn kernels and lightly charred exterior of our chicken. It’s all complete with our vibrant slaw, which gets exciting texture from pickled mustard seeds.This recipe was created in partnership with the wellness experts at WW. To learn more about WW and SmartPoints® visit ww.com',
    calories: '510',
    ingredients: [
      'Boneless, Skinless Chicken Breasts',
      'Persian Cucumber',
      'Of Corn',
      'Red Cabbage',
      'Honey',
      'Butter',
      'Sugar',
      'Apple Cider Vinegar',
      'Brown & Yellow Mustard Seeds',
      'Smoky Spice Blend (Smoked Paprika, Sweet Paprika, Ground Yellow Mustard, Garlic Powder & Onion Powder)'
    ],
    price: 18
  },
  {
    name: 'Spicy Soy-Glazed Chicken Thighs',
    image:
      'https://media.blueapron.com/recipes/22194/square_newsletter_images/1561063776-34-0007-7894/0722_FPRE05_Chicken_3302_Square_Web_hi_res.jpg',
    description:
      'The classic pairing of chicken and rice gets Korean flair from a glaze made with spicy gochujang spooned over our chicken as it cooks. To round out this quick-cooking meal, sliced cabbageand green beans are pan-steamed to retain their vibrant colors.',
    calories: '690',
    ingredients: [
      'Boneless, Skinless Chicken Thighs',
      'Jasmine Rice',
      'Red Cabbage',
      'Green Beans',
      'Crème Fraîche',
      'Black Bean Sauce',
      'Soy Glaze',
      'Gochujang',
      'Ghee',
      'Kombu'
    ],
    price: 18
  },
  {
    name: 'Sweet Chili-Glazed Salmon',
    image:
      'https://media.blueapron.com/recipes/22200/square_newsletter_images/1561057392-33-0051-3448/0722_W02_Salmon_3237_Square_Web_hi_res.jpg',
    description:
      'To pair with our savory-sweet glazed salmon and sautéed vegetables, we’re jazzing up a side of fluffy jasmine rice by infusing it with an aromatic duo of garlic and scallions—first cookedin fragrant sesame oil for rich flavor.This recipe was created in partnership with the wellness experts at WW. To learn more about WW and SmartPoints® visit ww.com',
    calories: '710',
    ingredients: [
      'Skin-On Salmon Fillet',
      'Jasmine Rice',
      'Sugar Snap Peas',
      'Carrots',
      'Scallions',
      'Garlic',
      'Soy Sauce',
      'Sweet Chili Sauce',
      'Sesame Oil'
    ],
    price: 16
  },
  {
    name: 'Smoky Chicken & Honey Butter',
    image:
      'https://media.blueapron.com/recipes/22115/square_newsletter_images/1561055081-33-0025-8001/0722_2PP_Chicken_3199_Square_Web_hi_res.jpg',
    description:
      'To give this classic, Southern-style chicken dish a sophisticated lift, we’re quickly pickling a combination of brown and yellow mustard seeds in sugar and vinegar, then tossing them withcrisp cabbage and cucumber for exciting texture and piquant flavor in our slaw. It’s the perfect partner for the sweet, rich honey butter that tops our chicken and corn.',
    calories: '510',
    ingredients: [
      'Boneless, Skinless Chicken Breasts',
      'Persian Cucumber',
      'Of Corn',
      'Red Cabbage',
      'Honey',
      'Butter',
      'Sugar',
      'Apple Cider Vinegar',
      'Smoky Spice Blend (Smoked Paprika, Sweet Paprika, Ground Yellow Mustard, Garlic Powder & Onion Powder)',
      'Brown & Yellow Mustard Seeds'
    ],
    price: 19
  },
  {
    name: 'Mexican-Spiced Chicken & Lime Sour Cream',
    image:
      'https://media.blueapron.com/recipes/22075/square_newsletter_images/1560199686-34-0012-5929/0715_FPP_Chicken_3655_Square_hi_res.jpg',
    description:
      'This summer, we’re bringing you 12 weeks of recipes designed with busy schedules and flexibility in mind. To make a hearty base for juicy chicken thighs, we’re making a warm farro salad that invokes the flavors of esquites––a Mexican street food favorite––by tossing in a traditional combo of fresh sweet corn, tart lime, and creamy mayonnaise.',
    calories: '660',
    ingredients: [
      'Boneless, Skinless Chicken Breasts',
      'Semi-Pearled Farro',
      'Of Corn',
      'Sweet Peppers',
      'Lime',
      'Scallions',
      'Mayonnaise',
      'Sour Cream',
      'Grated Cotija Cheese',
      'Crushed Red Pepper Flakes',
      'Mexican Spice Blend (Ancho Chile Powder, Smoked Paprika, Garlic Powder, Ground Cumin & Dried Mexican Oregano)'
    ],
    price: 19
  },
  {
    name: 'Spicy Beef & Broccoli',
    image:
      'https://media.blueapron.com/recipes/22227/square_newsletter_images/1560199517-33-0012-3461/0715_FPV_Beef-Broccoli_3636_Square_hi_res.jpg',
    description:
      'Tender bites of beef, broccoli, and peppers are quickly brought together with an irresistible sauce of sweet hoisin, spicy sambal, and more to create this takeout-style classic. The flavorful medley is complemented by a fragrant bed of garlic rice.',
    calories: '610',
    ingredients: [
      'Thinly Sliced Beef',
      'Jasmine Rice',
      'Scallions',
      'Sweet Peppers',
      'Garlic',
      'Broccoli',
      'Sambal Oelek',
      'Hoisin Sauce',
      'Soy Glaze',
      'Cornstarch',
      'Rice Vinegar'
    ],
    price: 16
  },
  {
    name: 'Chesapeake-Spiced Tilapia',
    image:
      'https://media.blueapron.com/recipes/22221/square_newsletter_images/1560265433-34-0061-3837/0325_WW04_Cajun-Tilapia_063_Square_Web_hi_res.jpg',
    description:
      'The Chesapeake Bay region is famous for its seafood dishes, often rich with warm, zippy spices like sweet paprika, celery seeds, ground yellow mustard, and bay leaves, which create a flavorful coating for our flaky tilapia fillets. It’s the perfect partner for a bed of simply sautéed vegetables perked up with pickled jalapeño.This recipe was created in partnership with the wellness experts at WW. To learn more about WW and SmartPoints® visit ww.com',
    calories: '280',
    ingredients: [
      'Tilapia Fillets',
      'Sweet Peppers',
      'Garlic',
      'Zucchini',
      'Scallions',
      'Sliced Pickled Jalapeño Pepper',
      'Vegetarian Worcestershire Sauce',
      'Vegetable Demi-Glace',
      'Chesapeake Spice Blend (Sweet Paprika, Celery Seeds, Ground Yellow Mustard & Ground Bay Leaves)'
    ],
    price: 15
  },
  {
    name: 'Chicken & Black Bean Burrito Bowls',
    image:
      'https://media.blueapron.com/recipes/22127/square_newsletter_images/1561064598-34-0020-8572/0722_FPV_Burrito-Bowl_3314_Square_Web_hi_res.jpg',
    description:
      "This summer, we’re bringing you 12 weeks of recipes designed with busy schedules and flexibility in mind. To garnish these hearty burrito bowls, you'll make your own crispy tortilla strips by pan-frying flour tortillas until golden brown and crispy––perfectly contrasted by a cooling dollop of guacamole also served on top.",
    calories: '730',
    ingredients: [
      'Chopped Chicken Breast',
      'Flour Tortillas',
      '15.5-Ounce Can Black Beans',
      'Sushi Rice',
      'Poblano Pepper',
      'Sweet Onion',
      'Cilantro Sauce',
      'Ancho Chile Paste',
      'Guacamole',
      'Chicken Demi-Glace',
      'Barbecue Spice Blend (Smoked Paprika, Sweet Paprika, Ground Fennel Seeds, Ground Coriander, Garlic Powder & Light Brown Sugar)'
    ],
    price: 18
  },
  {
    name: 'Glazed Chicken',
    image:
      'https://media.blueapron.com/recipes/22117/square_newsletter_images/1561054506-33-0018-8859/0722_2PM_Chicken_3264_Square_Web_hi_res.jpg',
    description:
      'This summer, we’re bringing you 12 weeks of recipes designed with busy schedules and flexibility in mind. Here, classic pasta salad gets a robust upgrade from our savory tomato chutney, whose irresistibly tangy, sweet, and spicy flavor is classic in Indian cuisine. It’s the perfect accompaniment to seared chicken glazed with a simple duo of vinegar and brown sugar.',
    calories: '960',
    ingredients: [
      'Boneless, Skinless Chicken Thighs',
      'Mafalda Pasta',
      'Zucchini',
      'Sweet Peppers',
      'Savory Tomato Chutney',
      'Dried Currants',
      'Light Brown Sugar',
      'Apple Cider Vinegar',
      'Sweetened Toasted Coconut Chips',
      'Crème Fraîche',
      'Weeknight Hero Spice Blend (Onion Powder, Garlic Powder, Smoked Paprika & Whole Dried Parsley)'
    ],
    price: 18
  },
  {
    name: 'Smoky Chickpea Gyros',
    image:
      'https://media.blueapron.com/recipes/22074/square_newsletter_images/1560264625-35-0019-4630/0715_2PV3_Gyros_3512_Square_hi_res.jpg',
    description:
      'We’re bringing the flavors of classic Greek street food to your kitchen with these satisfying pitas—spread with yogurt-dressed cucumbers (a take on tzatziki), then topped with hearty chickpeas and onion sautéed with smoky harissa paste. It’s all complete with our simple side salad of crisp romaine, sweet roasted peppers, and crumbly feta.',
    calories: '620',
    ingredients: [
      'Pocketless Pitas',
      'Persian Cucumbers',
      'Red Onion',
      'Romaine Lettuce Heart',
      'Garlic',
      'Plain Nonfat Greek Yogurt',
      'Sliced Roasted Red Peppers',
      'Feta Cheese',
      'Red Harissa Paste',
      'Red Wine Vinegar',
      '15.5 -Ounce Can Chickpeas'
    ],
    price: 18
  },
  {
    name: 'Pork Chops & Buttermilk Mashed Potatoes',
    image:
      'https://media.blueapron.com/recipes/22079/square_newsletter_images/1560199148-33-0001-1158/0715_FP5_Pork-Chops_3619_Square_hi_res.jpg',
    description:
      'We’re topping our savory pork chops with a rich pan sauce that highlights the classic duo of honey and mustard. Sides of creamy buttermilk mashed potatoes and a summery vegetable sauté offresh tomatoes, green beans, and sweet peppers bring flavorful contrast to the dish.',
    calories: '630',
    ingredients: [
      'Boneless, Center-Cut Pork Chops',
      'Golden Potatoes',
      'Garlic',
      'Green Beans',
      'Sweet Peppers',
      'Grape Tomatoes',
      'Ghee',
      'Whole Grain Dijon Mustard',
      'Chicken Bone Broth',
      'Honey',
      'Buttermilk',
      'Red Wine Vinegar',
      'Weeknight Hero Spice Blend (Onion Powder, Garlic Powder, Smoked Paprika & Whole Dried Parsley)'
    ],
    price: 18
  },
  {
    name: 'Pesto Fusilli Pasta',
    image:
      'https://media.blueapron.com/recipes/22072/square_newsletter_images/1560200636-33-0038-1704/0715_2PV1_Pesto-Pasta_3584_Square_hi_res.jpg',
    description:
      'This summer, we’re bringing you 12 weeks of recipes designed with busy schedules and flexibility in mind. This bright summer pasta highlights two of our favorite seasonal ingredients: fresh, juicy tomatoes and crisp, sweet corn, which we’re folding into the warm pasta along with our basil pesto for an herbaceous boost of flavor.',
    calories: '730',
    ingredients: [
      'Fusilli Bucati Corti Pasta',
      'Scallions',
      'Of Corn',
      'Grape Tomatoes',
      'Grated Parmesan Cheese',
      'Mascarpone Cheese',
      'Basil Pesto',
      'Sliced Roasted Red Peppers',
      'Crushed Red Pepper Flakes'
    ],
    price: 15
  },
  {
    name: 'Chicken Lettuce Cups',
    image:
      'https://media.blueapron.com/recipes/22070/square_newsletter_images/1560264751-34-0028-2239/0715_2PRE07_Lettuce-Wraps_3609_Square_hi_res.jpg',
    description:
      'This summer, we’re bringing you 12 weeks of recipes designed with busy schedules and flexibility in mind. Tucked inside soft butter lettuce leaves, a filling of sushi rice, savory chicken, and spicy pickled carrots come together with a drizzle of mayo mixed with hoisin sauce—a rich, fragrant condiment beloved in Chinese cuisine with a sweetness similar to barbecue.',
    calories: '660',
    ingredients: [
      'Chopped Chicken Breast',
      'Sushi Rice',
      'Butter Lettuce',
      'Persian Cucumbers',
      'Carrots',
      'Soy Sauce',
      'Gochujang',
      'Hoisin Sauce',
      'Sugar',
      'Mayonnaise',
      'Rice Vinegar'
    ],
    price: 16
  },
  {
    name: 'Calabrian Shrimp & Orzo',
    image:
      'https://media.blueapron.com/recipes/22162/square_newsletter_images/1560264380-34-0013-7107/0121_2PF_Shrimp-Orzo_2549_Square_Web_hi_res.jpg',
    description:
      'This quick and easy dish highlights tender orzo pasta and plump shrimp, which get vibrant depth of flavor (and the perfect amount of mild heat) from a coating of hot red chile paste. We’re finishing it all with a bit of cooling crème fraîche and tart lemon juice, plus a sprinkle of parmesan cheese.',
    calories: '480',
    ingredients: [
      'Tail-On Shrimp (Peeled & Deveined)',
      'Orzo Pasta',
      'Zucchini',
      'Garlic',
      'Lemon',
      'Calabrian Chile Paste',
      'Crème Fraîche',
      'Capers',
      'Grated Parmesan Cheese'
    ],
    price: 19
  },
  {
    name: 'Cajun-Style Pork & Farro Salad',
    image:
      'https://media.blueapron.com/recipes/22084/square_newsletter_images/1560265580-35-0037-9848/0715_W5_Cajun-Pork_3589_Square_hi_res.jpg',
    description:
      'To contrast the bold, vibrant flavors of Cajun cuisine featured in this dish, we’re topping seared pork with a combo of creamy yogurt mixed with piquante peppers—a pickled variety belovedfor their tangy-sweet flavor and vivid red color.This recipe was created in partnership with the wellness experts at WW. To learn more about WW and SmartPoints® visit ww.com',
    calories: '560',
    ingredients: [
      'Boneless, Center-Cut Pork Chops',
      'Semi-Pearled Farro',
      'Of Corn',
      'Scallions',
      'Garlic',
      'Celery',
      'Hot Sauce',
      'Sweet Piquante Peppers',
      'Plain Nonfat Greek Yogurt',
      'Cajun Spice Blend (Smoked Paprika, Ground Yellow Mustard, Onion Powder, Garlic Powder, Whole Dried Oregano, Whole Dried Thyme & Cayenne Pepper)'
    ],
    price: 15
  },
  {
    name: 'Summer Vegetable Pizza',
    image:
      'https://media.blueapron.com/recipes/22195/square_newsletter_images/1561064186-34-0016-5981/0722_FPR6_Pizza_3368_Square_Web_hi_res.jpg',
    description:
      'This crowd-pleasing pizza features one of our favorite seasonal ingredients: fresh, sweet corn, which we’re pairing with crisp peppers and a duo of melty cheeses for bursts of bright flavor in every bite. For an elevated twist on a classic side salad, we’re tossing crunchy romaine and cucumbers with a dressing of creamy mustard sauce and tangy goat cheese.',
    calories: '790',
    ingredients: [
      'Pizza Dough',
      'Garlic',
      'Romaine Lettuce Heart',
      'Of Corn',
      'Persian Cucumbers',
      'Sweet Peppers',
      'Carrots',
      'Fresh Mozzarella Cheese',
      'Creamy Mustard Sauce',
      'Smoked Gouda Cheese',
      'Goat Cheese',
      'Grana Padano Cheese',
      'Crushed Red Pepper Flakes',
      '14-Ounce Can Whole Peeled Tomatoes'
    ],
    price: 15
  },
  {
    name: 'Cumin-Sichuan Peppercorn Beef',
    image:
      'https://media.blueapron.com/recipes/22164/square_newsletter_images/1560200479-34-0030-3823/0128_2PRE08_Cumin-Beef-Noodles_Sesame_013_201_Square_Crop_hi_res.jpg',
    description:
      'For this vibrant dish, you’ll make a saucy stir-fry of beef and broccoli cooked in a bold combo of sweet soy glaze and fragrant cumin-Sichuan peppercorn sauce. It’s all served over delightfully chewy ramen noodles—perfect for catching every bite.',
    calories: '820',
    ingredients: [
      'Ground Beef',
      'Fresh Ramen Noodles (Previously Frozen)',
      'Broccoli',
      'Garlic',
      'Cumin & Sichuan Peppercorn Sauce',
      'Soy Glaze',
      'Black & White Sesame Seeds',
      'Crushed Red Pepper Flakes'
    ],
    price: 17
  },
  {
    name: 'Seared Pork Chops & Chipotle Mayo',
    image:
      'https://media.blueapron.com/recipes/22069/square_newsletter_images/1560264482-35-0014-9838/0715_2PM_Prok_3600_Square_hi_res.jpg',
    description:
      'A pair of irresistibly spicy-sweet condiments lend exciting, bold flavor to this dish: fiery chipotle chile paste mixed with creamy mayo is spooned over seared pork, while a crowd-pleasing duo of honey and crushed red pepper dresses our hearty side of red and wild rices tossed with snap peas.',
    calories: '650',
    ingredients: [
      'Boneless, Center-Cut Pork Chops',
      'Red Rice Blend',
      'Sugar Snap Peas',
      'Honey',
      'Red Wine Vinegar',
      'Mayonnaise',
      'Chipotle Chile Paste',
      'Grated Cotija Cheese',
      'Crushed Red Pepper Flakes'
    ],
    price: 17
  },
  {
    name: 'Smoked Gouda & Monterey Jack Grilled Cheese',
    image:
      'https://media.blueapron.com/recipes/22073/square_newsletter_images/1560457340-34-0010-1940/0715_2PV2_Grilled-Cheese_3575_Square_hi_res.jpg',
    description:
      'For an easy, sophisticated twist on classic grilled cheese, we’re layering two kinds of melty cheeses with earthy mushrooms and tangy pickled shallot between slices of toasted sourdough. For bright contrast, we’re making a slaw of crunchy cucumber and cabbage tossed with a piquant duo of mustard and the shallot pickling liquid.',
    calories: '640',
    ingredients: [
      'Sourdough Pullman Bread',
      'Red Cabbage',
      'Cremini Mushrooms',
      'Persian Cucumbers',
      'Smoked Gouda Cheese',
      'Monterey Jack Cheese',
      'Shallot',
      'Red Wine Vinegar',
      'Sugar',
      'Whole Grain Dijon Mustard'
    ],
    price: 17
  },
  {
    name: 'Harissa Chickpea Gyros',
    image:
      'https://media.blueapron.com/recipes/22167/square_newsletter_images/1560265297-34-0052-4933/0715_W3_Gyros_3500_Square_hi_res.jpg',
    description:
      'Our vegetarian take on the classic Greek sandwich features warmed pitas stuffed with smoky sautéed chickpeas and onion, whose hearty textures find cooling contrast in a layer of creamy cucumber yogurt. For even more traditional flavor, we’re crumbling tangy feta cheese into our simple side salad.This recipe was created in partnership with the wellness experts at WW. To learn more about WW and SmartPoints® visit ww.com',
    calories: '620',
    ingredients: [
      'Pocketless Pitas',
      'Red Onion',
      'Persian Cucumbers',
      'Romaine Lettuce Heart',
      'Garlic',
      'Plain Nonfat Greek Yogurt',
      'Sliced Roasted Red Peppers',
      'Feta Cheese',
      'Red Harissa Paste',
      'Red Wine Vinegar',
      '15.5 -Ounce Can Chickpeas'
    ],
    price: 18
  },
  {
    name: 'One-Pot Shrimp & Udon Noodles',
    image:
      'https://media.blueapron.com/recipes/22076/square_newsletter_images/1560200202-33-0024-5807/0715_FPF_Udon_3669_Square_hi_res.jpg',
    description:
      'This summer, we’re bringing you 12 weeks of recipes designed with busy schedules and flexibility in mind. For quick cooking (and easy cleanup!), you’ll make this dish all in one pot by bringing together tender noodles, bites of shrimp, and crisp carrots with an umami (or savory) sauce of sesame oil, worcestershire, and soy sauce.',
    calories: '490',
    ingredients: [
      'Tail-On Shrimp (Peeled & Deveined)',
      'Fresh Udon Noodles (Previously Frozen)',
      'Cremini Mushrooms',
      'Carrots',
      'Lime',
      'Mint',
      'Roasted Peanuts',
      'Vegetarian Worcestershire Sauce',
      'Soy Sauce',
      'Sugar',
      'Sesame Oil'
    ],
    price: 15
  },
  {
    name: 'Spicy Vegetable & Udon Stir-Fry',
    image:
      'https://media.blueapron.com/recipes/22122/square_newsletter_images/1561056257-33-0039-2740/0722_2PV3_Udon_3216_Square_Web_hi_res.jpg',
    description:
      'Pleasantly chewy udon noodles—a staple in Japanese cuisine—add exquisite texture to this quick and easy stir-fry, which also highlights crisp bok choy, snap peas, and sweet peppers. We’rebringing it all together with a sweet and spicy sauce made with miso paste, sambal oelek, and more.',
    calories: '480',
    ingredients: [
      'Pasture-Raised Eggs',
      'Fresh Udon Noodles (Previously Frozen)',
      'Sugar Snap Peas',
      'Baby Bok Choy',
      'Sweet Peppers',
      'Garlic',
      'Sweet White Miso Paste',
      'Soy Sauce',
      'Sambal Oelek',
      'Vegetable Demi-Glace',
      'Light Brown Sugar',
      'Black & White Sesame Seeds'
    ],
    price: 16
  },
  {
    name: 'Southern-Spiced Chicken',
    image:
      'https://media.blueapron.com/recipes/22067/square_newsletter_images/1560264156-34-0005-4878/0715_2PP_Southern-Chicken_3534_Square_hi_res.jpg',
    description:
      'This simple dish gets a sophisticated lift from a flavorful pan sauce made with whole grain dijon, brown sugar, and demi-glace (simply reduced chicken stock), which lends rich, complex flavor to our seared chicken. It’s perfectly accompanied by classic, hearty sides of buttermilk mashed potatoes and green beans sautéed with aromatic garlic.',
    calories: '510',
    ingredients: [
      'Boneless, Skinless Chicken Breasts',
      'Golden Potatoes',
      'Green Beans',
      'Buttermilk',
      'Chicken Demi-Glace',
      'Garlic',
      'Whole Grain Dijon Mustard',
      'Light Brown Sugar',
      'Southern Spice Blend (Onion Powder, Garlic Powder, Ground Yellow Mustard, Smoked Paprika & Cayenne Pepper)'
    ],
    price: 16
  },
  {
    name: 'Seared Chicken & Buttermilk Mashed Potatoes',
    image:
      'https://media.blueapron.com/recipes/22168/square_newsletter_images/1560264916-35-0027-8275/0715_W1_Southern-Chicken_3523_Square_hi_res.jpg',
    description:
      'For deep, bold flavor in this wholesome dish, we’re featuring piquant mustard in two ways: ground yellow mustard stars in the blend of Southern-style spices our chicken is seasoned with, while whole grain dijon is at the center of our rich, tangy pan sauce spooned on top.This recipe was created in partnership with the wellness experts at WW. To learn more about WW and SmartPoints® visit ww.com',
    calories: '510',
    ingredients: [
      'Boneless, Skinless Chicken Breasts',
      'Golden Potatoes',
      'Green Beans',
      'Buttermilk',
      'Chicken Demi-Glace',
      'Garlic',
      'Whole Grain Dijon Mustard',
      'Light Brown Sugar',
      'Southern Spice Blend (Onion Powder, Garlic Powder, Ground Yellow Mustard, Smoked Paprika & Cayenne Pepper)'
    ],
    price: 16
  },
  {
    name: 'Spiced Chicken Salad',
    image:
      'https://media.blueapron.com/recipes/22085/square_newsletter_images/1560265708-34-0071-6426/0715_W6_Thai-Salad_3517_Square_hi_res.jpg',
    description:
      'We’re topping this bright, zesty salad with bites of tender chicken seared in a coating of togarashi—a favorite Japanese seasoning that highlights poppy seeds, dried orange peel, and more, whose bold flavor is delightfully contrasted by our sweet and tangy honey-lime dressing.This recipe was created in partnership with the wellness experts at WW. To learn more about WW and SmartPoints® visit ww.com',
    calories: '480',
    ingredients: [
      'Chopped Chicken Breast',
      'Romaine Lettuce Heart',
      'Carrots',
      'Sweet Peppers',
      'Lime',
      'Dried Shiitake Mushrooms',
      'Honey',
      'Sesame Oil',
      'Roasted Peanuts',
      'Crushed Red Pepper Flakes',
      'Togarashi Seasoning (Sweet Paprika, Hot Paprika, Dried Orange Peel, Poppy Seeds, White Sesame Seeds & Black Sesame Seeds)'
    ],
    price: 18
  },
  {
    name: 'Creamy Lemon Shrimp & Orzo',
    image:
      'https://media.blueapron.com/recipes/22163/square_newsletter_images/1560265095-34-0044-2584/0121_W2_Shrimp-Orzo_2553_Square_Web_hi_res.jpg',
    description:
      'This flavorful dish combines tender orzo pasta (a small, rice-shaped variety), sautéed zucchini, and plump shrimp coated with a vibrant mix of Calabrian chile paste, briny capers, and garlic. It’s all brought together with a touch of smooth crème fraîche and fresh lemon juice.This recipe was created in partnership with the wellness experts at WW. To learn more about WW and SmartPoints® visit ww.com',
    calories: '480',
    ingredients: [
      'Tail-On Shrimp (Peeled & Deveined)',
      'Orzo Pasta',
      'Zucchini',
      'Garlic',
      'Lemon',
      'Calabrian Chile Paste',
      'Crème Fraîche',
      'Capers',
      'Grated Parmesan Cheese'
    ],
    price: 16
  },
  {
    name: 'Za’atar Beef & Carrots',
    image:
      'https://media.blueapron.com/recipes/22165/square_newsletter_images/1560199920-33-0019-8851/0401_FPM_Lebanese-Beef_038_Square_Web_hi_res.jpg',
    description:
      'In this Middle Eastern-style recipe, a hearty duo of spiced beef and carrots is perfectly matched by jasmine rice laden with tender bites of zucchini and currants. It’s all finished with a cooling drizzle of zesty lemon-labneh sauce and fresh parsley.',
    calories: '680',
    ingredients: [
      'Ground Beef',
      'Jasmine Rice',
      'Carrots',
      'Zucchini',
      'Lemon',
      'Garlic',
      'Parsley',
      'Labneh Cheese',
      'Dried Currants',
      'Chicken Demi-Glace',
      "Za'atar Seasoning (Sumac, Marjoram, Oregano, Thyme, Sesame Seeds & Salt)"
    ],
    price: 17
  },
  {
    name: 'Sour Cherry Salmon',
    image:
      'https://media.blueapron.com/recipes/22124/square_newsletter_images/1561065191-34-0027-0651/0722_FPF_Salmon_3355_Square_Web_hi_res.jpg',
    description:
      'This summer, we’re bringing you 12 weeks of recipes designed with busy schedules and flexibility in mind. A duo of summer vegetables tossed with nutty farro is the perfect partner for ourflaky salmon––topped with a sweet-tart sauce of sour cherry and creamy mustard.',
    calories: '700',
    ingredients: [
      '10-Oz Skin-On Salmon Fillets',
      'Semi-Pearled Farro',
      'Zucchini',
      'Of Corn',
      'Scallions',
      'Thyme',
      'Red Wine Vinegar',
      'Sour Cherry Spread',
      'Crème Fraîche',
      'Creamy Mustard Sauce'
    ],
    price: 16
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
    orders.map(order => {
      return Order.create(order)
    })
  )

  await Promise.all(
    meals.map(meal => {
      return Meal.create(meal)
    })
  )

  await Promise.all(
    mealOrders.map(mealOrder => {
      return MealOrder.create(mealOrder)
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
