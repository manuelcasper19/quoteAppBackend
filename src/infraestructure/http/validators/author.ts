
import { check, ValidationChain } from 'express-validator';

export const authorValidators: ValidationChain[] = [
  check('authorId').optional().isString().withMessage('El ID del autor debe ser una cadena de texto'),
  check('name').notEmpty().withMessage('El nombre es requerido')
              .isString().withMessage('El nombre debe ser una cadena de texto'),
  check('email').notEmpty().withMessage('El email es requerido')
               .isEmail().withMessage('El email debe ser válido'),
  check('active').notEmpty().withMessage('El estado activo es requerido')
                .isBoolean().withMessage('El estado activo debe ser un valor booleano'),
];

