"use strict";

//Get the class/id from HTML and make them to variables
const sectionCEl = document.getElementById("sectionC");
const sectionPriceEl = document.getElementById("sectionPrice");
const bodyCheckouteEl = document.getElementById("bodyCheckout");
const buyButtonEl = document.getElementById("buyButton");
    
  
//Printing out all of my saved products in localstore on the checkout site
if (localStorage.products) {


    let local = JSON.parse(localStorage.getItem("products")); //Make the minus and plus buttom work


    console.log(local);

    for (let i = 0; i < local.length; i++) {
      
      sectionCEl.innerHTML += `
      <article class=articleCheckout>
      <b>${local[i].title} </b><br> 
      <img width=10% src= ${local[i].image} alt=""><br> 
      <strong>$ ${local[i].price} </strong> <br>
      <input class="buttonReduce" type="button" value="-" id="reduceButton" onclick="reduce('${""}')">
      <b></b>
      <input class="buttonIncrease" type="button" value="+" id="increaseButton" onclick="increase('${""}')">
      <br><br><br>
      </article>
      `
      
    }
   
      
  }
  

    //For counting all the prices of the products, add this function ta all other funktions
    //Put this in checkout, make this count!
    let price = 0;

    function yourTotalCost(){

    price = 0;

    for (let i = 0; i < localStorage.length; i++) {
        price += parseFloat(localStorage[i].price);
        
        
    }

    }
    

    sectionPriceEl.innerHTML += ` <h3> Your total price: </h3> ${price.toFixed(2)} <br><br> 
    <input class="buttonBuy" type="button" value="Buy" id="buyButton" onclick="buyAll()">
    `

    
    function buyAll(){
    bodyCheckouteEl.innerHTML = `<h4 class="endText">Thank you for shopping at shoppingflex <br> Your order has been registrered!</h4>` ;
    };
      
   



