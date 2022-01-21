
window.addEventListener('load', function(){
    afficherListeProduit()
});




function afficherListeProduit()
{
    const tbody     = document.querySelector('#tbody-id');
    const tfoot     = document.querySelector('#tfoot-id');
    const object    = extraireDuPanier('panier');
    
    var data        = "";
    var prixtotal   = 0;
    var qtetotal    = 0;

    var i = 1;
    for(const property in object) {
        data += `<tr data-columns="${object[property]['teddyId']}">
          <td scope="col">${i}</td>
          <td scope="col">${object[property]['teddyNom']}</td>
          <td scope="col">${object[property]['teddyColor']}</td>
          <td scope="col">${object[property]['teddyPrice']} €</td>
          <td scope="col">${object[property]['quatity']}</td>
          <td scope="col" style="text-align: right;" ><i class="fas fa-trash remove-product-id"></i></td>
        </tr>`;

        prixtotal += Number(object[property]['teddyPrice']);
        qtetotal  += Number(object[property]['quatity']);

        i++;
    }

    // chargement de la liste des produit
    if(data == ""){
        tbody.insertAdjacentHTML('afterbegin', `<tr><td colspan="6" style="text-align:center;">Le panier est vide</td></tr>`);
    }else{
        tbody.insertAdjacentHTML('afterbegin',  data);
    }
       

    // chargement des  statistiques
    tfoot.innerHTML = `<tr>
    <th colspan="3">Totals</th>
    <th >${prixtotal} €</th>
    <th>${qtetotal}</th>
    <th>${prixtotal * qtetotal} €</th>
    </tr>`;
}




/**
 * ---------------------------------------------------------
 *  Suppression des produit du panier
 * ---------------------------------------------------------
 * 
 * si l'utilisateur souhaite retirer un produit du panier
 */

window.addEventListener('click', event => {
    if (event.target.classList.contains('remove-product-id')) 
    {
        // appel de la fonction extration des produits du panier
        var HisTeddies = extraireDuPanier("panier"); 
        var parent     = event.target.parentElement.parentElement;

        // confirmation de la suppression
        if(confirm("Voulez vraiment retirer ce produit de votre panier ?"))
        {
            // si ce produit existe dans le panier
            if(HisTeddies[parent.dataset.columns] != undefined)
            {
                if(HisTeddies.length == 1)
                {
                    viderPanier('panier'); // on vide le panier si c'est le seul produit
                }
                else{
                    // retire le produit du panier
                    delete HisTeddies[parent.dataset.columns]; 
                    ajoutAuPanier("panier", HisTeddies); 
                }

                parent.remove();
            }
            afficherListeProduit();
        }
    }
});


/////////////////Nom//////////////// valide///////////////////////////
function validationString(value) {
    return (value.length >= 2 && value.length <= 60) ? true : false;
};


function validMail(value) {
    return /^[a-z0-9_.-]{2,60}@+[a-z0-9_.-]{2,60}\.[a-z]{2,4}$/.test(value)
};
       
       
       
// envoie des données panier + contact au serveur si le formulaire est valide
document.getElementById("form").addEventListener("submit", function (event) 
{
    event.preventDefault();

    //Création de l'objet "contact"
    let contact = {
        firstName:  document.querySelector('#nombox').value,
        lastName:   document.querySelector('#prenombox').value,
        address:    document.querySelector('#adressbox').value,
        city:       document.querySelector('#villebox').value,
        email:      document.querySelector('#emailbox').value,
    }

    if (validationString(contact.firstName) && validationString(contact.lastName)
        && validationString(contact.address) && validationString(contact.city) && validMail(contact.email)) {
         
        //list des produit du panier
        var HisTeddies  = extraireDuPanier("panier"); 

        if(Object.keys(HisTeddies).length > 0)
        {
            var products    = [];
            var prixtotal   = 0;
            var qtetotal    = 0;
    
            for(const property in HisTeddies) 
            {
                prixtotal += Number(HisTeddies[property]['teddyPrice']);
                qtetotal  += Number(HisTeddies[property]['quatity']);
                products.push(HisTeddies[property]['teddyId']);
            }
          
            // envoie du prix total au localStorage
            ajoutAuPanier('totalPrice', {total: (prixtotal * qtetotal)});

            // appel de la fonction d'envoi de la commande
            envoiCommande({contact, products}); 
        }else{
            document.querySelector('#outpout').innerHTML = "Le panier est vide";
        }
    }
    else {
        document.querySelector('#outpout').innerHTML = "Remplissez Bien le formulaire SVP";
    }
})
