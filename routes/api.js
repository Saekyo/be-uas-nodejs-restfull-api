const EmployeeController = require("../controllers/EmployeeController");
const { body, validationResult } = require('express-validator');

// import express
const express = require("express");

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello HRD API Express");
});

// Routing Employees
router.get("/employees", async (req, res) => {
  try {
    const data = await EmployeeController.getAllEmployees();
    if(data.length > 0){
      res.status(200).json({
        message: "Get All Employees",
        data: data,
        status: 200
      })
    } else {
      res.status(200).json({
        message: "Data is empty",
        status: 200
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: 500
    })
  }
})

router.get("/employees/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const data = await EmployeeController.getEmployeeById(id);    
    if(data){
      res.status(200).json({
        message: "Get Detail Resource",
        data: data,
        status: 200
      })
    } else {
      res.status(200).json({
        message: "Resource not found",
        status: 404
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: 500
    })
  }
})

router.get("/employees/search/:name", async (req, res) => {
  try {
    const name = req.params.name
    const data = await EmployeeController.getEmployeeByName(name);    
    if(data.length > 0){
      res.status(200).json({
        message: "Get searched Resource",
        data: data,
        status: 200
      })
    } else {
      res.status(200).json({
        message: "Resource not found",
        status: 404
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: 500
    })
  }
})

router.get("/employees/status/:status", async (req, res) => {
  try {
    const status = req.params.status
    const data = await EmployeeController.getEmployeeByStatus(status);
    if(data.length > 0){
      res.status(200).json({
        message: `Get ${status} Resource`,
        total: data.length,
        data: data,
        status: 200
      })
    } else {
      res.status(200).json({
        message: "Resource not found",
        status: 404
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: 500
    })
  }
})

const validGender = ['P', 'L']
const validStatus = ['active', 'inactive', 'terminated']
router.post("/employees",[
  body('name').notEmpty().withMessage('Name is required'),
  body('gender').notEmpty().isIn(validGender).withMessage('Gender is required, and must be P or L'),
  body('email').isEmail().notEmpty().withMessage('Email is required'),
  body('status').notEmpty().isIn(validStatus).withMessage('Status is required, and must be active, inactive, or terminated'),
  body('address').notEmpty().withMessage('Address is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('hired_on').notEmpty().withMessage('Hired on is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ 
        message: 'All fields must be filled correctly',
        errors: errors.array(),
        status: 422 
      })
    }

    const data = await EmployeeController.createEmployee(req.body);
      res.status(201).json({
        message: "Resource is added successfully",
        data: data,
        status: 201
      })
    
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: 500
    })
  }
})

router.put("/employees/:id",[
  body('name').notEmpty().withMessage('Name is required'),
  body('gender').notEmpty().isIn(validGender).withMessage('Gender is required, and must be P or L'),
  body('email').isEmail().notEmpty().withMessage('Email is required'),
  body('status').notEmpty().isIn(validStatus).withMessage('Status is required, and must be active, inactive, or terminated'),
  body('address').notEmpty().withMessage('Address is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('hired_on').notEmpty().withMessage('Hired on is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ 
        message: 'All fields must be filled correctly',
        errors: errors.array(),
        status: 422 
      })
    }

    const id = parseInt(req.params.id)
    const data = await EmployeeController.updateEmployee(id, req.body);
    console.log(data)
    if(data){
      res.status(200).json({
        message: "Resource is updated successfully",
        data: data,
        status: 200
      })
    } else {
      res.status(200).json({
        message: "Resource not found",
        status: 404
      })
    }
  } catch {
    res.status(500).json({
      message: error.message,
      status: 500
    })
  }
})

router.delete("/employees/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const data = await EmployeeController.deleteEmployee(id);
    if(data){
      res.status(200).json({
        message: "Resource is deleted successfully",
        status: 200
      })
    } else {
      res.status(200).json({
        message: "Resource not found",
        status: 404
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: 500
    })
  }
})

// export router
module.exports = router;
