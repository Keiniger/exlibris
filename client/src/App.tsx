import { useState } from 'react'
import { ReactReader } from 'react-reader'
import './App.css'

const readerDimensions = {
  width: "800px",
  height: "900px"
}

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [location, setLocation] = useState<string | number>(0)

  const [books, setBooks] = useState<object[]>([]);
  const [bookDownloadLink, setBookDownloadLink] = useState<string>("");
  const [bookFileExtension, setBookFileExtension] = useState<string>("")

  const handleSearch = async () => {
    if ("" === searchTerm) return;

    try {
      const response = await fetch(`http://localhost:3000/book?title=${searchTerm}`, { method: "GET" });

      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        throw new Error('Request failed with status: ' + response.status);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const getFilename = (book: any) => {
    return book?.Author + " - " + book.Title + "." + book.Extension
  }

  const getDownloadLink = (book: any) => {
    console.log(book)
    const ipfs_cid = book?.FictionHash?.ipfs_cid
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

  return (
    <>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5_VzbUfbMwVBizSK_uuOyPLXxYGKdawj-HF4BnA&s=0' />
      {bookDownloadLink && !["epub", "doc", "docx"].includes(bookFileExtension) && <iframe
        src={bookDownloadLink}
        height={readerDimensions.height}
        width={readerDimensions.width} />}

      {bookDownloadLink && ["docx", "doc"].includes(bookFileExtension) &&
        <>
          <iframe
            src={'https://view.officeapps.live.com/op/embed.aspx?src=' + bookDownloadLink}
            width={readerDimensions.width}
            height={readerDimensions.height} />
          {/* <iframe
            src={"https://docs.google.com/gview?url=" + bookDownloadLink + "&embedded=true"}
            height={readerDimensions.height}
            width={readerDimensions.width} />
          <div id="for_viewer" /> */}
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

      <br />
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}> Search </button>

      {books && books.map((b: object) => {
        return <>
          <p>
            <br />
            MD5: {b.MD5}
            <br />
            Title: {b.Title}
            <br />
            Author: {b.Author}
            <br />
            Language: {b.Language}
            <br />
            Extension: {b.Extension}
            <br />
            FileName: {b?.Author + " - " + b.Title + "." + b.Extension}
            <br />
            <br />
            <button onClick={() => manageShowBook(b)}>Read online</button>
            <br />
            <a href={getDownloadLink(b)}>Download</a>
          </p>
          <hr />
        </>
      })}
    </>
  )
}

export default App
