import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationChain } from "express-validator";

export const validateTaskInput: ValidationChain[] = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be between 1 and 100 characters"),

  body("status")
    .isIn(["todo", "in_progress", "done", "timeout"])
    .withMessage("Status must be one of: todo, in_progress, done, timeout"),

  body("priority")
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be one of: low, medium, high"),

  body("due_date")
    .optional({ nullable: true }) // Allows it to be missing or null
    .isISO8601()
    .toDate()
    .withMessage("Due date must be a valid ISO8601 date"),
];
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};
