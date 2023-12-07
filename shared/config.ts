// TODO: Change node project's root so that this config file can be used in both the front and the back

export const config = {
  urls: {
    backend: "http://localhost:3000",
    libgenMirrors: ["http://libgen.is", "http://libgen.rs"],
    openLibrarySearch: "https://openlibrary.org",
    openLibraryCover: "https://covers.openlibrary.org",
  },
  iframes: {
    openLibrary: (s: string) => `https://www.archive.org/stream/${s}?ui=embed`,
    microsoftDoc: (s: string) =>
      "https://view.officeapps.live.com/op/embed.aspx?src=" + s,
    googleDoc: (s: string) =>
      `https://docs.google.com/viewer?url=${s}&embedded=true`,
  },
  ipfsGateways: [
    // hardbin
    (cid: string, filename: string) =>
      `https://hardbin.com/ipfs/${cid}?filename=${filename}`,

    // cfIpfs
    (cid: string, filename: string) =>
      `https://cf-ipfs.com/ipfs/${cid}?filename=${filename}`,

    // cloudflare
    (cid: string, filename: string) =>
      `https://cloudflare-ipfs.com/ipfs/${cid}?filename=${filename}`,

    // aragon
    (cid: string, filename: string) =>
      `https://ipfs.eth.aragon.network/ipfs/${cid}?filename=${filename}`,

    // dweb
    (cid: string, filename: string) =>
      `https://dweb.eu.org/ipfs/${cid}?filename=${filename}`,
  ],
  supportedFormats: ["docx", "doc", "epub", "pdf"],
};
