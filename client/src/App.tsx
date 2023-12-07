import { useState } from 'react'
import Search from './components/Search';
import BookReader from './components/BookReader/BookReader';
import BookItem from './components/BookItem';
import './App.css'
import { Book, LibgenCover, formatLibgenBook, formatOpenLibraryBook, isOpenLibraryBookComplete } from './types/Book';
import { config } from '../../shared/config';

export default function App() {
  const [books, setBooks] = useState<Book[] | undefined>();
  const [book, setBook] = useState<Book | undefined>();
  const [bookUrl, setBookUrl] = useState<string | undefined>("");


  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (search: string) => {
    if ("" === search) return;

    setLoading(true);
    setBookUrl(undefined)

    try {
      const promise = fetch(`${config.urls.backend}/book?title=${search}`, { method: "GET" });
      const promise2 = fetch(`${config.urls.openLibrarySearch}/search.json?title=${search.replace(/\s+/g, '+')}`, { method: "GET" });
      const [response, response2] = await Promise.all([promise, promise2])

      const books: Book[] = [];

      if (response.ok) {
        const { fiction, nonFiction } = await response.json();

        books.push(
          ...fiction.map((b: any) => formatLibgenBook(b, LibgenCover.Fiction)),
          ...nonFiction.map((b: any) => formatLibgenBook(b, LibgenCover.NonFiction))
        )
      }

      if (response2.ok) {
        const { docs } = await response2.json();

        if (docs.length) {
          const openLibraryBooks = docs
            .filter((b: any) => isOpenLibraryBookComplete(b))
            .map((b: any) => formatOpenLibraryBook(b))

          books.push(...openLibraryBooks);
        }
      }

      setBooks(books);
      setLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const selectBook = (book: Book, url: string) => {
    setBookUrl(url)
    setBook(book);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <>
      <BookReader
        book={book}
        url={bookUrl}
      />

      <br />

      <Search onSearch={handleSearch} />

      {loading && <div> Loading... </div>}

      {!loading &&
        books &&
        books?.length === 0 &&
        <div> No books found :( </div>}

      {!loading &&
        books &&
        books.length > 0 &&
        books.map((book: any) =>
          <BookItem
            book={book}
            selectBook={selectBook}
          />
        )}
    </>
  )
}
