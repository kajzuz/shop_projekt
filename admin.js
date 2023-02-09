"use strict";

//Get the class/id from HTML and make them to variables with the help of selectors
const allChoosenProductsEl = document.getElementById("allChoosenProducts");
const NameEl2 = document.getElementById("Name");
const EmailEl2 = document.getElementById("Email");
const AdressEl2 = document.getElementById("Adress");
const ProductIdsEl = document.getElementById("ProductIds");
const ShippingAdminEl = document.getElementById("ShippingAdmin");


  //---DELETE---
  //Removing order if needed
  function remove(id){


    fetch("https://firestore.googleapis.com/v1/" + id,{
        method: 'DELETE'
    })
        
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error =>console.log(error));
        
        console.log("Deleted!");
        
        //Reload webbsite after order is deleted
        setTimeout(function(){
          location.reload();
      }, 300);
    
    }

   


    //---PATCH---
    //Updating order if needed
    function update(id){

    //Getting user information from form
    const Name = NameEl2.value;
    const Email = EmailEl2.value;
    const Adress = AdressEl2.value;
    const productId = ProductIdsEl.value;
    const ShippingAdmin = ShippingAdminEl.value;
    

    if (
      NameEl2.value.length > 0 &&
      EmailEl2.value.length >0 &&
      AdressEl2.value.length > 0 &&
      ProductIdsEl.value.length > 0 &&
      ShippingAdminEl.value
    ) {
      
    


      const body = {
      
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
            "stringValue": ShippingAdmin
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
    }
    
    
    
    
        fetch("https://firestore.googleapis.com/v1/" + id,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
           
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error =>console.log(error));
            
            console.log("Updated");

           //Reload webbsite after order is updated
            setTimeout(function(){
              location.reload();
            }, 500);
        
    
        }else{
          alert("All fields is required!");
        }

      }

        //Creating date to use in my orders
        let myDate = new Date();
        let day = myDate.getDate();
        let month = myDate.getMonth() + 1;
        let year = myDate.getFullYear();
        

//All orders from my databse in firestore, this prints out all that is stored in the (database)
fetch("https://firestore.googleapis.com/v1/projects/myshop-aa824/databases/(default)/documents/myShop")
.then(result => result.json())
.then(data => myCart(data))
.catch(error =>console.log(error));


function myCart(data){
  

    console.log(data);

    let myCartContent = data.documents;
    

    for (let i = 0; i < myCartContent.length; i++) {

      

      allChoosenProductsEl.innerHTML += 
        
        `
      
        <article class="adminJs">
        <br>
        <strong>Order id: <br></strong> ${myCartContent[i].name} <br><br>
        <strong>Order date: <br></strong> ${year + "/" + month + "/" + day} <br><br>
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