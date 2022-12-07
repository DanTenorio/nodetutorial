import { Router } from 'express';
const router = Router();
import { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployee } from '../../controllers/employeecontroller.js';

router.route('/')
    .get(getAllEmployees)
    .post(createNewEmployee)
    .put(updateEmployee)
    .delete(deleteEmployee);

router.route('/:id')
    .get(getEmployee);

export default router;