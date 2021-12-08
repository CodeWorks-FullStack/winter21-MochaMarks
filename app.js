const products = [{
  id: 1,
  name: 'Black Coffee',
  price: 3.50,
  imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG'
},
{
  id: 2,
  name: 'Mocha',
  price: 3.85,
  imgUrl: 'https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1024-512,f_auto,q_auto:best/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p.jpg'
},
{
  id: 3,
  name: 'Latte',
  price: 3.75,
  imgUrl: 'https://www.inspiredtaste.net/wp-content/uploads/2011/11/Pumpkin-Spice-Latte-Recipe-1200.jpg'
},
{
  id: 4,
  name: 'Espresso',
  price: 2.00,
  imgUrl: 'https://www.acouplecooks.com/wp-content/uploads/2020/10/how-to-make-a-macchiato-003-735x919.jpg'
},
{
  id: 5,
  name: 'Muffin',
  price: 4.10,
  imgUrl: 'https://cook.fnr.sndimg.com/content/dam/images/cook/fullset/2012/2/10/0/CCDRP107_Morning-Glory-Muffins-Recipe_s4x3.jpg.rend.hgtvcom.616.462.suffix/1358438305401.jpeg'
}]
let espresso = 0
const cart = []

/** renders all menu items */
function drawMenu() {
  let template = ''
  // look at each product
  products.forEach(prod => {
    // add product to template
    template += `
    <div class="col-6 p-3 product user-select-none" oncontextmenu="disableContextClick()">
      <div class="bg-white shadow rounded" onclick="addToCart(${prod.id})">
        <img class="product-img rounded-top"
          src="${prod.imgUrl}"
          alt="${prod.name}">
        <div class="d-flex justify-content-between p-3">
          <p><b>${prod.name}</b></p>
          <p>$${prod.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
    `
  })
  // draw to page
  document.getElementById('menu').innerHTML = template
}

function drawCart() {
  let template = ''
  let total = 0
  cart.forEach((prod, i) => {
    total += prod.price
    template += `
    <div class="d-flex justify-content-between border-bottom my-1 user-select-none">
      <p>${prod.name}</p>
      <p>$${prod.price.toFixed(2)} <i class="mdi mdi-close-circle text-danger action" onclick="removeItem(${i})"></i></p>
    </div>
    `
  })

  document.getElementById('cart').innerHTML = template
  // draw the total
  document.getElementById('total').innerHTML = total.toFixed(2)
}

/** Add Coffee to Cart */
function addToCart(id) {
  // given a value find it among the products
  const order = products.find(prod => prod.id === id)
  if (order.name === 'Espresso') {
    espresso++
    if (espresso > 2) {
      playEpic()
    }
  }
  // add to cart
  cart.push(order)
  drawCart()
  // @ts-ignore
  document.getElementById('checkout-button').disabled = false
}

function checkout() {
  cart.length = 0
  drawCart()
  document.getElementById('checkout-button').disabled = true
}

function removeItem(i) {
  // let index = cart.findIndex(prod => prod.id === id)
  cart.splice(i, 1)
  drawCart()
  if (cart.length === 0) {
    document.getElementById('checkout-button').disabled = true
  }
}


function disableContextClick() {
  window.event.preventDefault()
}

function playEpic() {
  console.log('play')
  document.getElementById('epic').play()
  let cards = document.querySelectorAll('.product')
  cards.forEach(c => {
    c.classList.add('fa-spin')
  })
  setTimeout(() => {
    document.getElementById('epic').pause()
    let cards = document.querySelectorAll('.product')
    cards.forEach(c => {
      c.classList.remove('fa-spin')
    })
  }, 5000)

  espresso = 0
}


drawMenu()