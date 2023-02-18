class Api {
    constructor() {
        this.path = "https://dummyjson.com";
    }

    getProducts() {
        return fetch(`${this.path}/products`);
    }
}

export default Api;