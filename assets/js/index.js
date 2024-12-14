const searchInput = document.getElementById('input-Search');

const btnSearch = document.getElementById('btn-Search');

const recipeContainer = document.getElementById('recipe-container');

const foodCategory = document.getElementById('food-category');
// console.log(foodCategory);


// function get recipe

const fetchRecipes = async(query)=>{
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
     console.log(response);
     recipeContainer.innerHTML = '';
     
     if (response.meals){response.meals.forEach(m => {

        const strMeal = m.strMeal ? m.strMeal : 'Data not found';
        const strMealThumb = m.strMealThumb ? m.strMealThumb : 'placeholder-image-url'; 
        const strTags = m.strTags ? m.strTags : 'No tags available'; 
        const strCategory = m.strCategory ? m.strCategory : 'Data not found';
        const strArea = m.strArea ? m.strArea : 'Data not found';

        // console.log(strMeal, strMealThumb, strTags);
        const recipeDiv = document.createElement('div');
        recipeContainer.className = 'grid lg:grid-cols-3 grid-cols-1 lg:gap-4 lg:p-4';
        recipeDiv.innerHTML = `
                        <div class="flex justify-center mt-20">
                            <div class="card bg-base-100 shadow-xl flex ">
                            <figure class="">
                                <img
                                src="${strMealThumb}"
                                alt=""
                                class="rounded-xl lg:w-full w-40" />
                            </figure>
                            <div class="card-body items-center text-center bg-slate-800 rounded-xl">
                                <h2 class="card-title">${strMeal}</h2>
                                <h3 class="card-title">${strCategory}</h3>
                                <p class="w-40">${strTags}</p>
                                <p class="w-40">${strArea}</p>
                                <div class="card-actions">
                                <button class="btn btn-primary">Detail</button>
                                </div>
                            </div>
                            </div> 
                        </div>
                    `
        recipeContainer.appendChild(recipeDiv);


    })}
    else{
        recipeContainer.innerHTML = '<p>No recipes found.</p>';
    }
}
// button clicked

btnSearch.addEventListener('click',()=>{
    
   const searchBox = searchInput.value.trim().toLowerCase();
// search function call    
   fetchRecipes(searchBox);
//    alert(searchBox);

}) 

// Data load by category wise dropdown list

const fetchFoodCategory = async () => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`);
        
        // console.log(response);
        const data = await response.json();
        // console.log(data);
        
        const dropdown = document.getElementById('food-category');
         dropdown.innerHTML = '' ;

         data.meals.map((cat)=>{
            // console.log(cat);
            const option = document.createElement('option');
            option.value = cat.strCategory;
            option.innerText = cat.strCategory;

            dropdown.appendChild(option);
            
            
         } )


    } catch (error){
        console.log('Error is :', error);

    }
    
};
// function call only food category 
fetchFoodCategory();


// dropdown change event data pass to function
foodCategory.addEventListener('change',(e)=>{
    
    const selectCategory = (e.target.value);
    // console.log(typeof selectCategory);
    searchInput.value = '';
    // input-Search.classList.remove('hidden');
    searchInput.classList.remove('hidden');
    btnSearch.classList.remove('hidden');
    
    fetchFoodcategoryDetail(selectCategory);

})


const displayCategoryFoodDetail = (detail) =>{
    // console.log('food deatail',detail);
    // console.log('food deatail',detail.strCategory);
    recipeContainer.innerHTML = '';

    const recipeDiv = document.createElement('div');
    recipeContainer.className = 'grid lg:grid-cols-3 lg:gap-4 grid-cols-1  lg:p-4';
        recipeDiv.innerHTML = `
                        <div class="flex justify-center">
                            <div class="card bg-base-100 shadow-xl flex mt-10">
                            <figure class="">
                                <img
                                src="${detail.strCategoryThumb}"
                                alt=""
                                class="rounded-xl lg:w-full w-40"/>
                            </figure>
                            <div class="card-body items-center text-center bg-slate-800 rounded-xl">
                                <h2 class="card-title">${detail.strCategory}</h2>
                                <p class="w-60">${detail.strCategoryDescription}</p>
                                <div class="card-actions">
                                <button class="btn btn-primary">Detail</button>
                                </div>
                            </div>
                            </div> 
                        </div>
                    `
            recipeContainer.appendChild(recipeDiv);


   
};


// find category wise detail food data
const fetchFoodcategoryDetail = async (sCat) =>{
    // console.log('fetch food category :', typeof sCat);

    try{
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        const data = await response.json();
        // console.log(data);

        const detailFoodData = data.categories.find((food) => food.strCategory === sCat )
        // console.log(detailFoodData);
        displayCategoryFoodDetail(detailFoodData);


    }catch(error){
        console.log('Getting Error:', error);
    }

}


