"use strict";

//Get the class/id from HTML and make them to variables
const sectionEl = document.getElementById("section");
const containerEl = document.getElementsByClassName("container");
const NameEl = document.getElementById("Name");
const EmailEl = document.getElementById("Email");
const AdressEl = document.getElementById("Adress");
const buttonEl = document.getElementById("submitButton");
const id = document.getElementById("id");

const loginEl = document.getElementById("login");
const deliveryEl = document.getElementById("Shipping");

//Do i need these four?
const womenEl = document.getElementsByClassName("women");
const jewelry2El = document.getElementById("jewelry2");
const manEl = document.getElementsByClassName("man");
const electronicsEl = document.getElementsByClassName("electronics");

const womenSectionEl = document.getElementById("womenSection");
const menSectionEl = document.getElementById("menSection");
const electronicSectionEl = document.getElementById("electronicSection");

const all = document.getElementsByClassName("all");
const jewelryButtonEl = document.getElementById("jewelryButton");





//jewelry
fetch("https://fakestoreapi.com/products/category/jewelery")
.then(result => result.json())
.then(data => jewelry(data));


function jewelry (data){

    
  
  let jewelryQ = data;


  jewelry2El.classList.toggle("jewelryCss");


  // console.log("This variable is: " + JSON.stringify(jewelryQ));

  

  for (let i = 0; i < jewelryQ.length; i++) {
    
    jewelry2El.innerHTML += `
    
        <h2>${jewelryQ[i].title}</h2>
        <img class="img"src=${jewelryQ[i].image} alt="">
        <br><br>
        <b>${jewelryQ[i].category}</b>
        <p> Description: ${jewelryQ[i].description}</p>
        <strong>$${jewelryQ[i].price}</strong>
        <p><input class="button" type="button" value="Add to cart" id="BuyButton" 
        onclick="addToCart('${jewelryQ[i].id}', '${jewelryQ[i].title}', '${jewelryQ[i].image}', '${jewelryQ[i].price}'); count()"></p>

    `
    
  }

}

//women
fetch("https://fakestoreapi.com/products/category/women's%20clothing")
.then(result => result.json())
.then(outWomen => womenClothing(outWomen));

function womenClothing(outWomen) {

  
  let womensQ = outWomen;

  console.log(womensQ);

  womenSectionEl.classList.toggle("womenCss");
  


  for (let i = 0; i < womensQ.length; i++) {
    
    womenSectionEl.innerHTML += `
    
        <h2>${womensQ[i].title}</h2>
        <img class="img"src=${womensQ[i].image} alt="">
        <br><br>
        <b>${womensQ[i].category}</b>
        <p> Description: ${womensQ[i].description}</p>
        <strong>$${womensQ[i].price}</strong>
        <p><input class="button" type="button" value="Add to cart" id="BuyButton" 
        onclick="addToCart('${womensQ[i].id}', '${womensQ[i].title}', '${womensQ[i].image}', '${womensQ[i].price}'); count()"></p>

    `
    
  }


}

//men
fetch("https://fakestoreapi.com/products/category/men's%20clothing")
.then(result => result.json())
.then(outMan => mensClohing(outMan));

function mensClohing(outMan) {

  
  let manQ = outMan;

  console.log(manQ);

  menSectionEl.classList.toggle("menCss");
  


  for (let i = 0; i < manQ.length; i++) {
    
    menSectionEl.innerHTML += `
    
        <h2>${manQ[i].title}</h2>
        <img class="img"src=${manQ[i].image} alt="">
        <br><br>
        <b>${manQ[i].category}</b>
        <p> Description: ${manQ[i].description}</p>
        <strong>$${manQ[i].price}</strong>
        <p><input class="button" type="button" value="Add to cart" id="BuyButton" 
        onclick="addToCart('${manQ[i].id}', '${manQ[i].title}', '${manQ[i].image}', '${manQ[i].price}'); count()"></p>

    `
    
  }


}

//electronic
fetch("https://fakestoreapi.com/products/category/electronics")
.then(result => result.json())
.then(outel => electronics(outel));

function electronics(outel) {

  
  let elQ = outel;

  console.log(elQ);

  electronicSectionEl.classList.toggle("elCss");
  


  for (let i = 0; i < elQ.length; i++) {
    
    electronicSectionEl.innerHTML += `
    
        <h2>${elQ[i].title}</h2>
        <img class="img"src=${elQ[i].image} alt="">
        <br><br>
        <b>${elQ[i].category}</b>
        <p> Description: ${elQ[i].description}</p>
        <strong>$${elQ[i].price}</strong>
        <p><input class="button" type="button" value="Add to cart" id="BuyButton" 
        onclick="addToCart('${elQ[i].id}', '${elQ[i].title}', '${elQ[i].image}', '${elQ[i].price}'); count()"></p>

    `
    
  }


}



// //Makes sure the form has values before it is sent, fix this more
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
let countsClick = 0;
const out = document.getElementById("counter");

function count(){

countsClick++;
out.innerHTML = countsClick;

}


//For counting all the prices of the products, add this function ta all other funktions
//Put this in checkout
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

let arrayItems = [];


function addToCart(id, title, image, price) {

  arrayItems.push({
    id,
    title,
    image,
    price,
  });

  let local = JSON.stringify(arrayItems);

  localStorage.setItem("products", local);

  // console.log(arrayItems);


  // location.reload();

  if (localStorage.products) {

    let local = localStorage.getItem("products");
    let arrayItems = JSON.parse(local);

    console.log(arrayItems);

    // localStorageEl.innerHTML = "<br> " + save;
    // localStorage2El.innerHTML = local;

  }
  
}



//---POST---
//Funktion POST (create), add user and product information
function buy(){
 


  //Get the user data from contact form and products chosen
  const Name = NameEl.value;
  const Email = EmailEl.value;
  const Adress = AdressEl.value;
  const delivery = deliveryEl.value;
  // const idProducts = arrayItems;

  // console.log(idProducts);
  
   const allArrayItems = arrayItems.map(items => {
     return {"stringValue": items.id}
   });

  //Put user values to JSON-object
  // let bodyVariable = JSON.stringify({
  
   const allData ={
      
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
              "stringValue": delivery
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
      body: JSON.stringify(allData)
      // bodyVariable
  })

  
      .then(res => res.json())
      .then(data => console.log(data));
  
      console.log("Your order has been sent!");
      console.log(allData);
      // console.log(bodyVariable);
      
  }

  buttonEl.addEventListener('click', buy);



//---GET---
//GET (Read), reading in all information from the fakeshop API, and adding to chart
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
        onclick="addToCart('${all[i].id}', '${all[i].title}', '${all[i].image}', '${all[i].price}'); count(); yourTotalCost()"></p>
        <strong><br>id:${all[i].id}</strong>
        </article>

        `

    }
   
}


