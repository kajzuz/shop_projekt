"use strict";

//Get the class/id from HTML and make them to variables with the help of selectors
const sectionCEl = document.getElementById("sectionC");
const sectionPriceEl = document.getElementById("sectionPrice");
const bodyCheckouteEl = document.getElementById("bodyCheckout");
const buyButtonEl = document.getElementById("buyButton");
const articleCheckoutEl = document.getElementsByClassName("articleCheckout");
const removeButtonEl = document.getElementById("removeButton");

const NameEl = document.getElementById("Name");
const EmailEl = document.getElementById("Email");
const AdressEl = document.getElementById("Adress");
const buttonEl = document.getElementById("submitButton");
const id = document.getElementById("id");

const loginEl = document.getElementById("login");
const shippingEl = document.getElementById("Shipping");

    

//Printing out all of my saved products in localstore on the checkout site with total price
let local;
let price = 0;

if (localStorage.products) {


    local = JSON.parse(localStorage.getItem("products")); 

   
    console.log(local);

    price = 0;

    for (let i = 0; i < local.length; i++) {
      
      sectionCEl.innerHTML += `
      <article class="articleCheckout">
      <br>
      <b>${local[i].title} </b><br><br> 
      <img width=25% src= '${local[i].image}' alt=""><br> 
      <strong>$ ${local[i].price} </strong> <br><br>
      <img class="iconTrash" src="images/trashcanIcon.png" alt="traschcan icon"
      <input class="buttonDeleteProduct" type="button" value="" id="removeButton" onclick="removeProduct(${i})">
      <br><br><br>
      </article>
      `
      price += parseFloat(local[i].price);


    }

  }else{
    sectionCEl.innerHTML = "<strong class='emptyText'>You have not added anything to your cart yet!</strong>"
  }


    sectionPriceEl.innerHTML += ` <h3> Your total price: </h3> <strong class="totalPrice">$ ${price.toFixed(2)} dollar </strong><br><br> 
    `


  
    //Removes product that is clickt on, and stores the new amount in localstorage
    function removeProduct(i) {
    
    console.log(local.splice(i,1));

           
    localStorage.setItem("products", JSON.stringify(local));     
        

    location.reload();

      
    }

    


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



  //Getting localstorage to see if any products is stored in my array, 
  //other wise the array is empty
  let arrayItems = JSON.parse(localStorage.getItem("products")) || []


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
        //Catch in case something goes wrong
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error =>console.log(error));
    
        console.log("Your order has been sent!");
        console.log(myFieldData);

        //Clear localstorage when placing a order "reset"
        localStorage.clear();

        //Clear the site and replacing in with a nice message
        bodyCheckouteEl.innerHTML = `<h4 class="endText">Thank you for shopping at shoppingflex <br> Your order has been registrered!</h4>` ;
        
    }

    buttonEl.addEventListener('click', buy);


