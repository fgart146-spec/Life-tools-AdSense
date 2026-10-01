import { editorialPolicyContent } from '@/content/site-pages/editorial-policy';
import { createSitePage } from '@/lib/site-page';

const page = createSitePage(editorialPolicyContent, '/editorial-policy');

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.Page;
