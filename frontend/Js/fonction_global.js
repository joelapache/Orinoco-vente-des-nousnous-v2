//Variables Globales
const url_api = `http://localhost:3000/api/teddies`;



// affichage du nombre du produit dans le panier
function produitEnPanier()
{
    var basket = extraireDuPanier("panier");
    if(document.querySelector("#qte_in_basket") != undefined) 
    {
        document.querySelector("#qte_in_basket").innerHTML = Object.keys(basket).length;
    }
}
setInterval("produitEnPanier()", 1000);




/**
 * -----------------------------------------------------
 * Ajout du produit dans le localstorage
 * -----------------------------------------------------
 * 
 * @param {*} item  "la cle (panier par exemple)"
 * @param {*} data  "les données a stokée avec cette clé"
 * @returns 
 * 
 */
function ajoutAuPanier(item, data)
{
    return localStorage.setItem(item, JSON.stringify(data));
}



/**
 * -----------------------------------------------------
 * Extraction du produit dans le localstorage
 * -----------------------------------------------------
 * 
 * @param {*} item  "la cle (panier par exemple)"
 * @returns 
 * 
 */
function extraireDuPanier(item)
{
    var basket = localStorage.getItem(item);
    if(basket == null) return new Object();

    return JSON.parse(basket);
}



/**
 * -----------------------------------------------------
 * Vider le panier
 * -----------------------------------------------------
 * 
 * @returns 
 * 
 */
function viderPanier(item)
{
    return localStorage.removeItem(item);
}


/**
 * ------------------------------------------------------
 *  Envoi des données au serveur
 * ------------------------------------------------------
 * 
 * @param {*} data 
 */

const envoiCommande = async function (data) {
    try {
        let response = await fetch('http://localhost:3000/api/teddies/order',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }
            });

        if (response) {

            let datas = await response.json();
            ajoutAuPanier("responseOrder", {token: datas.orderId});
            viderPanier("panier");

            if(datas.orderId != ""){
                window.location = "validation.html";
            }
            
        } else {
            alert('Erreur rencontrée : ' + response.status);
        }
    }
    catch (error) {
        alert("Erreur : " + error);
    }
};