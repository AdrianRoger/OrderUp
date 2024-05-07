const { HttpResponse, BadRequestException, InternalServerException } = require('../utils');
const { ValidationError } = require('joi');

class JoiValidateEntries {
  validate = (schema) => async (req, res, next) => {
    try {
      // console.log(req.body);
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      let exception;
      if(error instanceof ValidationError){
        exception = new BadRequestException(error.details[0].message);
      }else{
        exception = new InternalServerException();
      }

      const response = HttpResponse.fromException(exception);
      return res.status(response.statusCode).json(response);
    }
  }
}

const joiValidate = new JoiValidateEntries();

module.exports = joiValidate;