import { Op } from 'sequelize';
import Fiction from '../infraestructure/db/models/fiction.model';
import FictionHashes from '../infraestructure/db/models/fiction-hashes.model';
import Updated from '../infraestructure/db/models/updated.model';
import Hashes from '../infraestructure/db/models/hashes.model';

export default async function getBookByTitle(title: string) {
  try {
    const fiction = await Fiction.findAll({
      attributes: ['Title', 'Author', 'Language', 'Extension', 'Coverurl'],
      where: {
        Title: {
          [Op.like]: `${title}%`,
        },
      },
      include: [{ model: FictionHashes, attributes: ['ipfs_cid'] }],
      limit: 10,
    });

    const nonFiction = await Updated.findAll({
      attributes: ['Title', 'Author', 'Language', 'Extension', 'Coverurl'],
      where: {
        Title: {
          [Op.like]: `${title}%`,
        },
      },
      include: [{ model: Hashes, attributes: ['ipfs_cid'] }],
      limit: 10,
    });

    return { fiction, nonFiction };
  } catch (error) {
    console.log(error);
  }
}
