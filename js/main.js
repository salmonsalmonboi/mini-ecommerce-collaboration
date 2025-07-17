document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('searchInput');
    const loaderwrapper = document.getElementById('loader-wrapper');
    let allProducts = [];

    loaderwrapper.style.display = 'block'; // แสดง Loader ก่อนโหลด

    // Fetch products from JSON
    fetch('js/products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
    
    // หน่วงเวลา 3 วินาที แล้วค่อยแสดงสินค้ากับซ่อน loader
      setTimeout(() => {
        displayProducts(allProducts);
        loaderwrapper.style.display = 'none';
      }, 500);
    });


    function displayProducts(products) {
        productList.innerHTML = ''; // Clear previous list
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>ราคา: ${Number(product.price).toLocaleString()} บาท</p> 

            `; // เพิ่ม comma เช่น 12600 → 12,600 เพื่อให้ราคาอ่านง่ายขึ้น
            productList.appendChild(card);
        });
    }

    // Inefficient Search
    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (searchTerm === '') {
            displayProducts(allProducts);
        } else {
            const filteredProducts = allProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm)
            );
            displayProducts(filteredProducts);
        }
    });
});