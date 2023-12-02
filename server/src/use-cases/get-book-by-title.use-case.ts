import { Op } from 'sequelize';
import Fiction from '../infraestructure/db/models/fiction.model';

export default async function getBookByTitle(title: string) {
  try {
    const booksFound = await Fiction.findAll({
      where: {
        Title: {
          [Op.like]: `${title}%`,
        },
      },
    });

    // TODO: map booksFound to book entity
    return booksFound;
  } catch (error) {
    console.log(error);
  }
}
