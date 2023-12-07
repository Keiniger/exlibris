import { config } from '../../../../shared/config';

export default function OpenLibraryBookReader({ url }: { url: string }) {
    return <iframe src={config.iframes.openLibrary(url)} />
}