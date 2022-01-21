window.addEventListener("load", function () {
    console.log("loaded")
    getTedis()

})


//console.log(teddies_Url);
var getTedis = () => {
    const searchParams = new URLSearchParams(location.search);
    const id_teddies = searchParams.get("_id");
    const teddies_Url = `http://localhost:3000/api/teddies/${id_teddies}`;
    fetch(teddies_Url)
        .then((response) => response.json())
        .then((data) => {
            listerElemnt(data);
    });
}


/*affichage des elelemnt*/
function listerElemnt(data) {

    //parcourir la liste 
    const card = document.querySelector('#form-id');
    let options = "";

    var i = 0;
    for (color of data.colors) 
    {
        if(i == 0){
            options += `<option value="${color}">${color} (Couleur par defaut)</option>`;
        }else{
            options += `<option value="${color}">${color}</option>`
        }
    }

    card.insertAdjacentHTML('afterbegin', `
        <div class="  " style="margin:auto;">
            <div class="card border bg-light  p-3 mb-5 bg-body rounded" style="margin:auto;">
                <div class="card-body ">
                    <div class="row">
                        <div class="col-6">
                            <img src="${data.imageUrl}" class="img-fluid img-thumbnail p-1" alt="${data.name}">
                        </div>
                        <div class=" col-6 mt-3 row" id="caracteristique">
                            <span class="card-title">${data.name}</span>
                            <span class="card-title">${data.price / 100 + " €"}</span>
                            <p class="card-text text-truncate">${data.description}</p>
                            <select name="color" id="color-id">${options}</select>
                            <select name="num-product" id="num-product-id">
                                <option value="0">Selectionnz la quatité</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <input type="hidden" name="imageurl" id="imageurlbox" value="${data.imageUrl}" />
                            <input type="hidden" name="name" id="namebox"  value="${data.name}" />
                            <input type="hidden" name="price" id="pricebox"  value="${data.price}" />
                            <input type="hidden" name="_id" id="_idbox"  value="${data._id}" />
                            <button class="btn btn-secondary" id="btn-basket" type="submit" name="ajout">Ajouter au panier</button>
                            <div id="output-id" ></div>
                        </div>   
                    </div>
                </div>
            </div>
        </div>`);
}


//creation de l'element button dans l'element id=carateristique   
document.querySelector('#form-id').addEventListener("submit", function(event) 
{
    event.preventDefault();

    //  les donnés  teddy à envoyer dans localStorage 
    let data = {
        teddyId:    document.querySelector('#_idbox').value,
        teddyImage: document.querySelector('#imageurlbox').value,
        teddyNom:   document.querySelector('#namebox').value,
        quatity:    document.querySelector('#num-product-id').value,
        teddyColor: document.querySelector('#color-id').value,
        teddyPrice: document.querySelector('#pricebox').value / 100,
    };

    // si la quatité est superieur à 0
    if(data.quatity != 0)
    {
        // confirmation de l'ajour au panier
        if(window.confirm("Souhaitez-vous ajouté " + data.teddyNom + " " + ' au panier ?'))
        {
            var HisTeddies        = extraireDuPanier("panier"); // appel de la fonction extration des produits du panier
            HisTeddies[data.teddyId] = data;

            ajoutAuPanier("panier", HisTeddies); // appel de la fonction d'ajour au panier
            document.querySelector('#output-id').innerHTML =   "Le produit " + data.teddyNom + `(quatité ${data.quatity})  a bien été ajouté au panier`;
        }

    }else{
        document.querySelector('#output-id').innerHTML = "Veuillez selectionner la quatité svp.";
    }
    
});
