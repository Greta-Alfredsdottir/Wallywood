
import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.user.findMany();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getRecord = async (req: Request, res:Response) => {
    console.log(req.params.id); // Den henter det id du har givet i "userRoutes"
    
}
export const createRecord = async (req:Request, res:Response) => {
        console.log(req.body);   //Den bruger altid "body" for at lave "createRecord"
    const {firstname} = req.body
        console.log(firstname);  //Den henter det du skriver in i ()
}
export const updateRecord = async (req: Request, res: Response) => {
    console.log();
    
}
export const deleteRecord = async(req:Request, res: Response) =>{
    console.log();
    
}