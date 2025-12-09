
import { Router } from 'express';
import { createRecord, deleteRecord, getRecord, getRecords, updateRecord } from '../controller/userController.js';

const router = Router();
router.get('/', getRecords);
router.get('/:id', getRecord);
router.post('/', createRecord);
router.put('/', updateRecord);
router.delete('/', deleteRecord);

export const userRoutes = router;