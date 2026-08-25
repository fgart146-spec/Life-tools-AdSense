import { aboutContent } from '@/content/site-pages/about';
import { createSitePage } from '@/lib/site-page';

const page = createSitePage(aboutContent, '/about');

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.Page;
