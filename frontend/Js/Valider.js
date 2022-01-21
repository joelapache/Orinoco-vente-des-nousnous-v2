
window.addEventListener("load" ,function(){
    valideCommande();  
});

function valideCommande()
{
    let orderId = extraireDuPanier('responseOrder');
    document.getElementById("orderId").innerHTML += ` <p id="ref">NUMERO DE SUIVI DE PRODUIT(S) </p> <strong id="ordercss">${orderId['token']} <strong>`;

    // récupération du prix total de la commande
    let totalPrice = extraireDuPanier('totalPrice');
   
    document.getElementById("recap").innerHTML +=`<p id="idprix">PRIX TOTAL : </p>
    <strong id="Price">${ parseFloat(totalPrice.total).toFixed(2) } Euro </strong">`;
    
    // Efface localStorage
    localStorage.clear();
}