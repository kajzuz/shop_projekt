"use strict";

//Get the class/id from HTML and make them to variables with the help of selectors
const sectionEl = document.getElementById("section");
const containerEl = document.getElementsByClassName("container");
const NameEl = document.getElementById("Name");
const EmailEl = document.getElementById("Email");
const AdressEl = document.getElementById("Adress");
const buttonEl = document.getElementById("submitButton");
const id = document.getElementById("id");

const loginEl = document.getElementById("login");
const shippingEl = document.getElementById("Shipping");

const all = document.getElementsByClassName("all");
const jewelryButtonEl = document.getElementById("jewelryButton");
const localStorage2El = document.getElementById("localStorage2");

const out = document.getElementById("counter");

const allEl = document.getElementsByClassName("all");
const MensClothingEl = document.getElementsByClassName("Men's clothing");
const WomensClothingEl = document.getElementsByClassName("Womens's clothing");
const JewelryEl = document.getElementsByClassName("Jewelry");
const EleclectronicEl = document.getElementsByClassName("Eleclectronic");

const jewelry2El = document.getElementById("jewelry2");
const womenSectionEl = document.getElementById("womenSection");
const menSectionEl = document.getElementById("menSection");
const electronicSectionEl = document.getElementById("electronicSection");






//Makes sure the form has values before it is sent
//'input' to specify input form
loginEl.addEventListener('input',() => {


  if(
    NameEl.value.length > 0 &&
    EmailEl.value.length > 0 &&
    AdressEl.value.length > 0 &&
    document.getElementById("Shipping").value
    
   ){
    buttonEl.removeAttribute('disabled');
    }else{
      buttonEl.setAttribute('disabled','disabled');
    }
    
});






//For cart counting
// let countsClick = 0;
// const out = document.getElementById("counter");

// function count(){

// countsClick++;
// out.innerHTML = countsClick;

// }

// count();


//For counting all the prices of the products, add this function ta all other functions
let price = 0;

function yourTotalCost(){

  price = 0;

  for (let i = 0; i < arrayItems.length; i++) {
    price += parseFloat(arrayItems[i].price);
    
    
  }
  console.log("Total Price " + price.toFixed(2));

}


//Making a array and push the products into it
//as well as converting it to JSON with stringlify 
let arrayItems = JSON.parse(localStorage.getItem("products")) || []

function addToCart(id, title, image, price) {

  arrayItems.push({
   "id": id,
   "title": title,
   "image": image,
   "price": price,
  });

  let local = JSON.stringify(arrayItems);

  localStorage.setItem("products", local);

  console.log(arrayItems);
        
  count();
}




//For cart counting, and saving in localstorage
// count(); saves all the products in the cart
function count() {

  for (let i = 0; i < arrayItems.length; i++) {

      out.innerHTML = arrayItems.length;
  }
}

count();




