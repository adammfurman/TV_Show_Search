const resultsContainer = document.querySelector('#resultsContainer');

// Use form input to search API via search term. Display results on search while clearing any previous results.
const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } }
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    clearResults();
    displayResults(res.data);
    console.log(res.data);
    form.elements.query.value = "";
})

const displayImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            document.body.append(img);
        }
    }
}

// function to clear the displayed results
const clearResults = () => {
    resultsContainer.innerHTML = '';
    document.querySelector('.resultsHelper').innerText = '';
}

// function that creates tv show card with image, title, and link
// Not best code here but that's all I know at the moment, I can refactor later when I'm not a noob
const displayResults = (shows) => {
    const resultsHelper = document.createElement('h3');
    resultsHelper.innerText = `Showing results for: ${document.querySelector('#input-el').value}`;
    document.querySelector('.resultsHelper').append(resultsHelper);
    for (let result of shows) {
        if (result.show.image) {
            if (result.show.officialSite) {
                let showCard = document.createElement('div')
                showCard.innerHTML = `
                    <div class="column">
                        <div class="card" id="showCard">
                            <a href="${result.show.officialSite}" target="_blank">
                                <figure class="card-image">
                                    <img class="image" id="showCardImg" src="${result.show.image.medium}" alt="An image of a TV show named ${result.show.name}">
                                </figure>
                            </a>
                            <p class="card-header-title" id="showCardName">${result.show.name}</p>
                        </div>
                    </div>
                `;
                resultsContainer.append(showCard);
            } else {
                let showCard = document.createElement('div')
                showCard.innerHTML = `
                <div class="column">
                <div class="card" id="showCard">
                    <a href="${result.show.url}" target="_blank">
                        <figure class="card-image">
                            <img class="image" id="showCardImg" src="${result.show.image.medium}" alt="An image of a TV show named ${result.show.name}">
                        </figure>
                    </a>
                    <p class="card-header-title" id="showCardName">${result.show.name}</p>
                </div>
            </div>
                `;
                resultsContainer.append(showCard);
            }
        }
    }
}