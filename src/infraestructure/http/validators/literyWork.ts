import { body, check, ValidationChain } from 'express-validator';

export const literyWorkValidators: ValidationChain[] = [
  check('type').notEmpty().withMessage('El tipo es requerido')
               .isIn(['NOVEL', 'BOOK']).withMessage('El tipo debe ser NOVEL o BOOK'),
  check('title').notEmpty().withMessage('El título es requerido'),
  check('authors').isArray().withMessage('Los autores deben ser un array')
                 .notEmpty().withMessage('Debe haber al menos un autor'),
  check('url').notEmpty().withMessage('La URL es requerida'),
  check('status').notEmpty().withMessage('El status es requerido')
                .isIn(['DELETED', 'AVAILABLE', 'NOT_AVAILABLE']).withMessage('El status debe ser DELETED, AVAILABLE o NOT_AVAILABLE'),
  check('publicationYear').notEmpty().withMessage('El año de publicación es requerido')
                         .isInt().withMessage('El año de publicación debe ser un número entero'),
  check('stock').notEmpty().withMessage('El stock es requerido')
               .isInt({ min: 0 }).withMessage('El stock debe ser un número entero positivo'),
  check('price').notEmpty().withMessage('El precio es requerido')
               .isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
  
  body('genres')
    .custom((value, { req }) => {
      if (req.body.type === 'NOVEL') {
        if (!Array.isArray(value) || value.length === 0) {
          throw new Error('Los géneros son requeridos para una novela y deben ser un array no vacío');
        }
      }
      return true;
    }),
  body('readingAge')
    .custom((value, { req }) => {
      if (req.body.type === 'NOVEL') {
        if (typeof value !== 'number' || value < 0) {
          throw new Error('La edad de lectura es requerida para una novela y debe ser un número entero positivo');
        }
      }
      return true;
    }),
  
  body('knowledgeAreas')
    .custom((value, { req }) => {
      if (req.body.type === 'BOOK') {
        if (!Array.isArray(value) || value.length === 0) {
          throw new Error('Las áreas de conocimiento son requeridas para un libro y deben ser un array no vacío');
        }
      }
      return true;
    }),
  body('pages')
    .custom((value, { req }) => {
      if (req.body.type === 'BOOK') {
        if (typeof value !== 'number' || value < 1) {
          throw new Error('El número de páginas es requerido para un libro y debe ser un número entero positivo');
        }
      }
      return true;
    }),
];

export const IdValidator = [
  check('literyWorkId', 'El id es requerido').not().isEmpty(),
];