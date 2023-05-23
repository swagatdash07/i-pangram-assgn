import Employee from '../model/employeeModel.js'
import bcrypt from 'bcrypt'
import { loginEmployeeService, loginManagerService, registerEmployeeService } from '../service/service.js';
const saltRounds = 10;

export const registerEmployeeController = async (req, res) => {
    try {
        let response = await registerEmployeeService(req, res);
        console.log("Register Response--->", response);
        if (response.statusCode === 0) {
            res.status(201).send({
                statusCode: response.statusCode,
                message: response.message,
                data: response.data
            })
        }
        else {
            res.status(400).send({
                statusCode: response.statusCode,
                message: response.message,
                data: response.data
            })
        }
    } catch (error) {
        console.log("Error occured in registerEmployeeController--->", error);
        res.status(500).send({
            statusCode: 1,
            message: "Something Went wrong...Please try again",
            data: error.message
        })
    }
}
export const loginController = async (req, res) => {
    try {
        if (req.role === 0) {
            // employee access
            let response = await loginEmployeeService(req, res);
            res.status(200).send(response)

        }
        else if (req.role === 1) {
            // admin access
            let response = await loginManagerService(req, res);
            res.status(200).send(response)
        }

    } catch (error) {
        console.log("Error occured in loginEmployeeController--->", error);
        res.status(500).send({
            statusCode: 1,
            message: "Something Went wrong...Please try again",
            data: error.message
        })
    }
}

export const allEmployeeController = async (req, res) => {
    try {
        console.log("All Employye controller api hit");
        let employees = await Employee.find();
        // console.log("employees--->",employees);
        if (employees) {
            res.status(200).send({
                statusCode: 0,
                message:"All employee details fetched",
                data:employees
            })
        }

    } catch (error) {
        console.log("Error occured in allEmployeeController--->", error);
        res.status(500).send({
            statusCode: 1,
            message: "Something Went wrong...Please try again",
            data: error.message
        })
    }
}
export const getEmployeeController = async (req, res) => {
    try {
        console.log("All Employye controller api hit");
        let id = req.params.id;
        let employees = await Employee.findById(id);
        console.log("employees--->",employees);
        if (employees) {
            res.status(200).send({
                statusCode: 0,
                message:"Employee details fetched successfully",
                data:employees
            })
        }

    } catch (error) {
        console.log("Error occured in allEmployeeController--->", error);
        res.status(500).send({
            statusCode: 1,
            message: "Something Went wrong...Please try again",
            data: error.message
        })
    }
}

export const updateEmployeeController = async (req, res) => {
    try {
        console.log("Update Employye controller api hit");
        let id = req.params.id;
        const {firstName,lastName,email,gender,hobbies,role} = req.body;
        let employees = await Employee.findByIdAndUpdate(id,{
            firstName,
            lastName,
            email,
            gender,
            hobbies,
            role
        });
        console.log("employees--->",employees);
        if (employees) {
            res.status(200).send({
                statusCode: 0,
                message:"Employee Updated Successfully",
                // data:employees
            })
        }

    } catch (error) {
        console.log("Error occured in UpdateEmployeeController--->", error);
        res.status(500).send({
            statusCode: 1,
            message: "Something Went wrong...Please try again",
            data: error.message
        })
    }
}
export const deleteEmployeeController = async (req, res) => {
    try {
        console.log("Delete Employye controller api hit");
        const {id} = req.params;
        let employees = await Employee.findByIdAndDelete(id)
        console.log("employees--->",employees);
        if (employees) {
            res.status(200).send({
                statusCode: 0,
                message:"Employee Deleted Successfully",
                // data:employees
            })
        }

    } catch (error) {
        console.log("Error occured in DeleteEmployeeController--->", error);
        res.status(500).send({
            statusCode: 1,
            message: "Something Went wrong...Please try again",
            data: error.message
        })
    }
}
export const getByPageController = async (req, res) => {
    try {
        console.log("Get page by controller api hit");
        const { page } = req.params;
        let limit = 2;

        let startIndex = (page-1)*limit;
        let lastIndex = page*limit;

        let employees = await Employee.find();
        console.log("employees--->",employees);
        console.log("StartIndex--->",startIndex);
        console.log("LastIndex--->",lastIndex);
        if(lastIndex>employees.length){
            lastIndex = employees.length
        }
        let newArr = []
        for(let i=startIndex;i<lastIndex;i++){
            newArr.push(employees[i]);
        }
        if (employees) {
            res.status(200).send({
                statusCode: 0,
                message:"Employee details fetched successfully",
                data:newArr
            })
        }

    } catch (error) {
        console.log("Error occured in allEmployeeController--->", error);
        res.status(500).send({
            statusCode: 1,
            message: "Something Went wrong...Please try again",
            data: error.message
        })
    }
}

export const assignDeptController = async (req, res) => {
    try {
        console.log("Assign Employye controller api hit");
        let id = req.params.id;
        const {dept} = req.body;
        let employees = await Employee.findByIdAndUpdate(id,{
            dept
        });
        console.log("employees--->",employees);
        if (employees) {
            res.status(200).send({
                statusCode: 0,
                message:"Employee Department Updated Successfully",
                // data:employees
            })
        }

    } catch (error) {
        console.log("Error occured in UpdateEmployeeController--->", error);
        res.status(500).send({
            statusCode: 1,
            message: "Something Went wrong...Please try again",
            data: error.message
        })
    }
}