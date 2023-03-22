import { validationResult, body } from "express-validator";

export const expressValidation = (req, res, next) => {
    const errors = validationResult(req)

    if (!(errors.isEmpty())) {
        return res.status(400).json({ errors: errors.array() })
    }

    next()
}

export const bodyRegisterValidator = [
    body('email', "Formato email incorrecto").trim().isEmail().normalizeEmail(),
    body('password', "Minimo 6 caracteres")
        .trim()
        .isLength({ min: 6 }),
    expressValidation
]

export const bodyLoginValidator = [
    body('email', "Formato email incorrecto").trim().isEmail().normalizeEmail(),
    body('password', "Minimo 6 caracteres").trim().isLength({ min: 5 }),
    expressValidation
]