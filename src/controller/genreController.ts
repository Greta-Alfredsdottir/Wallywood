
import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.genre.findMany({
      select: {
        title: true,
        slug: true,
      }
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
};

export const getRecord = async (req: Request, res:Response) => {
  const id = Number(req.params.id)
  
  if (!id) {
    return res.status(400).json({error: 'Id has no value'})
  } 
  try {
    const data = await prisma.genre.findUnique({
      where: {
        id
      }
    })
    return res.status(200).json(data)
  } catch (error) {
    console.log(error);{
      res.status(500).json({ error: 'Failed to fetch genre'})
    };
    
  }
  //console.log(req.params.id); // Den henter det id du har givet i "genreRoutes"
    
}
export const createRecord = async (req:Request, res:Response) => {
        //console.log(req.body);   //Den bruger altid "body" for at lave "createRecord"
    const {title, slug} = req.body
    if (!title || !slug) {
      return res.status(400).json({ error: 'Alle felter skal udfyldes'});

    }
    try {
      const data = await prisma.genre.create({
        data: {
          title,
          slug,
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
  const { title, slug} = req.body // Deconstruerer form body objektet

  if(!id) {
    return res.status(400).json({ error: 'Id skal have en gyldig værdi' });
  }

  if(!title || !slug ) {
    return res.status(400).json({ error: 'Alle felter skal udfyldes' });
  }

  try {
    const data = await prisma.genre.update({
      where: { id },
      data: {
        title,
        slug,
        
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
    await prisma.genre.delete({
      where: { id },
    });

    res.status(200).json({ message: `genre nr. ${id} er slettet` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke slette genre' });
  }
    
}