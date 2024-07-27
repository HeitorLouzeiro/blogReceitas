let allReceitas = [];

const topRecipesCount = 3;

async function fetchAllReceitas() {
    const alphabet = 'abc'.split(''); 
    try {
        for (const letter of alphabet) {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
            if (response.ok) {
                const data = await response.json();
                if (data.meals) {
                    allReceitas.push(...data.meals);
                }
            } else {
                console.error(`Erro na requisição para a letra ${letter}: ${response.status}`);
            }
        }

        displayReceitas(allReceitas);
        displayTopRecipes(allReceitas);

        return allReceitas;
    } catch (error) {
        console.error('Erro:', error);
    }
}

function displayReceitas(receitas) {
    const receitasContainer = document.getElementById('receitas');
    receitasContainer.innerHTML = ''; 
    receitas.forEach(receita => {
        const receitaElement = document.createElement('div');
        receitaElement.className = 'col-md-4 mb-4';
        receitaElement.innerHTML = `
            <div class="card h-100">
                <img src="${receita.strMealThumb}" class="card-img-top" alt="${receita.strMeal}">
                <div class="card-body">
                    <h5 class="card-title">${receita.strMeal}</h5>
                    <p class="card-text">Categoria: ${receita.strCategory}</p>
                    <p class="card-text">Área: ${receita.strArea}</p>
                    <p class="card-text">Instruções: ${receita.strInstructions.substring(0, 100)}...</p>
                    <button class="btn btn-primary" onclick="showDetails('${receita.idMeal}')">Ver Detalhes</button>
                </div>
            </div>
        `;
        receitasContainer.appendChild(receitaElement);
    });
}

function searchReceitas() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const filteredReceitas = allReceitas.filter(receita => {
        return (
            receita.strMeal.toLowerCase().includes(searchValue) ||
            receita.strCategory.toLowerCase().includes(searchValue) || 
            receita.strArea.toLowerCase().includes(searchValue) 
        );
    });
    displayReceitas(filteredReceitas);
    displayTopRecipes(filteredReceitas); 
}


async function displayTopRecipes() {
    const bestRecipesContainer = document.getElementById('best-recipes');
    bestRecipesContainer.innerHTML = ''; // Limpa o container

    for (let i = 0; i < topRecipesCount; i++) {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const data = await response.json();
            const receita = data.meals[0]; // Obtém a primeira (e única) receita aleatória

            const receitaElement = document.createElement('div');
            receitaElement.className = 'col-md-4 mb-4';
            receitaElement.innerHTML = `
                <div class="card h-100">
                    <img src="${receita.strMealThumb}" class="card-img-top" alt="${receita.strMeal}">
                    <div class="card-body">
                        <h5 class="card-title">${receita.strMeal}</h5>
                        <p class="card-text">Categoria: ${receita.strCategory}</p>
                        <p class="card-text">Área: ${receita.strArea}</p>
                        <p class="card-text">Instruções: ${receita.strInstructions.substring(0, 100)}...</p>
                        <button class="btn btn-primary" onclick="showDetails('${receita.idMeal}')">Ver Detalhes</button>
                    </div>
                </div>
            `;
            bestRecipesContainer.appendChild(receitaElement);

        } catch (error) {
            console.error('Erro ao buscar receita aleatória:', error);
            // Lidar com o erro, por exemplo, exibir uma mensagem de erro no container
            bestRecipesContainer.innerHTML = '<p>Erro ao carregar as melhores receitas.</p>';
        }
    }
}

fetchAllReceitas();