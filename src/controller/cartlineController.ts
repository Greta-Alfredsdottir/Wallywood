
import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.cartline.findMany({
      select: {
        userId: true,
        posterId: true,
        quantity: true,
      }
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch cartlines' });
  }
};

export const getRecord = async (req: Request, res:Response) => {
  const id = Number(req.params.id)
  
  if (!id) {
    return res.status(400).json({error: 'Id has no value'})
  } 
  try {
    const data = await prisma.cartline.findUnique({
      where: {
        id
      }
    })
    return res.status(200).json(data)
  } catch (error) {
    console.log(error);{
      res.status(500).json({ error: 'Failed to fetch cartline'})
    };
    
  }
  //console.log(req.params.id); // Den henter det id du har givet i "cartlineRoutes"
    
}
export const createRecord = async (req:Request, res:Response) => {
        //console.log(req.body);   //Den bruger altid "body" for at lave "createRecord"
    const {userId, posterId, quantity} = req.body
    if (!userId || !posterId || !quantity) {
      return res.status(400).json({ error: 'Alle felter skal udfyldes'});

    }
    try {
      const data = await prisma.cartline.create({
        data: {
          userId: Number(userId),
          posterId: Number(posterId),
          quantity: Number(quantity),
        }
      });
      return res.status(201).json(data);
    } catch (error){
    console.log(error);
    return res.status(500).json({error: 'Noget gik galt'})
    }
        //console.log(userId);  //Den henter det du skriver in i ()
}
export const updateRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id) // Sikrer at id er et tal
  const { userId, posterId, quantity} = req.body // Deconstruerer form body objektet

  if(!id) {
    return res.status(400).json({ error: 'Id skal have en gyldig værdi' });
  }

  if(!userId || !posterId || !quantity) {
    return res.status(400).json({ error: 'Alle felter skal udfyldes' });
  }

  try {
    const data = await prisma.cartline.update({
      where: { id },
      data: {
        userId,
        posterId,
        quantity,
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
    await prisma.cartline.delete({
      where: { id },
    });

    res.status(200).json({ message: `cartline nr. ${id} er slettet` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke slette cartline' });
  }
    
}