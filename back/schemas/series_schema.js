import Joi from "joi"

const schema = Joi.object({
  titulo: Joi.string().required().messages({
    'any.required': 'Titulo obligatorio',
    'string.empty': 'Titulo obligatorio',
    'string.base': 'Titulo obligatorio',
  }),
  descripcion: Joi.string().required().messages({
    'any.required': 'Descripcion obligatoria',
    'string.empty': 'Descripcion obligatoria',
    'string.base': 'Descripcion obligatoria',
  }),
  fechaEstreno: Joi.string().required().messages({
    'any.required': 'Fecha obligatoria',
    'string.empty': 'Fecha obligatoria',
    'string.base': 'Fecha obligatoria',
  }),
  estrellas: Joi.number().required().positive().integer().messages({
    'any.required': 'Calificacion en estrellas obligatoria',
    'number.empty': 'Calificacion en estrellas obligatoria',
    'number.base': 'Calificacion en estrellas obligatoria',
    'number.positive': 'Calificacion en estrellas incorrecta'
  }),
  genero: Joi.string().required().messages({
    'any.required': 'Genero obligatorio',
    'string.empty': 'Genero obligatorio',
    'string.base': 'Genero obligatorio',
  }),
  precioAlquiler: Joi.number().required().positive().messages({
    'any.required': 'Precio obligatorio',
    'number.empty': 'Precio obligatorio',
    'number.base': 'Precio obligatorio',
    'number.positive': 'Precio incorrecto'
  }),
  atp: Joi.boolean().required(),
  estado: Joi.string(),
  codigo: Joi.number()
})

export default schema