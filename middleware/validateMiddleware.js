// middleware/validateMiddleware.js
const Joi = require('joi');

const postSchema = Joi.object({
  message: Joi.string().required(),
  // Add more validation rules as needed
});

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string(),
  password: Joi.string().required(),
  // Add more validation rules as needed
});

function validateMiddleware(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      return res.status(400).json({ message: errorMessage });
    }

    next();
  };
}

module.exports = {
  validatePost: validateMiddleware(postSchema),
  validateUser: validateMiddleware(userSchema),
};
