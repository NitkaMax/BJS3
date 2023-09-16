class Goods {
    constructor (id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }
    setAvailable (available) {
        this.available = available;
    }
}

class GoodsList {
    #goods;

    constructor (goods, filter, sortPrice, sortDir) {
        this.#goods = goods;
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    get list() {
        let result = []
        for (let i=0; i<this.#goods.length; i++) {
            if (this.#goods[i].available === 'Да') {
                // result.length += 1;
                if (filter.test(this.#goods[i]['name']) === true) {
                    result[result.length] = this.#goods[i];
                }
            } 
        }
        if (this.sortPrice === true) {
            if (this.sortDir === true) {
                // console.log('Сортировка по возрастанию');
                result.sort(( a, b ) => {
                    return b.price - a.price;
                });
            } else {
                // console.log('Сортировка по убыванию');
                result.sort(( a, b ) => {
                    return a.price - b.price;
                });
            }
        }
        // result.filter.test(good.name)
        return result
    }

    add (good) {
        for (let i=0; i<this.#goods.length; i++) {
            if (good.name === this.#goods[i].name) {
                return console.log('Такой товар уже есть в каталоге')
            }
        }
        this.#goods[this.#goods.length] = good;
        return console.log('Товар добавлен в каталог')
    }

    remove(id) {
        for (let i=0; i<this.#goods.length; i++) {
            if (this.#goods[i].id === id) {
                var id_to_del = id
                
            }
        this.#goods.splice(this.#goods.id_to_del, 1)
        }
        return console.log('Товар удален из каталога')
    }
}

class BasketGood extends Goods {
    constructor (good, amount) {
        super(good.id, good.name, good.description, good.sizes, good.price, good.available);
        this.amount = amount;
    }
}

class Basket {
    constructor (goods) {
        this.goods = goods
    }

    get totalAmount() {
        var amount = 0;
        this.goods.forEach((value, index) => {
            amount += +value.price * +value.amount;
        })
        return amount
    }

    get totalSum() {

        return this.goods.map(item => item.amount).reduce((prev, curr) => prev + curr, 0)
    }

    add(good, amount) {

        let f = true;
        for (let i=0; i<this.goods.length; i++) {
            if (this.goods[i].id === good.id) {
                f = false;
                this.goods[i].amount += amount;
            } 
        }
        if (f === true) {
            this.goods[this.goods.length] = new BasketGood(good, amount)
        }

    }

    remove(good, amount) {

        for (let i=0; i<this.goods.length; i++) {
            if (this.goods[i].id === good.id) {
                if (this.goods[i].amount <= amount) {
                    this.goods.splice(i, 1)
                } else {
                    this.goods[i].amount -= amount
                }
            }
        }
    }

    clear() {
        this.goods.length=0;
    }

    removeUnavailable() {
        function checkavailable(good) {
            if (good.available === 'Да') {
                return good
            }
        }
        this.goods = this.goods.filter(checkavailable)
    }
}

good1 = new Goods('1',
    "Майка мужская хлопковая белая",
    "хлопок 95 %, лайкра 5 %",
    ["L", "XL", "XXL"],
    1.89,
    true,
);


good2 = new Goods(
    '2',
    "Рубашка",
    "хлопок 100 %",
    ["XL", "XXL"],
    5.60,
    true
);

good3 = new Goods(
    '3',
    "Рубашка приталенная",
    "хлопок 100 %",
    ["M", "L", "XL", "XXL"],
    4.40,
    true
);

good4 = new Goods(
    '4',
    "Пиджак серый",
    "хлопок 100 %",
    ["M", "L", "XL", "XXL"],
    21.55,
    false
);

good5 = new Goods(
    '5',
    "Брюки серые",
    "хлопок 100 %",
    ["M", "L", "XL", "XXL"],
    15.65,
    false
);

good5 = new Goods(
    '6',
    "Брюки",
    "хлопок 90 %",
    ["M", "L"],
    15.65,
    false
);


good1.setAvailable('Нет')
goodslist = new GoodsList([good2, good4, good5], filter=/CBLACK/i, sortPrice=true, sortDir=true)
goodslist.add(good3)
goodslist.add(good3)
goodslist.remove('4')
goodslist.filter=/CBLACK/i;
goodslist.sortPrice=true;
goodslist.sortDir=true;
console.log('goodlist.list =', goodslist.list)
basketgood3 = new BasketGood(good3, 2)
basketgood4 = new BasketGood(good6, 3)
basketgood1 = new BasketGood(good1, 1)
basket = new Basket([basketgood1, basketgood3, basketgood4])
basket.removeUnavailable()
basket.remove(good3, 1)
basket.remove(good3, 1)
basket.clear()
basket.add(good3, 1)
basket.add(good3, 1)

console.log('basket.totalAmount =', basket.totalAmount)
console.log('basket.totalSum =', basket.totalSum)