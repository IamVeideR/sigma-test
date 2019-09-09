let section = document.querySelector('.content__products');
let showAll  = document.querySelector('.content__show');
section.style.minHeight = 'calc(100vh - 270px)';
let menuItem = document.getElementsByClassName('menu__item');
let menuDot = document.getElementsByClassName('menu__dot');
let prices = [];
let names =[];
let graphColor ='';

for (let i = 0; i < menuItem.length; i++) {
    menuItem[i].onclick = () => {
        toggleMenu(i)
    }
    menuDot[i].onclick = () => {
        toggleMenu(i)
    }
}
let toggleMenu = (i) => {
    for (let j = 0; j < menuItem.length; j++) {
        menuItem[j].style.borderBottom = '2px solid transparent';
        menuDot[j].style.backgroundColor = '#121111';
    }
    menuItem[i].style.borderBottom = '2px solid #121111';
    menuDot[i].style.backgroundColor = 'white';
}


let requestURL = 'http://194.32.77.87:3000/api/coins';
let request = new XMLHttpRequest(); 
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    let coins = request.response;
    showProducts(coins);

    let favorite = document.getElementsByClassName('product__favorite');
    let relativePrice = document.getElementsByClassName('product__price-rel');
    for (let i = 0; i < favorite.length; i++) {
        favorite[i].onclick = () => {
            for (let j = 0; j < favorite.length; j++) { 
                favorite[j].classList.remove('favorite-active');
                relativePrice[j].textContent = Math.round(prices[j]/prices[i]*100)/100 + names[i];
            } 
            favorite[i].classList.add('favorite-active');
            relativePrice[i].textContent = '';
        }
    }
}

