
import { Router } from 'express';
import { createRecord, deleteRecord, getRecord, getRecords, updateRecord } from '../controller/posterController.js';

const router = Router();
router.get('/', getRecords);
router.get('/:id', getRecord);
router.post('/', createRecord);
router.put('/:id', updateRecord);
router.delete('/:id', deleteRecord);

export const posterRoutes = router;