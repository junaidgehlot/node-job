const Product = require('../models/product');


const getAllProducts = async (req, res) => {
     const { featured, company, name, sort, field, limit } = req.query;
     const queryObject = {};
     if (featured) {
          queryObject.featured = featured === 'true' ? true : false;
     }
     if (company) {
          queryObject.company = company;
     }

     if (name) {
          queryObject.name = { $regex: name, $options: 'i' };
     }
     
     let result = Product.find(queryObject);

     if (sort) {
          const sortList = sort.split(',').join(' ');
          result = result.sort(sortList); 
          console.log(sortList);

     }else{
          result = result.sort('createdAt');
     }

     if(field){
          const fieldList = field.split(',').join(' ');
          result = result.select(fieldList);
          console.log(fieldList);
     }

     if(limit){
          result = result.limit(limit);
     }

     const products = await result;

     res.status('200').json({ products, ngHits: products.length });
}

const getAllProductsTest = async (req, res) => {
     const products = await products.find({
          name: ''
     });
     res.status('200').json({ products, ngHits: products.length });
}
module.exports = { getAllProducts, getAllProductsTest };