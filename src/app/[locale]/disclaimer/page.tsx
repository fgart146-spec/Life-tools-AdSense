import { disclaimerContent } from '@/content/site-pages/disclaimer';
import { createSitePage } from '@/lib/site-page';

const page = createSitePage(disclaimerContent, '/disclaimer');

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.Page;
