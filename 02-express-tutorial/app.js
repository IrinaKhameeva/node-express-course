const express = require('express');
const app = express();
const {products} = require('./data');

//setup static and middleware
//app.use(express.static('./public'));


app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><a href="/api/v1/products">products</a>');
})

app.get('/api/v1/products', (req, res) => {
    const newProducts = products.map((product) => {
        const {id, name, image} = product;
        return {id, name, image};
    });
    res.json(newProducts);
})

app.get('/api/v1/products/:productID', (req, res) => {
    //console.log(req);
    //console.log(req.params);
    const {productID} = req.params;
    const singleProduct = products.find(
        (product) => product.id === Number(productID)
    );
    if (!singleProduct) {
        return res.status(404).send('<h1>Product does not exist</h1>');
    }   
    console.log(singleProduct);
    res.json(singleProduct);
});

app.get('/api/v1/products/:productID/reviews/:reviewID', (req, res) => {
    console.log(req.params);
    res.send('Hello World');
});

app.get('/api/v1/query', (req, res) => {
    //console.log(req.query);
    const {search, limit} = req.query; 
    let sortedProducts = [...products];

    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search);
        });
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }
    if (sortedProducts.length < 1) {
        //return res.status(200).send('No products matched your search');
        return res.status(200).json({success: true, data: []});
    }   
    res.status(200).json(sortedProducts);
    res.send('Hello World');
});    
   
app.all('*', (req, res) => {
    res.status(404).send('<h1>Resource not found</h1>');
})        

app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
})
//app.get
//app.post
//app.put
//app.delete
//app.all
//app.use
//app.listen