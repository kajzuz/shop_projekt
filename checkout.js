"use strict";

//Get the class/id from HTML and make them to variables
const sectionCEl = document.getElementById("sectionC");
const sectionPriceEl = document.getElementById("sectionPrice");
const bodyCheckouteEl = document.getElementById("bodyCheckout");
const buyButtonEl = document.getElementById("buyButton");
    
  
//Printing out all of my saved products in localstore on the checkout site with total price
let price = 0;

if (localStorage.products) {


    let local = JSON.parse(localStorage.getItem("products")); 


    console.log(local);

    price = 0;

    for (let i = 0; i < local.length; i++) {
      
      sectionCEl.innerHTML += `
      <article class=articleCheckout>
      <br>
      <b>${local[i].title} </b><br><br> 
      <img width=25% src= ${local[i].image} alt=""><br> 
      <strong>$ ${local[i].price} </strong> <br><br>
      <img src="images/trashcanIcon.png" alt="traschcan icon"
      <input class="buttonDeleteProduct" type="button" value="" id="reduceButton" onclick="deleteProduct()">
      <br><br><br>
      </article>
      `
      price += parseFloat(local[i].price);
    }
  }

    sectionPriceEl.innerHTML += ` <h3> Your total price: </h3> <strong class="totalPrice">$ ${price.toFixed(2)} dollar </strong><br><br> 
    <input class="buttonBuy" type="button" value="Buy" id="buyButton" onclick="buyAll()">
    `
  
    function deleteProduct() {
      
      

    }

    //Message after order is sent
    function buyAll(){
    bodyCheckouteEl.innerHTML = `<h4 class="endText">Thank you for shopping at shoppingflex <br> Your order has been registrered!</h4>` ;
    };
      
   



