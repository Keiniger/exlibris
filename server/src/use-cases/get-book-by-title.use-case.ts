import { Op } from 'sequelize';
import Fiction from '../infraestructure/db/models/fiction.model';
import FictionHashes from '../infraestructure/db/models/fiction-hashes.model';

export default async function getBookByTitle(title: string) {
  try {
    const booksFound = await Fiction.findAll({
      where: {
        Title: {
          [Op.like]: `${title}%`,
        },
      },
      include: [FictionHashes],
      limit: 10,
    });

    return booksFound;
  } catch (error) {
    console.log(error);
  }
}
