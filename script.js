// Initial References
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//  Function to fetch data from API
let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    if(movieName.length <= 0){
        // If input field is empty
        result.innerHTML = `<h3 class="msg">Please Enter Movie Name</h3>`;
    }else{
        result.innerHTML = `<h3 class="msg">Searching...</h3>`;
        
        // If input field is not empty
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                if(data.Response == 'True'){        
                    // if movie exists in database
                    result.innerHTML = `
                        <div class="info">
                            <img src="${data.Poster}" alt="Image not available" class="poster">
                            <div>
                                <h2>${data.Title}</h2>
                                <div class="rating">
                                    <img src="star-icon.svg">
                                    <h4>${data.imdbRating}</h4>
                                </div>
                                <div class="details">
                                    <span>${data.Rated}</span>
                                    <span>${data.Year}</span>
                                    <span>${data.Runtime}</span>
                                </div>
                                <div class="genre">
                                    <div>${data.Genre.split(",").join("</div><div>")}</div>
                                </div>
                            </div>
                        </div>
                        <h3>Plot:</h3>
                        <p>${data.Plot}</p>
                        <h3>Cast:</h3>
                        <p>${data.Actors}</p>
                    `;
                } else{
                    // If movie does not exists in database
                    result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
                }
        })
        // if error occures
        .catch((err) => {
            result.innerHTML = `<h3 class="msg">${err}</h3>`;
        });
    }
}

searchBtn.addEventListener('click', getMovie)
window.addEventListener('load', getMovie);