// отрисовка списка продуктов
function CreateTitlesList(productsList) {
    let productsListContainer = document.querySelector(".productsListContainer");
    let listLength = document.querySelector("#listLength").value;

    productsList.map((el, i) => {
        let title = document.createElement("div");
        title.innerText = el.title;
        title.id = i;
        title.className = "product active";
        title.style.cursor = "grab";
        title.draggable = "true";

        title.addEventListener("mouseover", function (e) {
            e.preventDefault();
            showPopup(el);
            title.style.background = "#42aaff";
        });

        // Скрывание попапа с подробным описанием товара
        title.addEventListener("mouseout", function (e) {
            e.preventDefault();
            closePopup();
            title.style.background = "";
        });


        productsListContainer.append(title);

        if (i > listLength - 1) {
            title.classList.remove("active");
            title.classList.add("inactive");
        }
    })
}

//изменение количества отображаемых продуктов
function ChangeListLength(listLength) {
    productsList = document.querySelectorAll(".product");

    for (let i = 0; i < productsList.length; i++) {
        if (i < listLength) {
            productsList[i].classList.remove("inactive");
            productsList[i].classList.add("active");
        } else {
            productsList[i].classList.remove("active");
            productsList[i].classList.add("inactive");
        }
    }

    let listLengthLabel = document.querySelector(".listLengthLabel")
    listLengthLabel.innerText = "List length: " + listLength;
}

//сортировка по любому флагу
function Sorting(flag, products) {
    products = products.sort((a, b) => { return a[flag] > b[flag] ? 1 : -1 });
    return products
}

//отрисовка попапа с подробным описанием выделенного продукта
function showPopup(data) {
    let popupContainer = document.querySelector(".popupContainer");
    popupContainer.style.border = "1px solid black";

    let popupTextContainer = document.createElement("div");
    popupTextContainer.className = "popupTextContainer";

    for (let key in data) {
        if (key == "images") {
            let image = document.createElement("img");
            image.src = data[key][0];
            image.className = "productImage";
            popupContainer.append(image);
        } else if (key !== "thumbnail" && key !== "id") {
            const el = document.createElement("h4");
            el.className = "product" + key;
            el.innerText = key + ": " + data[key];
            popupTextContainer.append(el);
        }
    }
    popupContainer.append(popupTextContainer);
}

//закрытие попапа
function closePopup() {
    let popupContainer = document.querySelector(".popupContainer");
    popupContainer.innerHTML = "";
    popupContainer.style.border = "";
}
