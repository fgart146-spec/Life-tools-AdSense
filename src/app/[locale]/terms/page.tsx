import { termsContent } from '@/content/site-pages/terms';
import { createSitePage } from '@/lib/site-page';

const page = createSitePage(termsContent, '/terms');

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.Page;
