import { config } from '../../../shared/config';

export enum LibgenCover {
  NonFiction = 'covers',
  Fiction = 'fictioncovers',
}

export type LibgenCoverType = (typeof LibgenCover)[keyof typeof LibgenCover];

export enum BookOrigins {
  Libgen = 'Libgen',
  OpenLibrary = 'OpenLibrary',
}

export type BookOriginsType = (typeof BookOrigins)[keyof typeof BookOrigins];

export type Book = {
  title: string;
  author: string;
  language: string;
  origin: BookOriginsType;
  urls: string[];
  pages?: number;
  libgenCoverType?: LibgenCoverType;
  size?: string;
  extension?: string; // TODO: check if extension is supported
  coverUrl?: string;
};

const getFilename = (book: any) => {
  return book?.Author + ' - ' + book.Title + '.' + book.Extension;
};

const getLibgenDownloadLinks = (book: any) => {
  const ipfs_cid = (book?.Hash ?? book?.FictionHash).ipfs_cid;
  const filename = getFilename(book);

  const links = config.ipfsGateways.map((gatewayLinkCreator) => gatewayLinkCreator(ipfs_cid, filename));

  return links;
};

export const isOpenLibraryBookComplete = (book: any) => {
  return book.public_scan_b;
};

export function formatLibgenBook(book: any, libgenCoverType: LibgenCoverType): Book {
  return {
    title: book.Title,
    author: book.Author,
    language: book.Language,
    origin: BookOrigins.Libgen,
    // TODO: create multiple links with all the available gateways
    urls: getLibgenDownloadLinks(book),
    extension: book.Extension,
    coverUrl: book.Coverurl === '' ? '' : `${config.urls.backend}/cover/${libgenCoverType}/${book.Coverurl}`,
  };
}

export function formatOpenLibraryBook(book: any): Book {
  return {
    title: book.title,
    author: book.author_name,
    language: book.language,
    origin: BookOrigins.OpenLibrary,
    urls: [...book.ia],
    coverUrl: `${config.urls.openLibraryCover}/b/id/${book.cover_i}-M.jpg`,
  };
}
