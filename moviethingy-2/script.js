const baseUrlMovies = "http://www.omdbapi.com/";
//const movieUrl = baseUrl + ""; //Kommenterar ut denna då jag inte tycker den den behövs
const accessKey = "206d082e"; // <--- FYLL I ER API Nykeln




//// Nedan kod är för att spara filmerna i jsonbin men det kan man fixa med senare
// const baseUrlBin = "https://api.jsonbin.io/v3/b/";
// const ourBinUrl = baseUrlBin + "Your bin id";
// const masterKeyBin = "Your bin master-key";
//// Slut på jsonbin grejer som behövs senare när ni ska spara till jsonbin

//Mega objekt med massa funktioner, antagligen för att ha allt sammat i samma objekt, vet ej om det är vettigt, de som kan javascript vet säkert
const App = {
    // listOfMovies är där jag sparar fimerna

    listOfMovies: [], //spara filmer vi laddar in från API
    listOfFavorites: [], //spara favoriter
    elements: {
    },
    // Funktionen som vi använder för att kalla APIet och sedan "Rendera" resultatet via render() funktionen
    fetchMovies(searchInput) {
        //Kalla API med BaseURL + söktexten + API nyckel
        //URLen ser t.ex ut såhär om API nyckel är 666666 och söksträngen är JamesBond
        //http://www.omdbapi.com/?s=JamesBond&apikey=666666
        fetch(baseUrlMovies + "?s=" + searchInput + "&apikey=" + accessKey)
            .then(response => response.json()).then(data => {
                //Skriv resultatet i loggen
                console.log(data);

                //Kolla om det var ett okej resultat från api kallet
                if (data.Response === "True") {
                    //Om det var det, Logga först, sen spara resultatet i array listOfMovies på rad 14
                    console.log("Sparar resultat i listOfMovies array");
                    App.listOfMovies = data.Search;

                    console.log("Rendera sidan");
                    // Kör App.render här istället för jag tyckte det känndes vettigt men vem vet, fråga någon som kan javascript
                    App.render();

                }
            })


            //Om det blev fel skriv det i loggen
            .catch(error => {
                console.error(error);
            });
    },
    createFavorite() { //Funktion att skapa för att spara favoriter i arrayn
    },
    removeFavorite() { //Funktion att skapa för att kunna ta bort från favoriter arrayn
    },
    render() {

        // För varje film i arrayn[] listOfMovies
        App.listOfMovies.forEach(movie => {


            // Skapa en h2 tag i html
            let movieTitle = document.createElement("section");
            
            // Lägg till texten "Film Titel: " + filmens titel/namn 
            
            movieTitle.innerHTML = '<i class="heart uil uil-heart"></i>' +  "<h2>" + movie.Title + "</h2>"+ 
            "<br>" + "Released: " + movie.Year + "<br>" + "Media type: " + movie.Type;
            // Lägg till h2 tagen med filmnamnet i html
            
            document.querySelector(".movie__container").appendChild(movieTitle);

            
            let poster = document.createElement("img");
            poster.src = movie.Poster;
            poster.alt = "Movie Poster";
            document.querySelector(".movie__container").appendChild(poster);
            
            // Samma flöde som ovan, skapa P och lägg till text plus året filmen släpptes

            // let releaseDate = document.createElement("p");
            // releaseDate.innerHTML =  "Released: " + movie.Year + "<br>" + "Media type: " + movie.Type + "<hr>";
            // document.querySelector(".movie__container").appendChild(releaseDate);

            // let mediaType = document.createElement("p");
            // mediaType.innerHTML = "Media type: " + ;
            // document.querySelector(".movie__container").appendChild(mediaType);

            // releaseDate.classList.add("release__date")
            movieTitle.classList.add("movie__title")
            poster.classList.add("poster__main")

            // Samma flöde igen


        });

    }
}
//App.render() //// Kommenterade ut denna, kallar denna i 


//Ny kod för att spara inputen från sökrutan till en variabel
function Search() {
    // Hämta värdet i input(sökrutan) fältet
    const inputValue = document.getElementById("inputField").value;
    // Skriv i loggen om det vi hämtade
    console.log("Kolla här är det du sökte efter: " + inputValue);
    // Kalla funktionen fetchMovies som finns på rad 19 med sök"strängen som vi sökte med"
    App.fetchMovies(inputValue);
}

