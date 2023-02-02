"use strict";

//Get the class/id from HTML and make them to variables
const allChoosenProductsEl = document.getElementById("allChoosenProducts");
const NameEl2 = document.getElementById("Name");
const EmailEl2 = document.getElementById("Email");
const AdressEl2 = document.getElementById("Adress");
const ProductIdsEl = document.getElementById("ProductIds");
const ShippingAdminEl = document.getElementById("ShippingAdmin");



//---DELETE---
//Removing user or order if needed
function remove(name){


    fetch("https://firestore.googleapis.com/v1/" + name,{
        method: 'DELETE'
    })
        
        .then(res => res.json())
        .then(data => console.log(data));
        
        console.log("Deleted!");
    
    }



    //---PATCH---
    //Updating information or order if needed, make update work!
    function update(name){

    //Getting user information from form
    const Name = NameEl2.value;
    const Email = EmailEl2.value;
    const Adress = AdressEl2.value;
    const productId = ProductIdsEl.value;
    const deliveryAdmin = ShippingAdminEl.value;
    


      const body = JSON.stringify({
      
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
            "stringValue": deliveryAdmin
          },
          "idProducts": {
            "arrayValue": {
              "values": [{
                "stringValue": productId
              },
            ] 
                                
            }
          }

      }
    })
    
    
    
    
        fetch("https://firestore.googleapis.com/v1/" + name,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
           
        })
            .then(res => res.json())
            .then(data => console.log(data));
            console.log("Updated");
    
        }



//All content from cart, make this print out all that is store in the cart
fetch("https://firestore.googleapis.com/v1/projects/myshop-aa824/databases/(default)/documents/myShop")
.then(result => result.json())
.then(data => myCart(data));


function myCart(data){


    console.log(data);

    let myCartContent = data.documents;
    

    for (let i = 0; i < myCartContent.length; i++) {

      

      allChoosenProductsEl.innerHTML += 
        
        `
      
        <article class="adminJs">
        <p>id: ${myCartContent[i].name}</p>
        <h4>Name: ${myCartContent[i].fields.Name.stringValue}</h4>
        <p>Email: ${myCartContent[i].fields.Email.stringValue}</p>
        <p>Adress: ${myCartContent[i].fields.Adress.stringValue}</p>

            
        <p>Shipping: ${myCartContent[i].fields.Shipping.stringValue}</p>
        <p>${"Product id: " + myCartContent[i].fields.idProducts.arrayValue.values.map(values=>values.stringValue)}</p> 
        
        
        <input class="button" type="button" value="Remove" id="removeButton" onclick="remove('${myCartContent[i].name}')">
        <input class="button" type="button" value="Update" id="updateButton" onclick="update('${myCartContent[i].name}')">
        </article>
        

        `

    }

}