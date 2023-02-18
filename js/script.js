import Api from "./api.js";

const api = new Api();

//получение списка продуктов из localStorage
let productsList = localStorage.getItem("products");

//отрисовка списка продуктов
if (productsList) {
    productsList = JSON.parse(productsList);
    CreateTitlesList(productsList);
} else {
    api.getProducts()
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("products", JSON.stringify(data.products));
            CreateTitlesList(data.products);
        });
}

//слушатель на ползунок количества отображаемых товаров
const listLengthInput = document.querySelector("#listLength");
listLengthInput.addEventListener("change", () => {
    let listLength = listLengthInput.value;
    console.log(listLength);
    ChangeListLength(listLength);
})

//слушатели на кнопки сортировок
const radioButtonCategory = document.querySelector(".sortByCategory");
const radioButtonPrice = document.querySelector(".sortByPrice");
const productsListContainer = document.querySelector(".productsListContainer");

radioButtonCategory.addEventListener("click", () => {
    productsList = Sorting("category", productsList);
    productsListContainer.innerHTML = "";
    CreateTitlesList(productsList);
})

radioButtonPrice.addEventListener("click", () => {
    productsList = Sorting("price", productsList);
    productsListContainer.innerHTML = "";
    CreateTitlesList(productsList);
})


// реализация drag`n`drop
productsListContainer.addEventListener("dragstart", (e) => {
    e.target.classList.add("selected");
})

productsListContainer.addEventListener("dragend", (e) => {
    e.target.classList.remove("selected");
})

const getNextElement = (cursorPosition, currentElement) => {
    const currentElementCoord = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

    const nextElement = (cursorPosition < currentElementCenter) ?
        currentElement :
        currentElement.nextElementSibling;

    return nextElement;
};

productsListContainer.addEventListener(`dragover`, (e) => {
    e.preventDefault();

    const activeElement = productsListContainer.querySelector(`.selected`);
    const currentElement = e.target;
    const isMoveable = activeElement !== currentElement && currentElement.classList.contains("product");

    if (!isMoveable) {
        return;
    }

    const nextElement = getNextElement(e.clientY, currentElement);

    if (
        nextElement && activeElement === nextElement.previousElementSibling || activeElement === nextElement
    ) {
        return;
    }

    productsListContainer.insertBefore(activeElement, nextElement);
});