//---POST---
//Funktion POST (create), add user and product information (AJAX)
function buy(){
 


  //Get the user data from contact form and products chosen
  const Name = NameEl.value;
  const Email = EmailEl.value;
  const Adress = AdressEl.value;
  const shipping = shippingEl.value;
  
  //allArrayItems gets the value of every id from the original array
  //Save our users values as a object in our variable myFieldData that we later convert to 
  //string format so we can save it in the database
   const allArrayItems = arrayItems.map(product => {
     return {"stringValue": product.id}
   });

  
   const myFieldData = {
      
          "fields": {
            "Adress": {
              "stringValue": Adress
            },
            "Name": {
              "stringValue": Name
            },
            "Email": {
              "stringValue": Email
            }, 
            "Shipping": {
              "stringValue": shipping
            },
            "idProducts": {
              "arrayValue": {
                "values": 
                allArrayItems                  
              }
            }

        }
      }
 
 

  fetch("https://firestore.googleapis.com/v1/projects/myshop-aa824/databases/(default)/documents/myShop",{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(myFieldData)
  })

      //Handels the answer from the API
      .then(res => res.json())
      .then(data => console.log(data));
  
      console.log("Your order has been sent!");
      console.log(myFieldData);

      localStorage.clear();
      
  }

  buttonEl.addEventListener('click', buy);


  
  //All fetch for all categorys


  //Men's clothing
  fetch("https://fakestoreapi.com/products/category/men's%20clothing")
  .then(result => result.json())
  .then(data => MensClothing(data));

  function MensClothing(output) {

    menSectionEl.classList.toggle("menCss");
    
    for (let i = 0; i < output.length; i++) {

      menSectionEl.innerHTML += 
      
      `
      <article class="article">
      <h2>${output[i].title}</h2>
      <img class="img"src=${output[i].image} alt="">
      <br><br>
      <b>${output[i].category}</b>
      <p> Description: ${output[i].description}</p>
      <strong>$${output[i].price}</strong>
      <p><input class="button" type="button" value="Add to cart" id="BuyButton" 
      onclick="addToCart('${output[i].id}', '${output[i].title.replace("'","")}', '${output[i].image}', '${output[i].price}');  yourTotalCost()"></p>
      <strong><br>id:${output[i].id}</strong>
      </article>

      `

  }

  }

  

  //Women's clothing
  fetch("https://fakestoreapi.com/products/category/women's%20clothing")
  .then(result => result.json())
  .then(data => WomensClothing(data));

  function WomensClothing(output) {

    womenSectionEl.classList.toggle("womenCss");
    
    for (let i = 0; i < output.length; i++) {

      womenSectionEl.innerHTML += 
      
      `
      <article class="article">
      <h2>${output[i].title}</h2>
      <img class="img"src=${output[i].image} alt="">
      <br><br>
      <b>${output[i].category}</b>
      <p> Description: ${output[i].description}</p>
      <strong>$${output[i].price}</strong>
      <p><input class="button" type="button" value="Add to cart" id="BuyButton" 
      onclick="addToCart('${output[i].id}', '${output[i].title.replace("'","")}', '${output[i].image}', '${output[i].price}');  yourTotalCost()"></p>
      <strong><br>id:${output[i].id}</strong>
      </article>

      `

  }

  }



  //Jewelry
  fetch('https://fakestoreapi.com/products/category/jewelery')
  .then(result => result.json())
  .then(data => Jewelry(data));

  function Jewelry(output) {

    jewelry2El.classList.toggle("jewelryCss");
    
    for (let i = 0; i < output.length; i++) {

      jewelry2El.innerHTML += 
      
      `
      <article class="article">
      <h2>${output[i].title}</h2>
      <img class="img"src=${output[i].image} alt="">
      <br><br>
      <b>${output[i].category}</b>
      <p> Description: ${output[i].description}</p>
      <strong>$${output[i].price}</strong>
      <p><input class="button" type="button" value="Add to cart" id="BuyButton" 
      onclick="addToCart('${output[i].id}', '${output[i].title.replace("'","")}', '${output[i].image}', '${output[i].price}');  yourTotalCost()"></p>
      <strong><br>id:${output[i].id}</strong>
      </article>

      `

  }

  }


  //Electronics
  fetch('https://fakestoreapi.com/products/category/electronics')
  .then(result => result.json())
  .then(data => Electronics(data));

  function Electronics(output) {

    electronicSectionEl.classList.toggle("elCss");
    
    for (let i = 0; i < output.length; i++) {

      electronicSectionEl.innerHTML += 
      
      `
      <article class="article">
      <h2>${output[i].title}</h2>
      <img class="img"src=${output[i].image} alt="">
      <br><br>
      <b>${output[i].category}</b>
      <p> Description: ${output[i].description}</p>
      <strong>$${output[i].price}</strong>
      <p><input class="button" type="button" value="Add to cart" id="BuyButton" 
      onclick="addToCart('${output[i].id}', '${output[i].title.replace("'","")}', '${output[i].image}', '${output[i].price}');  yourTotalCost()"></p>
      <strong><br>id:${output[i].id}</strong>
      </article>

      `

  }

  }




//---GET---
//GET (Read), reading in all information from the fakeshop API, and adding to chart
//and setting them to categories
fetch("https://fakestoreapi.com/products")
.then(result => result.json())
.then(data => myFunction(data));


function myFunction(output){

  console.log(output);

  let all = output;

   
  // count();
    

    for (let i = 0; i < all.length; i++) {
        
      

        sectionEl.innerHTML += 
        
        `
        <article class="article">
        <h2>${all[i].title}</h2>
        <img class="img"src=${all[i].image} alt="">
        <br><br>
        <b>${all[i].category}</b>
        <p> Description: ${all[i].description}</p>
        <strong>$${all[i].price}</strong>
        <p><input class="button" type="button" value="Add to cart" id="BuyButton" 
        onclick="addToCart('${all[i].id}', '${all[i].title.replace("'","")}', '${all[i].image}', '${all[i].price}');  yourTotalCost()"></p>
        <strong><br>id:${all[i].id}</strong>
        </article>

        `

    }
   
}


