const db = require("../config/database");
// membuat class Employee
class Employee {
  static async getAllEmployees() {
    try {
      const employees = await db.employees.findMany();
      return employees;
    } catch (error) {
      return error;
    }
  }

  static async getEmployeeById(id) {
    try {
      const employee = await db.employees.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      return employee;
    } catch (error) {
      return error;
    }
  }

  static async getEmployeeByName(name) {
    try {
      const employee = await db.employees.findMany({
        where: {
          name: {
            contains: name,
          },
        },
      });
      return employee;
    } catch (error) {
      return error;
    }
  }

  static async getEmployeeByStatus(status) {
    try {
      const employee = await db.employees.findMany({
        where: {
          status: status,
        },
      });
      return employee;
    } catch (error) {
      return error;
    }
  }

  static async createEmployee(data) {
    try {
      const employee = await db.employees.create({
        data: {
          name: data.name,
          email: data.email,
          status: data.status,
          gender: data.gender,
          address: data.address,
          phone: data.phone,
          hired_on: new Date(data.hired_on),
        },
      });
      return employee;
    } catch (error) {
      return error;
    }
  }

  static async updateEmployee(id, data){
    try {
      const employee = await db.employees.update({
        where: {
          id: parseInt(id)
        },
        data: {
          name: data.name,
          email: data.email,
          status: data.status,
          gender: data.gender,
          address: data.address,
          phone: data.phone,
          hired_on: new Date(data.hired_on),
        },
      })
      return employee
    } catch (error) {
      console.log (error)
      return error
    }
  }

  static async deleteEmployee(id){
    try {
      const checkEmployee = await db.employees.findUnique({
        where: {
          id: parseInt(id)
        }
      })
      if (!checkEmployee) {
        return 
      }
      const employee = await db.employees.delete({
        where: {
          id: parseInt(id)
        }
      })
      return employee
    } catch (error) {
      return error
    }
  }
}

// export class Employee
module.exports = Employee;
