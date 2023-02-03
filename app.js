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
// const womenEl = document.getElementsByClassName("women");
// const jewelry2El = document.getElementById("jewelry2");
// const manEl = document.getElementsByClassName("man");
// const electronicsEl = document.getElementsByClassName("electronics");

const womenSectionEl = document.getElementById("womenSection");
const menSectionEl = document.getElementById("menSection");
const electronicSectionEl = document.getElementById("electronicSection");

const all = document.getElementsByClassName("all");
const jewelryButtonEl = document.getElementById("jewelryButton");
const localStorage2El = document.getElementById("localStorage2");

const out = document.getElementById("counter");






//Makes sure the form has values before it is sent
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
let arrayItems = JSON.parse(localStorage.getItem("products")) || []


function addToCart(id, title, image, price) {

  arrayItems.push({
    id,
    title,
    image,
    price,
  });

  let local = JSON.stringify(arrayItems);

  localStorage.setItem("products", local);

  console.log(arrayItems);
        
  count();

  // location.reload();
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
  const delivery = deliveryEl.value;
  
  //allArrayItems gets the value of every items id from the original arrayItems 
   const allArrayItems = arrayItems.map(items => {
     return {"stringValue": items.id}
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
      body: JSON.stringify(myFieldData)
  })

  
      .then(res => res.json())
      .then(data => console.log(data));
  
      console.log("Your order has been sent!");
      console.log(myFieldData);
      // console.log(bodyVariable);
      
  }

  buttonEl.addEventListener('click', buy);



//   .then(result => result.json())
// .then(data => myFunction(data));




//---GET---
//GET (Read), reading in all information from the fakeshop API, and adding to chart
//and setting them to categories
fetch("https://fakestoreapi.com/products")
.then(res => res.json())
.then(data => {
    let differentButtons = document.getElementsByClassName("catergory");
    for (let i = 0; i < differentButtons.length; i++) {
      differentButtons[i].addEventListener("click", function () {
          myFunction(data, this.getAttribute("Allcategory"));
        });
    }
    myFunction(data, "all");
});


function myFunction(output, selectedCategory){

  console.log(output);

  // let all = output;

 // filters out the category we want
  const all = output.filter(all => {
    if (selectedCategory === "all") {
        return true;
    } else if (selectedCategory === all.category) {
        return true;
    }
    return false;
  });
  //Resets the category
  sectionEl.innerHTML = "";
  

   
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


