import Employee from '../model/employeeModel.js'
import bcrypt from 'bcrypt';
const saltRounds = 10;
import jwt from 'jsonwebtoken';
const tokenSecret = "highlevelSecret"

export const userAccess = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let employee = await Employee.findOne({ email });
        console.log("employee--->", employee);
        if (!employee) {
            return res.status(400).send({
                statusCode: 1,
                message: "Please Registered Yourself first...",
            })
        }
        let hashPassword = employee.password;
        console.log("hashPassword--->", hashPassword);
        let matchedPassword = await bcrypt.compare(password, hashPassword)
        console.log("matchedPassword--->", matchedPassword);
        if (matchedPassword) {
            console.log("Login Success");
            req.role = employee.role;
            req.userObj = employee;
            next();
        }
        else {
            res.status(400).send({
                statusCode: 1,
                message: "Invalid Password",
            })
        }
    } catch (error) {
        console.log("Error occured in middleware--->", error);
        res.status(500).send({
            statusCode: 1,
            message: "Something Went wrong...Please try again",
            data: error.message
        })
    }

}

export const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log("AuthorizationToken--->",req);
        console.log("AuthorizationToken--->",token);
        let decodedValue = await jwt.verify(token, tokenSecret);
        if (decodedValue.role === 1) {
            next();
        }
        else {
            return res.status(401).send({
                statusCode: 1,
                message: "You are not authorised to access ...for more details  Please contact system Admin"
            })
        }
    } catch (error) {
        console.log("Error occured in asAdmin Middleware--->", error);
        res.status(500).send({
            statusCode: 1,
            message: "Something went wrong...Please try again..."
        })
    }
}