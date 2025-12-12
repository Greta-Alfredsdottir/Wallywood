
import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.poster.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        image: true,
        width: true,
        height: true,
        price: true,
        stock: true,
      }
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch posters' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  if (!id) {
    return res.status(400).json({ error: 'Id has no value' })
  }
  try {
    const data = await prisma.poster.findUnique({
      where: {
        id
      }
    })
    return res.status(200).json(data)
  } catch (error) {
    console.log(error); {
      res.status(500).json({ error: 'Failed to fetch poster' })
    };

  }
  //console.log(req.params.id); // Den henter det id du har givet i "posterRoutes"

}
export const createRecord = async (req: Request, res: Response) => {
  //console.log(req.body);   //Den bruger altid "body" for at lave "createRecord"
  const { name, slug, description, image, width, height, price, stock } = req.body

  if (!name || !slug || !description || !image || !width || !height || !price || !stock) {

    return res.status(400).json({ error: 'Alle felter skal udfyldes' });

  }
  try {
    const data = await prisma.poster.create({
      data: {
        name,
        slug,
        description,
        image,
        width: Number(width),
        height: Number(height),
        price: Number(price),
        stock: Number(stock),
      }
    });
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Noget gik galt' })
  }
  //console.log(name);  //Den henter det du skriver in i ()
}
export const updateRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id) // Sikrer at id er et tal
  const { name, slug, description, image, width, height, price, stock } = req.body // Deconstruerer form body objektet

  if (!id) {
    return res.status(400).json({ error: 'Id skal have en gyldig værdi' });
  }

  if (!name || !slug || !description || !image || !width || !height || !price || !stock) {

    return res.status(400).json({ error: 'Alle felter skal udfyldes' });
  }

  try {
    const data = await prisma.poster.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        image,
        width: Number(width),
        height: Number(height),
        price: Number(price),
        stock: Number(stock),
      }
    })

    return res.status(201).json(data);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Noget gik galt i serveren' });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    await prisma.poster.delete({
      where: { id },
    });

    res.status(200).json({ message: `poster nr. ${id} er slettet` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke slette poster' });
  }

}