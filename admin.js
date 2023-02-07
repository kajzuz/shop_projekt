"use strict";

//Get the class/id from HTML and make them to variables with the help of selectors
const allChoosenProductsEl = document.getElementById("allChoosenProducts");
const NameEl2 = document.getElementById("Name");
const EmailEl2 = document.getElementById("Email");
const AdressEl2 = document.getElementById("Adress");
const ProductIdsEl = document.getElementById("ProductIds");
const ShippingAdminEl = document.getElementById("ShippingAdmin");





  //---DELETE---
  //Removing user or order if needed
  function remove(id){


    fetch("https://firestore.googleapis.com/v1/" + id,{
        method: 'DELETE'
    })
        
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error =>console.log(error));
        
        console.log("Deleted!");
        
        location.reload();
    
    }



    //---PATCH---
    //Updating order if needed
    function update(id){

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
    
    
    
    
        fetch("https://firestore.googleapis.com/v1/" + id,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
           
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error =>console.log(error));
            console.log("Updated");

            setTimeout(() => {
            location.reload();
            }, 400);
        
    
        }



//All content orders from API, this print out all that is stored in the (database)
fetch("https://firestore.googleapis.com/v1/projects/myshop-aa824/databases/(default)/documents/myShop")
.then(result => result.json())
.then(data => myCart(data));


function myCart(data){
  

    console.log(data);

    let myCartContent = data.documents;
    

    for (let i = 0; i < myCartContent.length; i++) {

      // .values.map(values=>values.stringValue)
      

      allChoosenProductsEl.innerHTML += 
        
        `
      
        <article class="adminJs">
        <strong>Order id: <br></strong> ${myCartContent[i].name} <br><br>
        <strong>Name: </strong>${myCartContent[i].fields.Name.stringValue}<br><br>
        <strong>Email: </strong> ${myCartContent[i].fields.Email.stringValue}<br><br>
        <strong>Adress: </strong>${myCartContent[i].fields.Adress.stringValue}<br><br>

            
        <strong>Product id: </strong> ${myCartContent[i].fields.idProducts.arrayValue.values.map(values=>values.stringValue)}
        <br><br>
        <strong>Shipping: </strong>${myCartContent[i].fields.Shipping.stringValue}<br><br>
        
        
        <input class="button" type="button" value="Remove" id="removeButton" onclick="remove('${myCartContent[i].name}')">
        <input class="button" type="button" value="Update" id="updateButton" onclick="update('${myCartContent[i].name}')">
        </article>
        

        `

    }

}