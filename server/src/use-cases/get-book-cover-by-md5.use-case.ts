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
      return 'http://libgen.is/fictioncovers/' + fictionCoverUrl;
    } else if (nonFictionCoverUrl) {
      return 'http://www.libgen.is/covers/' + nonFictionCoverUrl;
    }
  } catch (error) {
    console.log(error);
  }
}
