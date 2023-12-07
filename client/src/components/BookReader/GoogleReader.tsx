import { config } from '../../../../shared/config';

export default function GoogleReader({ url }: { url: string }) {
    return <iframe src={config.iframes.googleDoc(url)} />
};