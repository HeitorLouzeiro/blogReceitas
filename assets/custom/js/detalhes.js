

async function showDetails(idMeal) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    if (response.ok) {
        const data = await response.json();
        displayDetails(data.meals[0]);
    } else {
        console.error('Erro ao carregar detalhes:', response.status);
    }
}

function displayDetails(receita) {
    const detailsContainer = document.getElementById('details');
    detailsContainer.innerHTML = `
        <div class="col-md-12">
            <div class="card">
                <img src="${receita.strMealThumb}" class="card-img-top" alt="${receita.strMeal}">
                <div class="card-body">
                    <h5 class="card-title">${receita.strMeal}</h5>
                    <p class="card-text">Categoria: ${receita.strCategory}</p>
                    <p class="card-text">Área: ${receita.strArea}</p>
                    <p class="card-text">Instruções: ${receita.strInstructions}</p>
                    <a href="#" onclick="goBack()" class="btn btn-secondary">Voltar</a>
                </div>
            </div>
        </div>
    `;
    document.getElementById('receitas').style.display = 'none';
    document.getElementById('search').style.display = 'none'; 
    document.querySelector('.btn.btn-primary.mt-2').style.display = 'none';
    document.getElementById('top-recipes').style.display = 'none'; 

    detailsContainer.style.display = 'block';
}

function goBack() {
    document.getElementById('details').style.display = 'none';
    document.getElementById('receitas').style.display = 'flex'; 

    // Mostra a barra de pesquisa novamente:
    document.getElementById('search').style.display = 'block'; 

    // Mostra a seção "Top Recipes" novamente:
    document.getElementById('top-recipes').style.display = 'block';
    document.querySelector('.btn.btn-primary.mt-2').style.display = 'block';

    document.getElementById('details').style.display = 'none';
    const receitasContainer = document.getElementById('receitas');
    receitasContainer.style.display = 'flex';
    receitasContainer.style.flexWrap = 'wrap';
}