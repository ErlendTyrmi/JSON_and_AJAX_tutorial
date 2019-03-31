// source: https://www.youtube.com/watch?v=rJesac0_Ftw

var animalContainer = document.getElementById('animal-info');
var btn = document.getElementById('btn');
var pageCounter = 1;

btn.addEventListener('click', function(){

    var request = new XMLHttpRequest();
    //request.open('GET', 'https://learnwebcode.github.io/json-example/animals-1.json');
    request.open('GET', 'animals-' + pageCounter + '.json');

    request.onload = function() {
    if(request.status >= 200 && request.status < 400){
        var data = JSON.parse(request.responseText);
        renderHTML(data);
    } else {
        animalContainer.insertAdjacentHTML('beforeend', 'Server returned error.');
    };

    };

    request.onerror = function(){
        animalContainer.insertAdjacentHTML('beforeend', 'No connection to server.');
    }



    request.send();
   pageCounter++;
   // set to three if you don't like errors
   if (pageCounter > 4){
    btn.classList.add('hide-me');
   }
});


function renderHTML(data){
    var htmlString = "";

    for(i=0;i<data.length;i++){

        var pet = data[i];
        htmlString += "<p>" + pet.name + " is a "  + pet.species + " that likes to eat ";

        var likes = pet.foods.likes;
        for(j=0;j<likes.length;j++){
            htmlString += likes[j];
            if (j != likes.length -1){
            htmlString += " and ";
            }
        }
        htmlString += ", and dislikes "

        var dislikes = pet.foods.dislikes;
        for(j=0;j<dislikes.length;j++){
                    htmlString += dislikes[j];
                    if (j != dislikes.length -1){
                    htmlString += " and ";
                    }
                }
        htmlString += ".</p>"
    }
    animalContainer.insertAdjacentHTML('beforeend', htmlString);
}