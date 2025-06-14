import joi from 'joi';

export const updateUserSuimailNsSchema = joi.object({
  suimailNs: joi
    .string()
    .min(1)
    .pattern(/^[a-zA-Z0-9][a-zA-Z0-9.]*[a-zA-Z0-9]@suimail$/)
    .custom((value, helpers) => {
      const username = value.split('@')[0];
      if (username.length < 3 || username.length > 20) {
        return helpers.error('string.length');
      }
      if ((value.match(/@/g) || []).length !== 1) {
        return helpers.error('string.pattern.base');
      }
      return value;
    })
    .required()
    .messages({
      'any.required': 'Suimail namespace is required',
      'string.pattern.base':
        'Suimail namespace must be a valid format (3-20 alphanumeric characters followed by @suimail)',
      'string.length': 'Username must be between 3 and 20 characters',
    }),
});

export const updateUserMailFeeSchema = joi.object({
  mailFee: joi.number().required().messages({
    'any.required': 'Mail fee is required',
  }),
});

export const updateUserFilterListSchema = joi.object({
  suimailNs: joi
    .string()
    .pattern(/^[a-zA-Z0-9][a-zA-Z0-9.]*[a-zA-Z0-9]@suimail$/)
    .messages({
      'string.pattern.base': 'Suimail namespace must be a valid format',
    })
    .required()
    .messages({
      'any.required': 'Suimail namespace is required',
    }),
});
