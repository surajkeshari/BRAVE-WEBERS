if(document.readyState=='loading'){
    document.addEventListener("DOMContentLoaded",ready);
}else{
    ready();
}

function ready(){
   let orderButtons =document.getElementsByClassName(`order`);
   for(let i=0;i<orderButtons.length;i++){
       orderButtons[i].addEventListener('click',()=>{
           AddToCart(orderButtons[i]);
       })
   }
    
   
}

function addListeners(){
    
    let deleteButtons= document.getElementsByClassName(`btn`);
    for(var i=0;i<deleteButtons.length;i++){
        deleteButtons[i].addEventListener(`click`,(e)=>{
           let row= e.target.parentElement.parentElement;
           row.remove();
           updateTotal();
        })
        }
        let quantity= document.getElementsByClassName(`quantity`);
        for(var i=0;i<quantity.length;i++){
            quantity[i].addEventListener('change',changequant);
        }
}
function changequant(e){
   if(isNaN(e.target.value) || e.target.value<=0){
       e.target.value=1;
   }else{
       updateTotal();
   }

}

function updateTotal(){
    let container= document.getElementsByClassName(`container`)[0];
     let total= 0;
    let rows= container.getElementsByClassName(`row`);
    
    for(var i=0;i<rows.length;i++){
        console.log(rows[i]);
       let price= parseFloat(rows[i].children[0].children[1].innerText.replace(`$`,``));
       let quantity= parseFloat(rows[i].children[0].children[2].value);
       total+=price*quantity;
       
       console.log(price,quantity);
    }
    document.getElementById(`amount`).innerText="$"+total.toString();
}

function AddToCart(button){
 let card= button.parentElement.parentElement;
 let name= card.getElementsByClassName("name")[0].innerText;
 let price = card.getElementsByClassName("price")[0].innerText;

 // Check wheter item is already present in cart or not
let rows = document.getElementsByClassName('row');
for(let i=0;i<rows.length;i++){
   if(name==rows[i].children[0].children[0].innerText)
   return;
}
//

 let newrow=` <div class="row">
 <ul>
     <li>${name}</li>
     <li>${price}</li>
     <input type="number" name="quantity" class="quantity" min="1" max="5" value="1">
     <button class="btn">Delete</button>
 </ul>
</div>`
document.getElementsByClassName(`container`)[0].innerHTML+=newrow;
updateTotal();
addListeners();
}

