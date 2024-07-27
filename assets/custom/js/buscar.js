function searchReceitas() {
    const buscarReceita = document.getElementById('search').value.toLowerCase();
    /* console.log('Valor da busca:', buscarReceita); */

    const filteredReceitas = allReceitas.filter(receita => {
        return receita.strMeal.toLowerCase().includes(buscarReceita) ||
            receita.strInstructions.toLowerCase().includes(buscarReceita);
    });

    console.log('Receitas filtradas:', filteredReceitas);
    displayReceitas(filteredReceitas);
}
