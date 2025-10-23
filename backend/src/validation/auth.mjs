// Make sure the request object body's items follow the rules in
// authentication.
import { body } from "express-validator";

// OWASP Authentication Rules:
// https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html

const minUserLength = 4;
const maxUserLength = 20;
const minPasslength = 15;

export const registerValidationRules = [
  body("username")
    .trim()
    .isLength({ min: minUserLength, max: maxUserLength })
    .withMessage(
      `Username must be ${minUserLength}-${maxUserLength} characters long.`
    )
    .isAlphanumeric()
    .withMessage("Username must only contain letters and numbers."),

  body("password")
    .isLength({ min: minPasslength })
    .withMessage(`Password must be at least ${minPasslength} characters long.`),
];
