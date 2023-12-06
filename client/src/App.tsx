import { useEffect, useState } from 'react'
import { ReactReader } from 'react-reader'
import './App.css'

const readerDimensions = {
  width: "800px",
  height: "900px"
}

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [location, setLocation] = useState<string | number>(0)

  const [openLibraryBooks, setOpenLibraryBooks] = useState<object[]>([]);
  const [books, setBooks] = useState<object[]>([]);

  const [openLibraryBookDownloadLink, setOpenLibraryBookDownloadLink] = useState<string>("");
  const [bookDownloadLink, setBookDownloadLink] = useState<string>("");

  const [bookFileExtension, setBookFileExtension] = useState<string>("")

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
  }, []);

  const handleSearch = async () => {
    if ("" === searchTerm) return;

    setLoading(true);
    setBookDownloadLink("")
    setOpenLibraryBookDownloadLink("");
    try {
      const promise = fetch(`http://localhost:3000/book?title=${searchTerm}`, { method: "GET" });
      const promise2 = fetch(`https://openlibrary.org/search.json?title=${searchTerm.replace(/\s+/g, '+')}`, { method: "GET" });
      const [response, response2] = await Promise.all([promise, promise2])

      if (response.ok) {
        const { fiction, nonFiction } = await response.json();

        const books = [
          ...(fiction.map((b: any) => ({ ...b, coverType: "fictioncovers" }))),
          ...(nonFiction.map((b: any) => ({ ...b, coverType: "covers" })))]
        setBooks(books);
      }

      if (response2.ok) {
        const { docs } = await response2.json();
        if (docs.length) {
          const openLibraryBooks = docs.filter((book: any) => book.public_scan_b).map((book: any) => ({
            Title: book.title,
            Author: book.author_name,
            Language: book.language,
            ia: book.ia,
            Coverurl: "https://covers.openlibrary.org/b/id/" + book.cover_i + "-M.jpg",
          }))

          setOpenLibraryBooks(openLibraryBooks);
        }

        setLoading(false);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const getFilename = (book: any) => {
    return book?.Author + " - " + book.Title + "." + book.Extension
  }

  const getDownloadLink = (book: any) => {
    const ipfs_cid = (book?.Hash ?? book?.FictionHash).ipfs_cid

    return `https://cloudflare-ipfs.com/ipfs/${ipfs_cid}?filename=${getFilename(book)}`
  }

  const manageShowBook = (book: any) => {
    setBookDownloadLink(getDownloadLink(book))
    setBookFileExtension(book.Extension);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  const manageShowBookOpenLibrary = (ia: string) => {
    setOpenLibraryBookDownloadLink(ia)
    setBookFileExtension("open_library");

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <>
      <h1> Exlibris </h1>
      <h2> Dedicado a Maguchi ❤❤❤ </h2>
      {openLibraryBookDownloadLink && ["open_library"].includes(bookFileExtension) && <iframe
        src={`https://www.archive.org/stream/${openLibraryBookDownloadLink}?ui=embed`}
        height={readerDimensions.height}
        width={readerDimensions.width} />}

      {bookDownloadLink && ["docx", "doc"].includes(bookFileExtension) &&
        <>
          <iframe
            src={'https://view.officeapps.live.com/op/embed.aspx?src=' + bookDownloadLink}
            width={readerDimensions.width}
            height={readerDimensions.height} />
          {/* 
          // Google docs document reader
          <iframe
            src={"https://docs.google.com/gview?url=" + bookDownloadLink + "&embedded=true"}
            height={readerDimensions.height}
            width={readerDimensions.width} />
          <div id="for_viewer" /> 
          */}
        </>
      }

      {bookDownloadLink && ["epub"].includes(bookFileExtension) &&
        <div style={{ height: readerDimensions.height, width: readerDimensions.width }}>
          <ReactReader
            url={bookDownloadLink}
            location={location}
            locationChanged={(epubcfi: string) => setLocation(epubcfi)}
            epubInitOptions={{ openAs: 'epub' }}
          />
        </div>}

      {bookDownloadLink && !["epub", "doc", "docx", "open_library"].includes(bookFileExtension) && <iframe
        src={bookDownloadLink}
        height={readerDimensions.height}
        width={readerDimensions.width} />}

      <br />
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}> Search </button>

      {loading && <p> Loading... </p>}
      {!loading &&
        <>
          {books.length > 0 && <>
            {books?.map((b: object) => {
              return <>
                <p>
                  <img src={`http://localhost:3000/cover/${b.coverType}/${b.Coverurl}`} onError={(e) => e.target.style.display = 'none'} width="70px" height="90px" />
                  <br />
                  Title: {b.Title}
                  <br />
                  Author: {b.Author}
                  <br />
                  Language: {b.Language}
                  <br />
                  Extension: {b.Extension}
                  <br />
                  Origin: Libgen
                  <br />
                  <br />
                  <button onClick={() => manageShowBook(b)}>Read online</button>
                  {/* <br /> */}
                  {/* <a href={getDownloadLink(b)}>Download</a> */}
                </p>
                <hr />
              </>
            })}
          </>
          }

          {openLibraryBooks.length > 0 && <>
            {openLibraryBooks?.map((b: object) => {
              return <div style={{ maxWidth: readerDimensions.width, textAlign: "center" }}>
                <p >
                  <img src={b.Coverurl} onError={(e) => e.target.style.display = 'none'} width="70px" height="90px" />
                  <br />
                  Title: {b.Title}
                  <br />
                  Author: {b.Author}
                  <br />
                  Language: {b.Language}
                  <br />
                  Origin: OpenLibrary
                  <br />
                  <br />
                  {b.ia.map((ia, i) =>
                    <button onClick={() => manageShowBookOpenLibrary(ia)}>Read online {i === 0 ? "" : i + 1}</button>
                  )}
                </p>
                <hr />
              </div>
            })}
          </>}
        </>
      }

    </>
  )
}

// const data2 = await response2.json();
export default App
