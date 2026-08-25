import { privacyContent } from '@/content/site-pages/privacy';
import { createSitePage } from '@/lib/site-page';

const page = createSitePage(privacyContent, '/privacy');

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.Page;
