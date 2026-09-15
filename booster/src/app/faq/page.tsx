import type { Metadata } from 'next';
import { faq } from '@/data/product';
import { buildMetadata, faqJsonLd, serializeJsonLd } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ContactButton, TrialButton } from '@/components/Cta';
import { FaqList } from '@/components/Faq';
import { Container, Section } from '@/components/ui';

export const metadata: Metadata = buildMetadata({
  title: '자주 묻는 질문',
  description:
    '이웃부스터 구매 전에 자주 묻는 질문 — 영구 이용권과 AI 이용권의 차이, 같은 등급의 기능 범위, 3일 체험, 가격 문의, 지원 환경, 이용 시 주의사항.',
  path: '/faq/',
});

export default function FaqPage() {
  return (
    <>
      {/* 화면의 질문·답변과 같은 데이터로 만든다. 검색결과 표시를 보장하지는 않는다. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd(faq)) }}
      />
      <Container className="pt-6 sm:pt-8">
        <Breadcrumbs items={[{ name: '자주 묻는 질문', path: '/faq/' }]} />
        <header className="mt-4 max-w-3xl">
          <h1 className="text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">자주 묻는 질문</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">
            구매 전에 많이 묻는 질문을 모았습니다. 여기 없는 내용은 문의해 주세요.
          </p>
        </header>
      </Container>

      <Section className="!pt-8">
        <div className="max-w-3xl">
          <FaqList items={faq} openFirst />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <TrialButton placement="faq_bottom" />
          <ContactButton placement="faq_bottom" label="다른 질문 문의하기" />
        </div>
      </Section>
    </>
  );
}
