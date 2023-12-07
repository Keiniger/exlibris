import { ReactReader } from "react-reader";
import { useState } from "react";

export default function EpubBookReader({ url }: { url: string }) {
    const [location, setLocation] = useState<string | number>(0)

    return <div className="iframe">
        <ReactReader
            url={url}
            location={location}
            locationChanged={(epubcfi: string) => setLocation(epubcfi)}
            epubInitOptions={{ openAs: 'epub' }}
        />
    </div>
}