import { config } from '../../../../shared/config';

export default function MicrosoftReader({ url }: { url: string }) {
    return <iframe src={config.iframes.microsoftDoc(url)} />
}