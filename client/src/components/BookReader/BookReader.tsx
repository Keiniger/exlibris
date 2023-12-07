import { Book, BookOrigins } from "../../types/Book";
import MicrosoftReader from "./MicrosoftReader";
import EpubBookReader from "./EpubBookReader";
import OpenLibraryBookReader from "./OpenLibraryBookReader";
import GoogleReader from "./GoogleReader";

export default function BookReader({ book, url }: { book?: Book; url?: string }) {
    if (!book || !url) return;

    if (book.origin === BookOrigins.OpenLibrary)
        return <OpenLibraryBookReader url={url} />

    if (!book.extension) return <p>Error: selected book has no extension</p>

    const wrapWithObject = (reader: JSX.Element) =>
        <object
            data={url}
            type={"application/" + book.extension}>
            {reader}
        </object>

    if (["ppt", "pptx", "doc", "docx", "xls", "xlsx"].includes(book.extension))
        return wrapWithObject(<MicrosoftReader url={url} />)

    if (["epub"].includes(book.extension))
        return wrapWithObject(<EpubBookReader url={url} />)

    if (["html", "htm"].includes(book.extension))
        return wrapWithObject(<iframe src={url} />)

    return wrapWithObject(<GoogleReader url={url} />)
}
