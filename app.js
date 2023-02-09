"use strict";

//Get the class/id from HTML and make them to variables with the help of selectors
const sectionEl = document.getElementById("section");
const containerEl = document.getElementsByClassName("container");

const all = document.getElementsByClassName("all");
const jewelryButtonEl = document.getElementById("jewelryButton");
const localStorage2El = document.getElementById("localStorage2");


const jewelry2El = document.getElementById("jewelry2");
const womenSectionEl = document.getElementById("womenSection");
const menSectionEl = document.getElementById("menSection");
const electronicSectionEl = document.getElementById("electronicSection");




//For counting all the prices of the products 
let price = 0;

function yourTotalCost(){

  price = 0;

  for (let i = 0; i < arrayItems.length; i++) {
    price += parseFloat(arrayItems[i].price);
    
    
  }
  console.log("Total Price " + price.toFixed(2));

}


//Getting localstorage to see if any products is stored in my array, 
//other wise the array is empty
let arrayItems = JSON.parse(localStorage.getItem("products")) || []

//Making a array and push the products into it
//as well as converting it to JSON with stringlify, and count amount of products in cart
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
let countsClick = 0;
const out = document.getElementById("counter");

function count(){
 
  countsClick++;

  //Creating a new variable and give it the value of my array
  //to loop through for amount of product in cart
  const allProductsInMyArray = arrayItems;
    
  for (let i = 0; i < allProductsInMyArray.length; i++) {

          out.innerHTML = allProductsInMyArray.length;
    }

}
count();




  
  //All fetch for all categorys

  //Men's clothing
  function MensClothing() {

    fetch("https://fakestoreapi.com/products/category/men's%20clothing")
    .then(result => result.json())
    .then(data => forLoopMens(data))
    .catch(error =>console.log(error));

    menSectionEl.classList.toggle("menCss");

  }

  function forLoopMens(output) {
    
    sectionEl.innerHTML = "";
   
    menSectionEl.classList.toggle("menCss");

    menSectionEl.innerHTML = "";

    
    for (let i = 0; i < output.length; i++) {

      menSectionEl.innerHTML += 
      
      `
      <article class="articleMens">
      <h2>${output[i].title}</h2>
      <img class="img"src=${output[i].image} alt="">
      <br><br>
      <b>${output[i].category}</b>
      <p> Description: ${output[i].description}</p>
      <strong>$${output[i].price}</strong>
      <p><input class="button" type="button" value="Add to cart" id="BuyButton" 
      onclick="addToCart('${output[i].id}', '${output[i].title.replace("'","")}', '${output[i].image}', '${output[i].price}');  yourTotalCost()"></p>
      <strong ><br>Product id: ${output[i].id}</strong><br>
      <strong class="rating"><br>rating: ${output[i].rating.rate} / 5</strong>
      <br><br>
      </article>

      `
  }
  

  }

  

   //Women's clothing
  function WomensClothing() {

    fetch("https://fakestoreapi.com/products/category/women's%20clothing")
    .then(result => result.json())
    .then(data => forLoopWomens(data))
    .catch(error =>console.log(error));

    
    womenSectionEl.classList.toggle("womenCss");
    

  }

  function forLoopWomens(output) {

    sectionEl.innerHTML = "";

    womenSectionEl.classList.toggle("womenCss");
    womenSectionEl.innerHTML ="";
    
    for (let i = 0; i < output.length; i++) {

      womenSectionEl.innerHTML += 
      
      `
      <article class="articleWomens">
      <h2>${output[i].title}</h2>
      <img class="img"src=${output[i].image} alt="">
      <br><br>
      <b>${output[i].category}</b>
      <p> Description: ${output[i].description}</p>
      <strong>$${output[i].price}</strong>
      <p><input class="button" type="button" value="Add to cart" id="BuyButton" 
      onclick="addToCart('${output[i].id}', '${output[i].title.replace("'","")}', '${output[i].image}', '${output[i].price}');  yourTotalCost()"></p>
      <strong ><br>Product id: ${output[i].id}</strong><br>
      <strong class="rating"><br>rating: ${output[i].rating.rate} / 5</strong>
      <br><br>
      </article>

      `
  }
  }



  
  //Jewelry
  function Jewelry() {

    fetch('https://fakestoreapi.com/products/category/jewelery')
    .then(result => result.json())
    .then(data => forLoopJewelry(data))
    .catch(error =>console.log(error));

    jewelry2El.classList.toggle("jewelryCss");

  }

  function forLoopJewelry(output) {

    sectionEl.innerHTML = "";

    jewelry2El.classList.toggle("jewelryCss");
    jewelry2El.innerHTML = "";
    
    for (let i = 0; i < output.length; i++) {

      jewelry2El.innerHTML += 
      
      `
      <article class="articleJewelry">
      <h2>${output[i].title}</h2>
      <img class="img"src=${output[i].image} alt="">
      <br><br>
      <b>${output[i].category}</b>
      <p> Description: ${output[i].description}</p>
      <strong>$${output[i].price}</strong>
      <p><input class="button" type="button" value="Add to cart" id="BuyButton" 
      onclick="addToCart('${output[i].id}', '${output[i].title.replace("'","")}', '${output[i].image}', '${output[i].price}');  yourTotalCost()"></p>
      <strong ><br>Product id: ${output[i].id}</strong><br>
      <strong class="rating"><br>rating: ${output[i].rating.rate} / 5</strong>
      <br><br>
      </article>

      `

  }
  }


 
  //Electronics
  function Electronics(output) {

    fetch('https://fakestoreapi.com/products/category/electronics')
    .then(result => result.json())
    .then(data => forLoopElectronics(data))
    .catch(error =>console.log(error));

    electronicSectionEl.classList.toggle("elCss");

  }

  function forLoopElectronics(output) {

    sectionEl.innerHTML = "";

    electronicSectionEl.classList.toggle("elCss");
    electronicSectionEl.innerHTML ="";
    
    for (let i = 0; i < output.length; i++) {

      electronicSectionEl.innerHTML += 
      
      `
      <article class="articleElectronic">
      <h2>${output[i].title}</h2>
      <img class="img"src='${output[i].image}' alt="">
      <br><br>
      <b>${output[i].category}</b>
      <p> Description: ${output[i].description}</p>
      <strong>$${output[i].price}</strong>
      <p><input class="button" type="button" value="Add to cart" id="BuyButton" 
      onclick="addToCart('${output[i].id}', '${output[i].title.replace("'","")}', '${output[i].image}', '${output[i].price}');  yourTotalCost()"></p>
      <strong ><br>Product id: ${output[i].id}</strong><br>
      <strong class="rating"><br>rating: ${output[i].rating.rate} / 5</strong>
      <br><br>
      </article>

      `

  }
  }




//---GET---
//GET (Read), reading in all information from the fakeshop API, and adding to cart
fetch("https://fakestoreapi.com/products")
.then(result => result.json())
.then(data => myFunction(data))
.catch(error =>console.log(error));


function myFunction(output){

  

  console.log(output);

  let all = output;
    

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
        <strong ><br>Product id: ${output[i].id}</strong><br>
        <strong class="rating"><br>rating: ${output[i].rating.rate} / 5</strong>
        <br><br>
        </article>

        `

    }
   
}


