
import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.user.findMany({
      select: {
        firstname: true,
        lastname: true,
        email: true,
        password: true,
        role: true,
        isActive: true,
      }
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getRecord = async (req: Request, res:Response) => {
  const id = Number(req.params.id)
  
  if (!id) {
    return res.status(400).json({error: 'Id has no value'})
  } 
  try {
    const data = await prisma.user.findUnique({
      where: {
        id
      }
    })
    return res.status(200).json(data)
  } catch (error) {
    console.log(error);{
      res.status(500).json({ error: 'Failed to fetch user'})
    };
    
  }
  //console.log(req.params.id); // Den henter det id du har givet i "userRoutes"
    
}
export const createRecord = async (req:Request, res:Response) => {
        //console.log(req.body);   //Den bruger altid "body" for at lave "createRecord"
    const {firstname, lastname, email, password, role, isActive} = req.body
    if (!firstname || !lastname || !email || !password || !role || !isActive) {
      return res.status(400).json({ error: 'Alle felter skal udfyldes'});

    }
    try {
      const data = await prisma.user.create({
        data: {
          firstname,
          lastname,
          email,
          password,
          role,
          isActive: true,
        }
      });
      return res.status(201).json(data);
    } catch (error){
    console.log(error);
    return res.status(500).json({error: 'Noget gik galt'})
    }
        //console.log(firstname);  //Den henter det du skriver in i ()
}
export const updateRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id) // Sikrer at id er et tal
  const { firstname, lastname, email, password, role, isActive } = req.body // Deconstruerer form body objektet

  if(!id) {
    return res.status(400).json({ error: 'Id skal have en gyldig værdi' });
  }

  if(!firstname || !lastname || !email || !password || !role || !isActive) {
    return res.status(400).json({ error: 'Alle felter skal udfyldes' });
  }

  try {
    const data = await prisma.user.update({
      where: { id },
      data: {
        firstname,
        lastname,
        email,
        password,
        role,
        isActive: true,
      }
    })

    return res.status(201).json(data);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Noget gik galt i serveren' });
  }
};

export const deleteRecord = async(req:Request, res: Response) =>{
    const id = Number(req.params.id)

  try {
    await prisma.user.delete({
      where: { id },
    });

    res.status(200).json({ message: `user nr. ${id} er slettet` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke slette user' });
  }
    
}