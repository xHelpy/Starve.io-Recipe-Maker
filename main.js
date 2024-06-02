

const Items = document.querySelectorAll('button')
var buttonArray = [...Items]
const Resources = document.getElementById("Resources")
const Recipes = document.getElementById("Recipes")
const RecipesHolder = document.getElementById("RecipesHolder")

var totalRecipes = 0
var Selected

function getItemClicked(object)
{
    if(object.target.parentNode.tagName == 'BUTTON' && object.target.parentNode.parentNode.id == "Items") {
        console.log(object.target.parentNode.id,object.target.parentNode.tagName,object.target.parentNode.parentNode.id)
        createRecipe(object.target.parentNode.id)
    }
    if(object.target.parentNode.tagName == 'BUTTON' && object.target.parentNode.parentNode.id == "Resources" && Selected != null)
    {
        console.log("Adding Item to the Recipe: ",object.target.parentNode.id)
        addItemToRecipe(object.target.parentNode.id)
    }
   
   
}


function removeRecipe(object)
{
    var ObjectInstance = document.getElementById(object.target.parentNode.parentNode.id)
    if(Selected == ObjectInstance)
    {
        Selected = null;
    }
    ObjectInstance.remove()

}

function removeRecipeItem(object)
{
    var ObjectInstance = document.getElementById(object.target.parentNode.id)
    console.log(ObjectInstance)
    ObjectInstance.remove()
}

function addItemToRecipe(object)
{
    console.log(object)
    var div = document.createElement("div");
    div.className = "recipeItem"
    div.id = "recipeItem_"+object+"-"+totalRecipes

    var RecipeImage = document.createElement("img")
    RecipeImage.className = "RecipeItemImage"
    RecipeImage.id = object
    RecipeImage.src = "img/"+object+".png"

    var RemoveItemButton = document.createElement("button")
    RemoveItemButton.className = "RemoveItemRecipe"
    RemoveItemButton.innerHTML = "X"


    var ItemAmount = document.createElement("input")
    ItemAmount.className = "ItemAmount"
    ItemAmount.id = "ItemAmount"
    ItemAmount.type = "number"
    ItemAmount.value = 0
    var ItemName = document.createElement("p")
    ItemName.className = "ItemRecipeName"
    ItemName.id = "itemRecipeName"
    ItemName.innerHTML = object


    Selected.appendChild(div)
    div.appendChild(RecipeImage)
    div.appendChild(RemoveItemButton)
    div.appendChild(ItemAmount)
    div.appendChild(ItemName)
    

    RemoveItemButton.onclick = function(event) {removeRecipeItem(event)};
    
}


function generateRecipes(event)
{
    console.log(event)
    var RecipesTable = []
    
   


    var Recipes = RecipesHolder.getElementsByClassName("recipe");
    for (i = 0; i < Recipes.length; ++i) {
        console.log(Recipes[i])
        let RecipeName = Recipes[i].querySelector("#ItemName").innerHTML
        let RecipeTime = Recipes[i].querySelector("#craftTime").value
        let RecipeBonus = Recipes[i].querySelector("#Bonus").value
        let needWater = Recipes[i].querySelector("#Water")
        let needWorkbench = Recipes[i].querySelector("#Workbench")
        let needFire = Recipes[i].querySelector("#Fire")
        let needWell = Recipes[i].querySelector("#Well")
        var Water = 0
        var Workbench = 0
        var Fire = 0
        var Well = 0
        if(needWater.checked) Water = 1
        if(needWorkbench.checked) Workbench = 1
        if(needFire.checked) Fire = 1
        if(needWell.checked) Well = 1
        console.log(RecipeName,RecipeTime,Water,Workbench,Fire,Well,RecipeBonus)
        var RecipesData = []
        var RecipeItems = Recipes[i].getElementsByClassName("recipeItem")

        for(j = 0; j < RecipeItems.length; ++j)
        {
            console.log(RecipeItems[j])
            let RecipeItemName = RecipeItems[j].querySelector("#itemRecipeName")
            let RecipeAmount = RecipeItems[j].querySelector("#ItemAmount").value
            RecipesData.push([RecipeItemName.innerHTML,Number(RecipeAmount)])
        }
        


        var Object = document.createElement("object");
        Object.item = RecipeName
        Object.recipe = RecipesData
        Object.water = Water
        Object.workbench = Workbench
        Object.fire = Fire
        Object.well = Well
        Object.time = Number(RecipeTime)
        Object.bonus = Number(RecipeBonus)
        RecipesTable.push(Object)
    }
    var string = JSON.stringify(RecipesTable)
    prompt("Your Recipe: ",string)

}
function selectRecipe(object)
{
    var ObjectInstance = document.getElementById(object.target.parentNode.parentNode.id)
    console.log(ObjectInstance)
    if(Selected == null){
        console.log("No recipe selected changing,")
        Selected = ObjectInstance
        Selected.style.borderColor = "#d16721"
    } else
    {
        Selected.style.borderColor = "#312116"
        Selected = ObjectInstance
        Selected.style.borderColor = "#d16721"
    }
    
    console.log(Selected.id)
}


