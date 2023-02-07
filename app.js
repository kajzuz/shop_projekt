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
    }
    else{
      buttonEl.setAttribute('disabled','disabled');
    }
    
});




//For counting all the prices of the products 
let price = 0;

function yourTotalCost(){

  price = 0;

  for (let i = 0; i < arrayItems.length; i++) {
    price += parseFloat(arrayItems[i].price);
    
    
  }
  console.log("Total Price " + price.toFixed(2));

}


//Getting localstorage to see if any products is stored there, 
//other wise the array is empty
let arrayItems = JSON.parse(localStorage.getItem("products")) || []

//Making a array and push the products into it
//as well as converting it to JSON with stringlify, and count function for cart
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

 const out = document.getElementById("counter");

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
      .then(data => console.log(data))
      .catch(error =>console.log(error));
  
      console.log("Your order has been sent!");
      console.log(myFieldData);

      localStorage.clear();
      
  }

  buttonEl.addEventListener('click', buy);




  
  //All fetch for all categorys

  //Men's clothing
  function MensClothing() {

    fetch("https://fakestoreapi.com/products/category/men's%20clothing")
    .then(result => result.json())
    .then(data => forLoopMens(data));

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
      <strong><br>id:${output[i].id}</strong>
      <strong><br>rating: ${output[i].rating.rate} / 5</strong>
      <br><br>
      </article>

      `
  }
  

  }

  

   //Women's clothing
  function WomensClothing() {

    fetch("https://fakestoreapi.com/products/category/women's%20clothing")
    .then(result => result.json())
    .then(data => forLoopWomens(data));

    
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
      <strong><br>id:${output[i].id}</strong>
      <strong><br>rating: ${output[i].rating.rate} / 5</strong>
      <br><br>
      </article>

      `
  }
  }



  
  //Jewelry
  function Jewelry() {

    fetch('https://fakestoreapi.com/products/category/jewelery')
    .then(result => result.json())
    .then(data => forLoopJewelry(data));

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
      <strong><br>id:${output[i].id}</strong>
      <strong><br>rating: ${output[i].rating.rate} / 5</strong>
      <br><br>
      </article>

      `

  }
  }


 
  //Electronics
  function Electronics(output) {

    fetch('https://fakestoreapi.com/products/category/electronics')
    .then(result => result.json())
    .then(data => forLoopElectronics(data));

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
      <strong><br>id:${output[i].id}</strong>
      <strong><br>rating: ${output[i].rating.rate} / 5</strong>
      <br><br>
      </article>

      `

  }
  }




//---GET---
//GET (Read), reading in all information from the fakeshop API, and adding to cart
fetch("https://fakestoreapi.com/products")
.then(result => result.json())
.then(data => myFunction(data));


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
        <strong><br>id:${all[i].id}</strong><br><br>
        <strong><br>rating: ${output[i].rating.rate} / 5</strong>
        <br><br>
        </article>

        `

    }
   
}