function showProducts(coin) {
    let products = coin.coinsData;
    function sortByCap(arr) {
        arr.sort((a, b) =>  b.cap - a.cap);
    }
    function jsUcfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    sortByCap(products);
    let createProduct = (i) => {
        let product = document.createElement('div');
        let productFavorite = document.createElement('div');
        let productIcon = document.createElement('div');
        let productName = document.createElement('div');
        let productNameIconBlock = document.createElement('div');
        let productCap = document.createElement('div');
        let productCRR = document.createElement('div');
        let productNameBlock = document.createElement('div');
        let productPrice = document.createElement('div');
        let productPriceRel = document.createElement('div');
        let productPriceBlock = document.createElement('div');
        let productGraph = document.createElement('div');
        let productGraphPercent = document.createElement('div');
        let productGraphBlock = document.createElement('div');
        

        product.classList.value = 'product';
        productFavorite.classList.value = 'product__favorite';
        productIcon.classList.value = 'product__icon';
        productName.classList.value = 'product__name';
        productNameIconBlock.classList.value = 'product__name-icon';
        productCap.classList.value = 'product__cap';
        productCRR.classList.value = 'product__crr';
        productNameBlock.classList.value = 'product__name-block';
        productPrice.classList.value = 'product__price';
        productPriceRel.classList.value = 'product__price-rel';
        productPriceBlock.classList.value = 'product__price-block';
        productGraph.classList.value = 'product__graph';
        productGraphPercent.classList.value = 'product__graph-percent';
        productGraphBlock.classList.value = 'product__graph-block';
        
        productFavorite.innerHTML = '<svg width="8" height="8" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">        <path d="M12.9804 4.55745C12.9278 4.4003 12.7967 4.29432 12.4032 4.2588L8.81284 3.93639C8.59964 3.91723 8.48264 3.83488 8.39799 3.64473L6.97188 0.439163C6.81558 0.0878046 6.67114 0 6.50011 0C6.32923 0 6.18464 0.0878046 6.02821 0.439443L4.60209 3.64501C4.51744 3.83516 4.40044 3.91751 4.1871 3.93667L0.596883 4.25894C0.203556 4.29446 0.0722543 4.40044 0.0195314 4.55759C-0.033336 4.71488 0.00826452 4.87511 0.305391 5.12776L3.01405 7.4311C3.17496 7.56798 3.21959 7.70122 3.17265 7.9034L2.37964 11.3081C2.29283 11.6814 2.35653 11.8349 2.49476 11.9319C2.633 12.0291 2.8033 12.0403 3.14318 11.845L6.24372 10.0631C6.42789 9.95716 6.57234 9.95716 6.75651 10.0631L9.85676 11.845C10.1968 12.0401 10.3671 12.029 10.5053 11.9318C10.6436 11.8346 10.707 11.6812 10.6204 11.3079L9.82743 7.90326C9.78049 7.70108 9.82512 7.56798 9.98604 7.43082L12.6947 5.12762C12.9917 4.87497 13.0334 4.71475 12.9804 4.55745Z"/>        </svg>'
        if(products[i].logoLink != null ) {
        productIcon.style.background = `url(${products[i].logoLink})`;
        } else {
        productIcon.style.background = '#FFA05D';
        }
        productName.textContent = jsUcfirst(products[i].name);
        names[i] = products[i].name;
        productCap.textContent = 'Mkt cap:  $ ' + Math.round(products[i].cap/10**4)/100 + " B";
        productCRR.textContent = 'CRR: ' + products[i].crr + '%';
        productPrice.textContent = Math.round(products[i].price*100)/100 + '$';
        prices[i] = Math.round(products[i].price*100)/100;
        let percentValue = (products[i].prices[products[i].prices.length-1][2] - products[i].firstPrice)/products[i].firstPrice;
        if (percentValue>=0) {
            productGraphPercent.textContent  = '+'+ Math.round((products[i].prices[products[i].prices.length-1][2] - products[i].firstPrice)/products[i].firstPrice*10000)/100 + "%";
            productGraphPercent.style.color = '#7AC231';
            graphColor = '#7AC231';
        } else {
            productGraphPercent.textContent  = + Math.round((products[i].prices[products[i].prices.length-1][2] - products[i].firstPrice)/products[i].firstPrice*10000)/100 + "%";
            productGraphPercent.style.color = '#E74C3C';
            graphColor = '#E74C3C';
        }
        let pricesArray = [];
        for (let j = 0; j < products[i].prices.length; j++) {
            pricesArray[j] = {time: `2000-01-${j+2}`, value: products[i].prices[j][2]};
        }
        pricesArray = [{time: `2000-01-1`, value: products[i].firstPrice}].concat(pricesArray);


        const chart = LightweightCharts.createChart(productGraph, { width: 85, height: 10 });
        const lineSeries = chart.addLineSeries({
            color: graphColor,
            crosshairMarkerVisible: false,
        });
        lineSeries.setData(pricesArray);
        chart.timeScale().fitContent();
        chart.applyOptions({
            priceScale: {
                position: 'none',
            },
            timeScale: {
                visible: false,
            },
            crosshair: {
                vertLine: {
                    visible: false,
                },
                horzLine: {
                    visible: false,
                },
                visible: false,
            },
            grid: {
                vertLines: {
                    visible: false,
                },
                horzLines: {
                    visible: false,
                },
            },
            handleScroll: {
                mouseWheel: false,
                pressedMouseMove: false,
            },
            handleScale: {
                axisPressedMouseMove: false,
                mouseWheel: false,
                pinch: false,
            },
            layout: {
                backgroundColor: 'transparent',
            },
        });
        productNameIconBlock.appendChild(productIcon);
        productNameIconBlock.appendChild(productName);
        productNameBlock.appendChild(productNameIconBlock);
        productNameBlock.appendChild(productCap);
        productNameBlock.appendChild(productCRR);
        productPriceBlock.appendChild(productPrice);
        productPriceBlock.appendChild(productPriceRel);
        productGraphBlock.appendChild(productGraphPercent);
        productGraphBlock.appendChild(productGraph);
        product.appendChild(productFavorite);
        product.appendChild(productNameBlock);
        product.appendChild(productPriceBlock);
        product.appendChild(productGraphBlock);
        section.appendChild(product);
    }
    for (let i = 0; i < 10; i++) {
        createProduct(i)
    }
    showAll.onclick = () => {
        for (let i = 10; i < products.length; i++) {
            createProduct(i)
        } 
    }

}


  