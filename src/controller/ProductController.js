const { productService } = require('../services');
const { BadRequestException, HttpResponse, ValidateUuidV4 } = require('../utils');

class ProductController {
  async getProducts(req, res){
    try{
      const products = await productService.getProducts();

      const response = new HttpResponse({
        statusCode: 200,
        data: products
      });

      res.status(response.statusCode).json(response);
    }catch(exception){
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async getProductsByOrganizationId(req, res){
    try{
      const organizationId = String((req.params.organizationId).trim());
      if(!ValidateUuidV4.isValidUuidV4(organizationId)){
        throw new BadRequestException('The id parameter not a valid uuid.');
      }

      const products = await productService.getProductsByOrganizationId({ organizationId });

      const response = new HttpResponse({
        statusCode: 302,
        data: products
      });

      res.status(response.statusCode).json(response);
    }catch(exception){
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async getProductById(req, res){
    try{
      const id = String((req.params.id).trim());
      if(!ValidateUuidV4.isValidUuidV4(id)){
        throw new BadRequestException('The id parameter not a valid uuid.');
      }

      const product = await productService.getProductById({ id });

      const response = new HttpResponse({
        statusCode: 302,
        data: product
      });

      res.status(response.statusCode).json(response);
    }catch(exception){
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async createProduct(req, res){
    try{
      const name = req.body.name;
      const price = req.body.price;
      const description = req.body.description;
      const imgName = req.file.filename;
      const categoryId = req.body.categoryId;
      const organizationId = req.body.organizationId;      

      if(!name || !price || !description || !imgName || !organizationId || !categoryId){
        throw new BadRequestException('invalid attibutes.');
      }

      if(!ValidateUuidV4.isValidUuidV4(organizationId)){
        throw new BadRequestException('The organizationId is not a valid uuid.');
      }

      if(!ValidateUuidV4.isValidUuidV4(categoryId)){
        throw new BadRequestException('The categoryId is not a valid uuid.');
      }

      const createdProduct = await productService.createProduct({
        name, price, description, imgName, categoryId, organizationId
      });

      const response = new HttpResponse({
        statusCode: 201,
        data : createdProduct
      });

      res.status(response.statusCode).json(response);
    }catch(exception){
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async updateProduct(req, res){
    try{
      const id = String((req.params.id).trim());
      const name = req.body.name;
      const price = req.body.price;
      const description = req.body.description;
      const imgName = req.file.filename;
      const categoryId = req.body.categoryId;
      const organizationId = req.body.organizationId;

      if(!ValidateUuidV4.isValidUuidV4(id)){
        throw new BadRequestException('The id parameter not a valid uuid.');
      }

      if(!name || !price || !description || !imgName || !organizationId || !categoryId){
        throw new BadRequestException('invalid attibutes.');
      }

      const updatedProduct = await productService.updateProduct({
        id, name, price, description, imgName, categoryId, organizationId
      });

      const response = new HttpResponse({
        statusCode: 200,
        data: updatedProduct
      });

      res.status(response.statusCode).json(response);
    }catch(exception){
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }

  async deleteProduct(req, res){
    try{
      const id = String((req.params.id).trim());

      if(!ValidateUuidV4.isValidUuidV4(id)){
        throw new BadRequestException('The id parameter not a valid uuid.');
      }

      const deletedProduct = await productService.deleteProduct({ id });

      const response = new HttpResponse({
        statusCode: 200,
        data: deletedProduct
      });

      res.status(response.statusCode).json(response);
    }catch(exception){
      const response = HttpResponse.fromException(exception);
      res.status(response.statusCode).json(response);
    }
  }
}

const productController = new ProductController();
module.exports = productController;


// constructor({ id, name, price, description, imgName, categoryId, organizationId }) {
//   this.id = id;
//   this.name = name;
//   this.price = price;
//   this.description = description;
//   this.imgName = imgName;
//   this.organizationId = organizationId;
//   this.categoryId = categoryId;
// }