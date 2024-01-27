import { menuArray } from "./data.js"

let totalPrice = 0
let checkoutArray = []

const checkoutHeading = document.getElementById("checkout-heading")
const checkoutFeed = document.getElementById("checkout-feed")
const totalPriceContainer = document.getElementById("total-price-container")
const orderButton = document.getElementById("complete-order-button")
const customerMessageContainer = document.getElementById("checkout-message-container")
const modalForm = document.getElementById("modal-form")
const checkoutHr = document.getElementById("checkout-hr")

document.addEventListener("click", e => {
    if (e.target.dataset.order) {
        if (totalPrice !== 0) {
            handleOrderButtonClicked()
        }
    }
    else if (e.target.dataset.idNumber) {
        handleAddButtonClicked(e.target.dataset.idNumber)
    }
    else if (e.target.dataset.remove) {
        console.log(e.target.dataset.remove)
        handleRemoveButtonClicked(e.target.dataset.remove)
    }
})

modalForm.addEventListener("submit", e => {
    e.preventDefault()
    handleModalButtonClicked()
})

function handleAddButtonClicked(idNumber) {
    checkoutFeed.style.display = "flex"
    checkoutHeading.style.display = "block"
    customerMessageContainer.style.display = "none"
    orderButton.style.display = "block"
    checkoutHr.style.display = "block"
    totalPriceContainer.style.display = "flex"
    renderCheckoutDisplay(idNumber)
}

function handleOrderButtonClicked() {
    const modal = document.getElementById("modal")
    modal.style.display = "flex"
}

function handleRemoveButtonClicked(itemId) {
    removeItems(itemId)
}

function handleModalButtonClicked() {
    checkoutFeed.style.display = "none"
    checkoutFeed.textContent = ""
    checkoutHeading.style.display = "none"
    checkoutHr.style.display = "none"
    totalPriceContainer.style.display = "none"
    orderButton.style.display = "none"
    modal.style.display = "none"
    customerMessageContainer.style.display = "flex"
}

function removeItems(removeId) {
    const targetObject = menuArray.filter(menuItem => {
        return menuItem.id === removeId
    })[0]

    const itemIndex = checkoutArray.indexOf(targetObject)

    checkoutArray.splice(itemIndex, 1)

    if (checkoutArray.length === 0) {
        checkoutHr.style.display = "none"
        totalPriceContainer.style.display = "none"
        orderButton.style.display = "none"
    }
    totalPrice -= targetObject.price
    renderCheckoutFeed()
    renderTotalPrice()
}

function getFoodFeed() {

    const foodFeedItems = menuArray.forEach(menuItem => {
        const foodItemContainer = document.createElement("div")
        addClass(foodItemContainer, "food-item-container")
        const emojiSubContainer = document.createElement("div")
        addClass(emojiSubContainer, "food-emoji-container")
        const foodEmoji = document.createElement("p")
        addClass(foodEmoji, "text-6xl")
        const foodDetails = document.createElement("div")
        addClass(foodDetails, "food-details")
        const itemName = document.createElement("p")
        addClass(itemName, "text-3xl")
        const itemIngredients = document.createElement("p")
        addClass(itemIngredients, "text-lg")
        const itemPrice = document.createElement("p")
        addClass(itemPrice, "text-lg")
        const addButtonContainer = document.createElement("div")
        addClass(addButtonContainer, "food-add-button-container")
        const foodAddButton = document.createElement("button")
        addClass(foodAddButton, "food-add-button")
        foodItemContainer.appendChild(emojiSubContainer)
        foodItemContainer.appendChild(foodDetails)
        foodItemContainer.appendChild(addButtonContainer)
        emojiSubContainer.appendChild(foodEmoji)
        foodDetails.appendChild(itemName)
        foodDetails.appendChild(itemIngredients)
        foodDetails.appendChild(itemPrice)
        addButtonContainer.appendChild(foodAddButton)
        setText(foodEmoji, menuItem.emoji)
        setText(itemName, menuItem.name)
        setText(itemIngredients, menuItem.ingredients.join(", "))
        setText(itemPrice, `$${menuItem.price}`)
        setText(foodAddButton, "+")
        foodAddButton.setAttribute("data-id-number", menuItem.id)
        document.getElementById("food-feed").appendChild(foodItemContainer)
    })

}

getFoodFeed()

function renderCheckoutFeed() {

    let checkoutHtml = ""

    checkoutArray.forEach(item => {
        checkoutHtml += `

        <div id="checkout-items-container">
            <div class="checkout-item-left-side" id="checkout-item-left-side">
                <span class="checkout-food-name">${item.name}</span>
                <button class="checkout-remove-button" data-remove="${item.id}">Remove</button>
            </div>
            <div class="checkout-item-right-side" id="checkout-item-right-side">
                <span class="checkout-item-price">$${item.price}</span>
            </div>
        </div>

        `
    })

    document.getElementById("checkout-feed").innerHTML = checkoutHtml

}

function renderTotalPrice() {

    let totalPriceHtml = ""

    totalPriceHtml = `
            
            <div class="total-price-left-side" id="total-price-left-side">
                <span class="checkout-total-price-text">Total Price</span>
            </div>
            <div class="total-price-right-side" id="total-price-right-side">
                <span class="checkout-total-price">$${totalPrice}</span>
            </div>
        
        `

    document.getElementById("total-price-container").innerHTML = totalPriceHtml
}

function renderCheckoutDisplay(idNumber) {

    const orderedItems = menuArray.filter(item => {
        return item.id === idNumber
    })[0]

    totalPrice += orderedItems.price
    checkoutArray.push(orderedItems)
    renderCheckoutFeed()
    renderTotalPrice()

}

function addClass(name, className) {
    name.classList.add(className)
    return name
}

function setText(name, text) {
    name.textContent = text
}

