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

document.addEventListener("click", function (e) {
    if (e.target.dataset.order) {
        if (totalPrice !== 0) {
            handleOrderButtonClicked()
        }
    }
    else if (e.target.dataset.idNumber) {
        handleAddButtonClicked(e.target.dataset.idNumber)
    }
    else if (e.target.dataset.remove) {
        handleRemoveButtonClicked(e.target.dataset.remove)
    }
})

modalForm.addEventListener("submit", function (e) {
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
    checkoutFeed.innerHTML = ""
    checkoutHeading.style.display = "none"
    checkoutHr.style.display = "none"
    totalPriceContainer.style.display = "none"
    orderButton.style.display = "none"
    modal.style.display = "none"
    customerMessageContainer.style.display = "flex"
}

function removeItems(removeId) {
    const targetObject = menuArray.filter(function (menuItem) {
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

function getFoodFeedHtml() {

    let foodFeedHtml = ""

    menuArray.forEach(function (item) {
        foodFeedHtml += `
            <div class="food-item-container">
                <div>
                <p class="food-emoji">${item.emoji}</p>
                </div>
                <div class="food-details">
                    <p>${item.name}</p>
                    <p class="food-item-description">${item.ingredients.join(", ")}</p>
                    <p>$${item.price}</p>
                </div>
                <div class="add-button-container">
                    <button class="food-add-button" data-id-number="${item.id}">+</button>
                </div>
            </div>
            <hr>
        `
    })

    return foodFeedHtml

}

function renderFoodItems() {
    document.getElementById("food-feed").innerHTML = getFoodFeedHtml()
}

renderFoodItems()

function renderCheckoutFeed() {
    let checkoutHtml = ""

    checkoutArray.forEach(function (item, index) {
        checkoutHtml += `
        
        <div id="checkout-items-container">
            <div id="checkout-item-left-side">
                <span class="checkout-food-name">${item.name}</span>
                <button class="checkout-remove-button" data-remove="${item.id}">Remove</button>
            </div>
            <div id="checkout-item-right-side">
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
            
            <div id="total-price-left-side">
                <span class="checkout-total-price-text">Total Price</span>
            </div>
            <div id="total-price-right-side">
                <span class="checkout-total-price">$${totalPrice}</span>
            </div>
        
        `

    document.getElementById("total-price-container").innerHTML = totalPriceHtml
}

function renderCheckoutDisplay(idNumber) {

    const orderedItems = menuArray.filter(function (item) {
        return item.id === idNumber
    })[0]

    totalPrice += orderedItems.price
    checkoutArray.push(orderedItems)
    renderCheckoutFeed()
    renderTotalPrice()

}

