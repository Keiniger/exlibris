import { Book } from "../types/Book"
import classes from "./BookItem.module.css";

export default function BookItem(props: any) {
    const Book = props.book as Book;

    const readOnlineButtons = (b: Book) => b.urls.map((url, i) =>
        <div style={{ display: "flex", flexFlow: "column", gap: "1rem" }}>
            <button onClick={() => props.selectBook(b, url)} >
                Read online {i === 0 ? "" : i + 1}
            </button>
            {
                b.origin === 'Libgen' &&
                <a href={b.urls[0]} target="_blank">
                    Download
                </a>
            }
        </div>
    )

    return <div className={classes.background}>
        <br />
        <img
            src={Book.coverUrl}
            onError={(e) => e.target.style.display = 'none'}
            width="70px"
            height="90px"
        />
        <br />
        Title: {Book.title}
        <br />
        Author: {Book.author}
        <br />
        Language: {Book.language}
        <br />
        Extension: {Book.extension}
        <br />
        Origin: {Book.origin}
        <br />
        <br />
        <div style={{ width: "100%", margin: "auto", display: "flex", justifyContent: "center" }}>
            {readOnlineButtons(Book)}
        </div>
    </div>
}