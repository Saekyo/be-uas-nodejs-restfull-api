const Employee = require("../models/Employee");

// buat class EmployeeController
class EmployeeController {
  // method untuk get all employees
  async getAllEmployees(req, res) {
    try {
      const employees = await Employee.getAllEmployees();
      return employees
    } catch (error) {
      return error
    }
  }

  async getEmployeeById(id) {
    try {
      const employee = await Employee.getEmployeeById(id);
      return employee
    } catch (error) {
      return error
    }
  }

  async getEmployeeByName(name) {
    try {
      const employee = await Employee.getEmployeeByName(name);
      return employee
    } catch (error) {
      return error
    }
  }

  async getEmployeeByStatus(status){
    try {
      const employee = await Employee.getEmployeeByStatus(status);
      return employee
    } catch (error) {
      return error
    }
  }

  async createEmployee(data){
    try {
      const employee = await Employee.createEmployee(data);
      return employee
    } catch (error) {
      return error
    }
  }

  async updateEmployee(id, data){
    try {
      const employee = await Employee.updateEmployee(id, data);
      return employee
    } catch (error) {
      return error
    }
  }
  
  async deleteEmployee(id){
    try {
      const employee = await Employee.deleteEmployee(id);
      return employee
    } catch (error) {
      return error
    }
  }
}

// membuat object EmployeeController
const object = new EmployeeController();

// export object EmployeeController
module.exports = object;