for( const child of Items)
{
    child.onclick = function(event) {getItemClicked(event)};
}

for(const child of Resources.children)
{
    child.onclick = function(event) {getItemClicked(event)};
}   



function createRecipe(Item)
{
    totalRecipes++
    console.log(RecipesHolder)
    var div = document.createElement("div");
    div.className = "recipe"
    div.id = "recipe_"+Item+totalRecipes
    var recipeMain = document.createElement("div");
    recipeMain.className = "recipeMain"
    var ItemName = document.createElement("p");
    ItemName.className = "ItemName"
    ItemName.innerHTML = Item
    ItemName.id = "ItemName"
    var RecipeImage = document.createElement("img")
    RecipeImage.className = "RecipeImage"
    RecipeImage.src = "img/"+Item+".png"
    var RemoveButton = document.createElement("button")
    RemoveButton.className = "RemoveRecipe"
    RemoveButton.innerHTML = "X"

    var SelectRecipeButton = document.createElement("button")
    SelectRecipeButton.className = "SelectRecipeButton"
    SelectRecipeButton.innerHTML = "S"
    var CheckboxNames = document.createElement("p")
    CheckboxNames.innerHTML = "Fire: <br>Water: <br> Workbench: <br> Well: <br>"
    CheckboxNames.className = "checkboxNames"
    var Water = document.createElement("input")
    Water.type = "checkbox";
    Water.className = "recipeInput"
    Water.id = "Water"
    var Workbench = document.createElement("input")
    Workbench.type = "checkbox";
    Workbench.className = "recipeInput"
    Workbench.id = "Workbench"
    var Fire = document.createElement("input")
    Fire.type = "checkbox";
    Fire.className = "recipeInput"
    Fire.id = "Fire"
    var Well = document.createElement("input")
    Well.type = "checkbox";
    Well.className = "recipeInput"
    Well.id = "Well"

    var CraftTimeText = document.createElement("p")
    CraftTimeText.innerHTML = "Craft Time:"
    CraftTimeText.className = "craftTimeText"
    var CraftTime = document.createElement("input")
    CraftTime.type = "number"
    CraftTime.className = "craftTime"
    CraftTime.id = "craftTime"
    CraftTime.value = 0
    var BonusText = document.createElement("p")
    BonusText.innerHTML = "Bonus:"
    BonusText.className = "BonusText"
    var Bonus = document.createElement("input")
    Bonus.type = "number"
    Bonus.className = "Bonus"
    Bonus.id = "Bonus"
    Bonus.value = 0

    if(totalRecipes == 1)
        {
            var generateRecipesButton = document.createElement("button")
            generateRecipesButton.className = "GenerateRecipes"
            generateRecipesButton.id = "GenerateRecipes"
            generateRecipesButton.innerHTML = "Generate Recipes"
            Recipes.appendChild(generateRecipesButton)


            generateRecipesButton.onclick = function(event) {generateRecipes(event)}
        }



    RecipesHolder.appendChild(div)
    div.appendChild(recipeMain)
    recipeMain.appendChild(RecipeImage)
    recipeMain.appendChild(ItemName)
    recipeMain.appendChild(RemoveButton)
    recipeMain.appendChild(SelectRecipeButton)
    recipeMain.appendChild(CheckboxNames)
    recipeMain.appendChild(Fire)
    recipeMain.appendChild(Water)
    recipeMain.appendChild(Workbench)
    recipeMain.appendChild(Well)
    recipeMain.appendChild(CraftTimeText)
    recipeMain.appendChild(CraftTime)
    recipeMain.appendChild(BonusText)
    recipeMain.appendChild(Bonus)
    


    RemoveButton.onclick = function(event) {removeRecipe(event)}
    SelectRecipeButton.onclick = function(event) {selectRecipe(event)}
 

 

}