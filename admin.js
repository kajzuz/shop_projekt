"use strict";

//Get the class/id from HTML and make them to variables
const allChoosenProductsEl = document.getElementById("allChoosenProducts");
const NameEl2 = document.getElementById("Name");
const EmailEl2 = document.getElementById("Email");
const AdressEl2 = document.getElementById("Adress");


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
    //Updating information or order if needed
    function update(name){

    //Getting user information from form
    const Name = NameEl2.value;
    const Email = EmailEl2.value;
    const Adress = AdressEl2.value;
    // const idProducts = arrayItems;
    
    
    const body = JSON.stringify(
            {
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
                    // "idProducts": {
                    //   "arrayValue": {
                    //     "values": idProducts
                    //   }
                    // }
      
                }
          
                
            }
        )
    
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

    let myChartContent = data.documents;
    
    

    for (let i = 0; i < myChartContent.length; i++) {

        // <h4>${myChartContent[i].title}</h4>
        // <img class="img"src=${myChartContent[i].image} alt=""><br></br>
        // <strong>$${myChartContent[i].price}</strong>
        
        // <p>id: ${myChartContent[i].name}</p>
     
        // <p>Products: ${myChartContent[i].fields.idProducts.stringValue}</p>

      allChoosenProductsEl.innerHTML += 
        
        `
        <hr>
        <article>
        <h4>Name: ${myChartContent[i].fields.Name.stringValue}</h4>
        <p>Email: ${myChartContent[i].fields.Email.stringValue}</p>
        <p>Adress: ${myChartContent[i].fields.Adress.stringValue}</p>
        
        
        <input class="button" type="button" value="Remove" id="removeButton" onclick="remove('${myChartContent[i].name}')">
        <input class="button" type="button" value="Update" id="updateButton" onclick="update('${myChartContent[i].name}')">
        </article>
        </hr>

        `

    }

}