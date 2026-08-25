import { contactContent } from '@/content/site-pages/contact';
import { createSitePage } from '@/lib/site-page';

const page = createSitePage(contactContent, '/contact');

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.Page;
