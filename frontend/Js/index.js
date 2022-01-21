window.addEventListener("load" ,function(){
    console.log("loaded")
    recupererListe()  
})

// get de l'api
var recupererListe=()=>{
    fetch(url_api)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        /*console.log(data[0].name)*/
        listerTeddies(data);
        /*return data.length*/
    })
    /*.then(function(des){
        console.log(des)
    })*/
    .catch((erreur) => console.log("erreur : " + erreur));


}
//fonction de recuperation de liste
function listerTeddies(data) {
    //parcourir la liste 
    for (teddies of data) {
       
        const card = document.getElementById("liste");
        
        //const price = convertPrice(teddies.price);
        card.innerHTML += `
      <div class="col-sm- col-md-4 col-lg-4 pb-3  ">
          <div class="card border bg-light  p-3 mb-5 bg-body rounded">
              <div class="card-body ">
                  <div class="row">
                      <a href="">
                      <img src="${teddies.imageUrl}" class="img-fluid img-thumbnail p-1" alt="${teddies.name}"></a>

                      <div class="col-6 col-sm-7 mt-3" >
                          <h5 class="card-title">${teddies.name}</h5>
                      </div>
                      <div class="col-6 col-sm-5 text-end mt-3">
                          <h5 class="card-title">${teddies.price/100 +" €"}</h5>
                      </div>
                  </div>
                  <p class="card-text text-truncate">${teddies.description}</p>
                  <a href="./produit.html?_id=${teddies._id}" class="btn btn-secondary">Acheter une nounours</a>
              </div>
          </div>
      </div>`;
    }
}

