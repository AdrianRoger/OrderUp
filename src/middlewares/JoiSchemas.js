const Joi = require('joi');
const moment = require('moment');

class JoiSchemas {
  #passwordRegex;
  #cpfRegex;
  #telephoneRegex;
  #uuidRegex;
  constructor() {
    this.#passwordRegex = 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*.?~=-])[a-zA-Z0-9!@#$%&*.?~=-]+$/;
    this.#cpfRegex = /^\d{11}$/;
    this.#telephoneRegex = /^\d{10,11}$/;
    this.#uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  }

  createAdminSchema = () => {
    return Joi.object({
      name: Joi.string().min(3).max(80).required().messages({
        'string.empty': 'O nome não pode deve ser preenchido',
        'string.min': 'O nome deve ter no mínimo {#limit} caracteres',
        'string.max': 'O nome deve ter no máximo {#limit} caracteres',
        'any.required': 'O nome é obrigatório'
      }),
      cpf: Joi.string().pattern(this.#cpfRegex).required().messages({
        'string.pattern.base': 'CPF inválido',
        'any.required': 'O CPF é obrigatório'
      }),
      email: Joi.string().email().max(80).required().messages({
        'string.email': 'Formato de e-mail inválido',
        'any.required': 'O e-mail é obrigatório'
      }),
      telephone: Joi.string().pattern(this.#telephoneRegex).required().messages({
        'string.pattern.base': 'Telefone inválido',
        'any.required': 'O telefone é obrigatório'
      }),
      birthDate: Joi.date().format('iso').max(moment().subtract(18, 'years')).required().messages({
        'date.format': 'Data de nascimento inválida',
        'date.max': 'Você deve ter pelo menos 18 anos',
        'any.required': 'A data de nascimento é obrigatória'
      }),
      password: Joi.string().min(8).max(16).regex(this.#passwordRegex).required().messages({
        'string.min': 'A senha deve ter no mínimo {#limit} caracteres',
        'string.max': 'A senha deve ter no máximo {#limit} caracteres',
        'string.pattern.base': 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
        'any.required': 'A senha é obrigatória'
      }),
      organizationId: Joi.string().pattern(this.#uuidRegex).required().messages({
        'string.pattern.base' : 'O ID da organização não é um UUID válido',
        'any.required': 'O ID da organização é obrigatório'
      })
    });
  }

  updateAdminSchema = () => {
    return Joi.object({
      name: Joi.string().min(3).max(80).required().messages({
        'string.empty': 'O nome não pode deve ser preenchido',
        'string.min': 'O nome deve ter no mínimo {#limit} caracteres',
        'string.max': 'O nome deve ter no máximo {#limit} caracteres',
        'any.required': 'O nome é obrigatório'
      }),
      cpf: Joi.string().pattern(this.#cpfRegex).required().messages({
        'string.pattern.base': 'CPF inválido',
        'any.required': 'O CPF é obrigatório'
      }),
      email: Joi.string().email().max(80).required().messages({
        'string.email': 'Formato de e-mail inválido',
        'any.required': 'O e-mail é obrigatório'
      }),
      telephone: Joi.string().pattern(this.#telephoneRegex).required().messages({
        'string.pattern.base': 'Telefone inválido',
        'any.required': 'O telefone é obrigatório'
      }),
      birthDate: Joi.date().format('iso').max(moment().subtract(18, 'years')).required().messages({
        'date.format': 'Data de nascimento inválida',
        'date.max': 'Você deve ter pelo menos 18 anos',
        'any.required': 'A data de nascimento é obrigatória'
      }),
    });
  }

  updateAdminPasswordSchema = () => {
    return Joi.object({
      oldPassword: Joi.string().required().messages({
        'any.required': 'A senha antiga é obrigatória'
      }),
      newPassword: Joi.string().min(8).max(16).regex(this.#passwordRegex).required().messages({
        'string.min': 'A nova senha deve ter no mínimo {#limit} caracteres',
        'string.max': 'A nova senha deve ter no máximo {#limit} caracteres',
        'string.pattern.base': 'A nova senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
        'any.required': 'A nova senha é obrigatória'
      }),
      confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().messages({
        'any.only': 'A confirmação de senha deve ser igual à nova senha',
        'any.required': 'A confirmação de senha é obrigatória'
      })
    })
  }
  // updateAdminSchema = () => {
  //   return {
  //     name: Joi.string().min(3).max(80).required(),
  //     cpf: Joi.string().pattern(this.#cpfRegex).required(),
  //     email: Joi.string().email().max(80).required(),
  //     telephone: Joi.string().pattern(/^\d{10,11}$/).required(),
  //     birthDate: Joi.date().format('YYYY-MM-DD').max(moment().subtract(18, 'years')).required(),
  //     password: Joi.string().min(8).max(16).regex(this.#passwordRegex).required()
  //   }
  // }
}

const joiSchemas = new JoiSchemas();

module.exports = joiSchemas;
