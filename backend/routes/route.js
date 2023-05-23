import express from 'express';
import { allEmployeeController, assignDeptController, deleteEmployeeController, getByPageController, getEmployeeController, loginController, registerEmployeeController, updateEmployeeController } from '../controller/controller.js';
import { isAdmin, userAccess } from '../middleware/middleware.js';
const router = express.Router();

// register employee
router.post('/register-employee',registerEmployeeController);
// login employee
router.post('/login-employee',userAccess,loginController);
// all employee data
router.get('/all-employee',isAdmin,allEmployeeController);
// fetch single employee
router.get('/get-employee/:id',isAdmin,getEmployeeController);
// update employee
router.put('/update-employee/:id',isAdmin,updateEmployeeController);
// delete employee
router.delete('/delete-employee/:id',isAdmin,deleteEmployeeController)

// get by page no. and size
router.get('/get-by-page/:page',isAdmin,getByPageController)

// assign department
router.put('/assign-dept/:id',isAdmin,assignDeptController)



export default router;
