const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear search box
    searchField.value = '';
    if (searchText == '') {
        const div = document.createElement('div')
        const p = document.createElement('p');
        p.innerText = "no result found";
        div.appendChild(p);
        searchResult.appendChild(div)
    }

    // load data
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`

    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.meals))
}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    // searchResult.innerHTML = '';
    searchResult.textContent = '';

    // if search result not found 
    if (meals.length == 0) {
        // const div = document.createElement('div')
        // div.classList.add('col');
        // const p = document.createElement('p');
        // p.innerText = "no result found";
        // div.appendChild(p);
        // searchResult.appendChild(div)
        const div = document.createElement('div')
        div.classList.add('col');
        div.innerHTML = `
            <p class="card-text">No result found</p>`;
        searchResult.appendChild(div)
    }
    meals.forEach(meal => {
        // console.log(meal);
        const div = document.createElement('div')
        div.classList.add('col');
        div.innerHTML = `
            <div onclick="loadMealDetails(${meal.idMeal})" class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                </div>
             </div>`;
        searchResult.appendChild(div)
    })
}

const loadMealDetails = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]))
}
const displayMealDetail = meal => {
    console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img width="50%" src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 300)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>`;
    mealDetails.appendChild(div);
}