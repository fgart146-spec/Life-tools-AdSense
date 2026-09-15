import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { featuredFaq, features, planFacts, plans, trial, usageFlow } from '@/data/product';
import { buildMetadata, serializeJsonLd, webSiteJsonLd } from '@/lib/seo';
import { ContactButton, TrialButton } from '@/components/Cta';
import { FaqList } from '@/components/Faq';
import { MockScreen } from '@/components/MockScreen';
import { Card, Container, LinkButton, Notice, Section } from '@/components/ui';

export const metadata: Metadata = {
  ...buildMetadata({
    title: '이웃부스터 | 네이버 블로그 이웃관리·서이추 프로그램',
    description: siteConfig.description,
    path: '/',
  }),
  // 홈은 템플릿('%s | 이웃부스터')을 쓰지 않고 완성된 제목을 그대로 쓴다.
  title: { absolute: '이웃부스터 | 네이버 블로그 이웃관리·서이추 프로그램' },
};

const pains = [
  {
    title: '서로이웃 대상 찾기',
    body: '비슷한 주제의 블로그를 하나씩 찾아다니며 신청하는 데 시간이 갑니다.',
  },
  {
    title: '댓글 확인과 답방',
    body: '누가 다녀갔는지, 어디에 댓글을 남겼는지 매번 다시 확인해야 합니다.',
  },
  {
    title: '이웃 관리',
    body: '이웃이 늘수록 누구와 어떤 관계인지 파악하기 어려워집니다.',
  },
  {
    title: '작업 내역',
    body: '어제 어디까지 했는지 기억에 의존하다 보면 빠뜨리거나 겹칩니다.',
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(webSiteJsonLd()) }}
      />

      {/* 첫 화면 */}
      <section className="border-b border-ink-200 bg-white">
        <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div>
            <p className="text-sm font-semibold text-brand-700 sm:text-base">
              {siteConfig.tagline}, {siteConfig.name}
            </p>
            <h1 className="mt-3 text-[2rem] font-bold leading-[1.2] text-ink-900 sm:text-5xl">
              반복되는 이웃관리,
              <br />
              이제 더 간편하게.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
              서로이웃 대상 탐색부터 공감·댓글, 답방, 작업 내역 정리까지. 블로그 운영에서 매일
              되풀이되는 이웃관리 작업을 프로그램이 대신 처리하도록 돕습니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TrialButton placement="hero" size="large" />
              <LinkButton href="/features/" variant="secondary" className="min-h-14 px-7 text-lg">
                기능 살펴보기
              </LinkButton>
            </div>
            <p className="mt-4 text-sm text-ink-500">{siteConfig.independenceNotice}</p>
          </div>
          <MockScreen
            title="이웃부스터 — 작업 화면 예시"
            rows={[
              { label: '주제가 비슷한 블로그 A', state: '신청 대상' },
              { label: '주제가 비슷한 블로그 B', state: '신청 대상' },
              { label: '오늘 다녀간 이웃 C', state: '답방 예정' },
              { label: '새 글 올린 이웃 D', state: '댓글 예정' },
            ]}
          />
        </Container>
      </section>

      {/* 불편 */}
      <Section
        eyebrow="이런 일이 매일 반복된다면"
        title="이웃관리는 작지만 끝이 없는 일입니다"
        description="하나하나는 몇 초지만, 매일 수십 번 반복되면 글 쓸 시간이 사라집니다."
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {pains.map((pain) => (
            <li key={pain.title}>
              <Card className="h-full">
                <h3 className="text-lg font-bold text-ink-900">{pain.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-600">{pain.body}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* 핵심 기능 */}
      <Section
        tone="tinted"
        eyebrow="핵심 기능"
        title="이웃관리의 다섯 가지 일을 한 곳에서"
        description="어떤 상황에서 어떤 기능을 쓰는지, 기능 페이지에서 더 자세히 설명합니다."
      >
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <li
              key={feature.id}
              className="rounded-[var(--radius-card)] border border-ink-200 bg-ink-50 p-5"
            >
              <p className="text-sm font-semibold text-brand-700">0{index + 1}</p>
              <h3 className="mt-1 text-lg font-bold text-ink-900">{feature.name}</h3>
              <p className="mt-2 text-base leading-relaxed text-ink-600">{feature.summary}</p>
            </li>
          ))}
          <li className="flex items-center rounded-[var(--radius-card)] border border-dashed border-brand-300 bg-brand-50 p-5">
            <Link href="/features/" className="text-base font-semibold text-brand-700 hover:underline">
              기능별 사용 상황 보기 →
            </Link>
          </li>
        </ol>
      </Section>

      {/* 사용 흐름 */}
      <Section
        eyebrow="사용 흐름"
        title="시작부터 확인까지, 네 단계"
        description="체험 문의 후 안내를 받아 시작하고, 문구 방식을 정한 뒤 작업하고, 내역을 확인합니다."
      >
        <ol className="grid gap-4 md:grid-cols-4">
          {usageFlow.map((item, index) => (
            <li key={item.step} className="relative">
              <Card className="h-full">
                <p className="text-sm font-semibold text-brand-700">
                  {index + 1}단계 · {item.step}
                </p>
                <h3 className="mt-1 text-lg font-bold text-ink-900">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{item.body}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      {/* 이용권 요약 */}
      <Section
        tone="tinted"
        eyebrow="이용권"
        title="영구 이용권과 AI 이용권"
        description={planFacts.sameTierSameFeatures}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {(['lifetime', 'ai'] as const).map((id) => {
            const plan = plans[id];
            return (
              <Card key={id} className="flex h-full flex-col">
                <p className="text-sm font-semibold text-brand-700">{plan.billingLabel}</p>
                <h3 className="mt-1 text-2xl font-bold text-ink-900">{plan.name}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink-600">{plan.summary}</p>
                <dl className="mt-4 grid gap-2 text-sm">
                  <div className="flex gap-2">
                    <dt className="w-24 shrink-0 font-semibold text-ink-700">문구 생성</dt>
                    <dd className="text-ink-600">{plan.phraseMethod}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-24 shrink-0 font-semibold text-ink-700">AI 사용량</dt>
                    <dd className="text-ink-600">{plan.aiUsage}</dd>
                  </div>
                </dl>
              </Card>
            );
          })}
        </div>
        <p className="mt-5 text-base text-ink-600">
          {planFacts.threeTiers}{' '}
          <Link href="/pricing/" className="prose-link font-semibold">
            이용권 비교 보기
          </Link>
        </p>
      </Section>

      {/* 체험·문의 */}
      <Section
        eyebrow="3일 체험"
        title="먼저 써 보고 결정하세요"
        description={`${trial.days}일 체험은 카카오톡 오픈채팅으로 문의하면 안내에 따라 진행됩니다. 버튼을 누른다고 즉시 발급되는 방식은 아닙니다.`}
      >
        <div className="flex flex-wrap gap-3">
          <TrialButton placement="home_trial" size="large" />
          <ContactButton placement="home_trial" label="구매·이용 문의" size="large" />
        </div>
      </Section>

      {/* 대표 FAQ */}
      <Section
        tone="tinted"
        eyebrow="자주 묻는 질문"
        title="구매 전에 많이 묻는 것"
        description="더 많은 질문과 답변은 FAQ 페이지에 정리했습니다."
      >
        <FaqList items={featuredFaq()} />
        <p className="mt-5">
          <Link href="/faq/" className="prose-link font-semibold">
            FAQ 전체 보기
          </Link>
        </p>
      </Section>

      {/* 주의사항 + 마지막 CTA */}
      <Section>
        <Notice title="이용 전에 확인해 주세요" tone="caution">
          이웃부스터는 네이버가 만들거나 인증한 서비스가 아닙니다. 사용할 때는 네이버의 정책과 다른
          이용자의 의사를 존중해야 하며, 어떤 도구도 플랫폼의 조치를 대신 보장하지 않습니다.
        </Notice>
        <div className="mt-10 rounded-[var(--radius-card)] bg-brand-700 px-6 py-10 text-center text-white sm:px-10">
          <h2 className="text-2xl font-bold sm:text-3xl">이웃관리에 쓰던 시간을 글쓰기에</h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-brand-100">
            3일 체험 문의로 시작하세요. 이용 방식이 고민되면 이용권 비교 가이드를 먼저 읽어 보셔도
            좋습니다.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <TrialButton placement="home_bottom" size="large" className="bg-white !text-brand-800 hover:bg-brand-50" />
            <LinkButton
              href="/guide/lifetime-vs-ai/"
              variant="secondary"
              className="min-h-14 border-brand-400 bg-transparent px-7 text-lg text-white hover:bg-brand-600"
            >
              이용권 선택 가이드
            </LinkButton>
          </div>
        </div>
      </Section>
    </>
  );
}
