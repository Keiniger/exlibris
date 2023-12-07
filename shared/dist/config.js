"use strict";
// TODO: Change node project's root so that this config file can be used in both the front and the back
exports.__esModule = true;
exports.config = void 0;
exports.config = {
    urls: {
        backend: "http://localhost:3000",
        libgenMirrors: ["http://libgen.is", "http://libgen.rs"],
        openLibrarySearch: "https://openlibrary.org",
        openLibraryCover: "https://covers.openlibrary.org"
    },
    iframes: {
        openLibrary: function (s) { return "https://www.archive.org/stream/" + s + "?ui=embed"; },
        microsoftDoc: function (s) {
            return "https://view.officeapps.live.com/op/embed.aspx?src=" + s;
        },
        googleDoc: function (s) {
            return "https://docs.google.com/viewer?url=" + s + "&embedded=true";
        }
    },
    ipfsGateways: [
        // hardbin
        function (cid, filename) {
            return "https://hardbin.com/ipfs/" + cid + "?filename=" + filename;
        },
        // cfIpfs
        function (cid, filename) {
            return "https://cf-ipfs.com/ipfs/" + cid + "?filename=" + filename;
        },
        // cloudflare
        function (cid, filename) {
            return "https://cloudflare-ipfs.com/ipfs/" + cid + "?filename=" + filename;
        },
        // aragon
        function (cid, filename) {
            return "https://ipfs.eth.aragon.network/ipfs/" + cid + "?filename=" + filename;
        },
        // dweb
        function (cid, filename) {
            return "https://dweb.eu.org/ipfs/" + cid + "?filename=" + filename;
        },
    ],
    supportedFormats: ["docx", "doc", "epub", "pdf"]
};
