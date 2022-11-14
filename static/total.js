function getTotal(){
    alert("works");
    console.log(document);
let total=document.getElementById(`amount`).innerText.replace(`$`,) ;
console.log(total);
const input= document.createElement("input");
input.setAttribute("type", "hidden");
input.setAttribute("id", "total");
input.setAttribute("value", total);
const form= getElementById(`payment`);
form.appendChild(input);
}