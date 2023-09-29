const validatorSchema = (schema) => [
  (req, res, next) => {
    const data = schema.validate(req.body, { abortEarly: false })
    if (data.error) {
      return res.status(400).json({
        success: false,
        data: data.error.details
      })
    }
    next()
  }
]

export default validatorSchema