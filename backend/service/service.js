import Employee from '../model/employeeModel.js'
import bcrypt from 'bcrypt'
const saltRounds = 10;
import jwt from 'jsonwebtoken';
const tokenSecret = "highlevelSecret"

export const registerEmployeeService = async (req, res) => {
    try {
        console.log("registerEmployeeService APi HIT");
        const { firstName, lastName, email, password, gender, hobbies } = req.body;
        let hashPassword = await bcrypt.hash(password, saltRounds);
        console.log("hashPassword--->", hashPassword);
        let newEmployee = new Employee({
            firstName,
            lastName,
            email,
            password: hashPassword,
            gender,
            hobbies
        })
        let result = await newEmployee.save();
        return ({
            statusCode: 0,
            message: "Employee Created Successfully",
            data: newEmployee
        })

    } catch (error) {
        console.log("Error occured in registerEmployeeService--->", error);
        return ({
            statusCode: 1,
            message: "Something Went wrong...Please try again",
            data: error.message
        })
    }
}

export const loginEmployeeService = async (req, res) => {
    try {
        console.log("Login EmployeeService APi HIT");

        let userDetails = {
            _id: req.userObj._id,
            firstName: req.userObj.firstName,
            lastName: req.userObj.lastName,
            email: req.userObj.email,
            role: req.userObj.role,
            dept: req.userObj.dept
        };
        let token = await jwt.sign(userDetails, tokenSecret);
        return ({
            statusCode: 0,
            message: "You are login as Employee",
            data: { ...userDetails, token },
        })
    } catch (error) {
        console.log("Error occured in loginEmployeeService--->", error);
        res.status(500).send({
            statusCode: 1,
            message: "Something Went wrong...Please try again",
            data: error.message
        })
    }
}

export const loginManagerService = async (req, res) => {
    try {
        console.log("Manager Service hit");
        let userDetails = {
            _id: req.userObj._id,
            firstName: req.userObj.firstName,
            lastName: req.userObj.lastName,
            email: req.userObj.email,
            role: req.userObj.role,
        };
        let token = await jwt.sign(userDetails, tokenSecret);
        return ({
            statusCode: 0,
            message: "You are login as Manager",
            data: { ...userDetails, token },
        })
    } catch (error) {
        console.log("Error occured in loginManagerService--->", error);
        res.status(500).send({
            statusCode: 1,
            message: "Something Went wrong...Please try again",
            data: error.message
        })
    }
}