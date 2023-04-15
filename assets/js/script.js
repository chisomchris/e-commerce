// ==================================
// 1. Toggle humbugger menu;
// By default, the .link tag should 
// display none.
// ==================================

const link = document.querySelector('.link'),
    hamburger = document.querySelector('.hamburger')
link.style.display = onResize() > 768 ? 'flex' : 'none'

// toggle link display
hamburger.addEventListener('click', () => {
    link.style.display = link.style.display === 'block' ? 'none' : 'block'
})

// set display of Links based on Width of the Device screen
window.onresize = () => {
    link.style.display = onResize() > 768 ? 'flex' : 'none'
}



// ==================================
// 2. Display products based on 
// All, Men or Female categories.
// ==================================
const produtTab = document.querySelectorAll('[name=tabset]')
produtTab.forEach(product => {
    product.addEventListener('change', (evt) => {
        evt.stopPropagation()
        displayCategory(evt.target.value)
    })
})

const catalogue = document.querySelectorAll('.catalogue')
const not_available_msg = document.querySelector('.not_available_msg')
const message = not_available_msg.querySelector('p')
not_available_msg.style.display = 'none'


const displayCategory = (category) => {
    if (category.toLowerCase() === 'all') {
        return catalogue.forEach(product => {
            product.style.display = 'block'
        })
    }

    catalogue.forEach(product => {
        product.style.display = 'none'
    })
    catalogue.forEach(product => {
        if (product.querySelector('.tag').textContent.toLowerCase() === category.toLowerCase()) {
            product.style.display = 'block'
        }
    })

    message.textContent = 'Check out other categories or Check back later'
    not_available_msg.style.display = isEmpty(catalogue) ? 'block' : 'none'
}







// ==================================
// 2. Display products based on 
// search keywords in the input fields.
// ==================================
const search = document.querySelector('.search_product')

search.addEventListener('input', (evt) => {
    searchProduct(evt.target.value)
})

const searchProduct = (searchTerm) => {
    if (searchTerm.trim() === '') {
        return catalogue.forEach(product => {
            product.style.display = 'block'
        })
    }

    catalogue.forEach(product => {
        product.style.display = 'none'
    })

    catalogue.forEach(product => {
        if (product.querySelector('p').textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
            product.style.display = 'block'
        }
    })

    message.innerHTML = `Can't find <span style="font-weight: 700">${searchTerm}</span> in the catalogue`
    not_available_msg.style.display = isEmpty(catalogue) ? 'block' : 'none'
}


// ==================================
// utility functions
// ==================================
function onResize() {
    return window.innerWidth
}

function isEmpty(list) {
    return ![...list].some(item => item.style.display === 'block')
}