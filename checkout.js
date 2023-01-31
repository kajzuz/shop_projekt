"use strict";

const loginEl = document.getElementById("login");
const buttonEl = document.getElementById("submitButton");
const NameEl = document.getElementById("Name");
const EmailEl = document.getElementById("Email");
const AdressEl = document.getElementById("Adress");
const radio1El = document.getElementById("Shipping1");
const radio2El = document.getElementById("Shipping2");
const radio3El = document.getElementById("Shipping3");
const radio4El = document.getElementById("Shipping4");


//Makes sure the form has values before it is sent
loginEl.addEventListener('input',() => {


    if(
      NameEl.value.length > 0 &&
      EmailEl.value.length > 0 &&
      AdressEl.value.length > 0 &&
      document.getElementById("Shipping1").checked ||
      document.getElementById("Shipping2").checked ||
      document.getElementById("Shipping3").checked ||
      document.getElementById("Shipping4").checked
      
     ){
      buttonEl.removeAttribute('disabled');
      }else{
        buttonEl.setAttribute('disabled','disabled');
      }
  
  
  });

//---POST---
//Funktion POST (create), add user and product information
function buy(){
 



    //Get the user data from contact form and products chosen
    const Name = NameEl.value;
    const Email = EmailEl.value;
    const Adress = AdressEl.value;
    // const idProducts = arrayItems;

    // console.log(idProducts);
    
  //   const arrayItems = arrayItems.map(arrayItems => {
  //     return {"stringValue": arrayItems.id}
  // });

    //Put user values to JSON-object
    let bodyVariable = JSON.stringify({
    

        
            "fields": {
              "Adress": {
                "stringValue": Adress
              },
              "Name": {
                "stringValue": Name
              },
              "Email": {
                "stringValue": Email
              } //this gives issues, solve the 400 error
            //   "idProducts": {
            //     "arrayValue": {
            //       "values": [
            //           idProducts
            //       ]
            //     }
            //   }

          }
    
    })

   

    fetch("https://firestore.googleapis.com/v1/projects/myshop-aa824/databases/(default)/documents/myShop",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: bodyVariable
    })
  
    
        .then(res => res.json())
        .then(data => console.log(data));
    
        console.log("Added in cart");
        console.log(bodyVariable);
        
    }

    buttonEl.addEventListener('click', buy);
