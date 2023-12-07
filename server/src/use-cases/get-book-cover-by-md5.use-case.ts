import Fiction from '../infraestructure/db/models/fiction.model';
import Updated from '../infraestructure/db/models/updated.model';

export default async function getBookCoverByMd5(md5: string) {
  try {
    const fictionCoverUrl = await Fiction.findOne({
      attributes: ['Coverurl'],
      where: { md5 },
    });

    const nonFictionCoverUrl = await Updated.findOne({
      attributes: ['Coverurl'],
      where: { md5 },
    });

    if (fictionCoverUrl) {
      return `${process.env.LIBGEN}/fictioncovers/${fictionCoverUrl}`;
    } else if (nonFictionCoverUrl) {
      return `${process.env.LIBGEN}/covers/${fictionCoverUrl}`;
    }
  } catch (error) {
    console.log(error);
  }
}
