const Employee = require("../models/employee");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator"); // Validation library

const createEmployeeController = async (req, res) => {
  // Input validation
  await Promise.all([
    body("name").trim().notEmpty().withMessage("Name is required").run(req),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
    //   .isAlphanumeric()
      .withMessage("Username must be alphanumeric")
      .run(req),
    body("role")
      .notEmpty()
      .withMessage("Role is required")
    //   .isIn(["employee", "manager"])
      .withMessage("Invalid role")
      .run(req),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .run(req),
  ]);

  // Get validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, username, role, password } = req.body;

    // Check if user already exists
    const existingUser = await Employee.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new employee
    const newEmployee = await Employee.create({
      name,
      username,
      role,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      data: newEmployee,
      message: "Employee created successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = createEmployeeController;
