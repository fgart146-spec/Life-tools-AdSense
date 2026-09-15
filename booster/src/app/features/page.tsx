import type { Metadata } from 'next';
import Link from 'next/link';
import { features, plans, support, unconfirmed } from '@/data/product';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { TrialButton } from '@/components/Cta';
import { MockScreen } from '@/components/MockScreen';
import { Card, Container, Notice, Section } from '@/components/ui';

export const metadata: Metadata = buildMetadata({
  title: '기능 소개',
  description:
    '서로이웃 대상 탐색·신청, 공감·댓글 관리, 답방, 이웃관리, 작업기록 관리 — 이웃부스터가 돕는 다섯 가지 이웃관리 작업과 각각을 쓰는 상황을 설명합니다.',
  path: '/features/',
});

/** 기능별 설명용 예시 화면 (실제 캡처 아님) */
const mocks: Record<string, { title: string; rows: { label: string; state: string }[] }> = {
  discover: {
    title: '서로이웃 대상 탐색 — 예시',
    rows: [
      { label: '주제가 비슷한 블로그 A', state: '신청 대상' },
      { label: '주제가 비슷한 블로그 B', state: '신청 대상' },
      { label: '최근 활동이 없는 블로그', state: '제외' },
    ],
  },
  react: {
    title: '공감·댓글 관리 — 예시',
    rows: [
      { label: '이웃 C의 새 글', state: '댓글 예정' },
      { label: '이웃 D의 새 글', state: '공감 완료' },
    ],
  },
  log: {
    title: '작업기록 — 예시',
    rows: [
      { label: '오늘 · 답방', state: '완료' },
      { label: '오늘 · 서로이웃 신청', state: '완료' },
      { label: '어제 · 댓글', state: '완료' },
    ],
  },
};

const notDoing = [
  '이 홈페이지에서 네이버 아이디·비밀번호·인증정보를 요구하거나 수집하지 않습니다.',
  '보호조치 우회나 탐지 회피를 목적으로 하는 기능이나 안내를 제공하지 않습니다.',
  '홈페이지에는 회원가입·결제·파일 업로드 기능이 없습니다. 체험과 구매는 문의로 진행됩니다.',
];

export default function FeaturesPage() {
  return (
    <>
      <Container className="pt-6 sm:pt-8">
        <Breadcrumbs items={[{ name: '기능 소개', path: '/features/' }]} />
        <header className="mt-4 max-w-3xl">
          <h1 className="text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            이웃관리의 다섯 가지 일, 이웃부스터가 돕는 방식
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">
            블로그 운영자가 매일 되풀이하는 이웃관리 작업을 다섯 갈래로 나누어 설명합니다. 각 기능은
            영구 이용권과 AI 이용권에서 같은 등급이면 같은 범위로 제공됩니다.
          </p>
        </header>
      </Container>

      {features.map((feature, index) => {
        const mock = mocks[feature.id];
        const reversed = index % 2 === 1;
        return (
          <Section key={feature.id} tone={index % 2 === 0 ? 'plain' : 'tinted'} className="!py-10 sm:!py-14">
            <div
              className={`grid items-center gap-8 ${mock ? 'lg:grid-cols-2' : ''} ${
                reversed ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div className="max-w-xl">
                <p className="text-sm font-semibold text-brand-700">기능 0{index + 1}</p>
                <h2 className="mt-1 text-2xl font-bold text-ink-900 sm:text-3xl">{feature.name}</h2>
                <p className="mt-3 text-lg leading-relaxed text-ink-700">{feature.summary}</p>
                <div className="mt-5 rounded-xl border border-ink-200 bg-ink-50 px-4 py-3">
                  <p className="text-sm font-semibold text-ink-700">이런 상황이라면</p>
                  <p className="mt-1 text-base leading-relaxed text-ink-600">{feature.situation}</p>
                </div>
              </div>
              {mock && <MockScreen title={mock.title} rows={mock.rows} />}
            </div>
          </Section>
        );
      })}

      <Section
        eyebrow="문구는 어떻게 만들어지나"
        title="영구 이용권은 등록 문구, AI 이용권은 AI 생성"
        description="기능 범위는 등급 기준으로 같습니다. 두 이용 방식이 다른 건 댓글·인사에 쓰는 문구를 어떻게 만드느냐입니다."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {(['lifetime', 'ai'] as const).map((id) => (
            <Card key={id}>
              <h3 className="text-xl font-bold text-ink-900">{plans[id].name}</h3>
              <p className="mt-2 text-base font-semibold text-brand-700">{plans[id].phraseMethod}</p>
              <p className="mt-2 text-base leading-relaxed text-ink-600">{plans[id].aiUsage}</p>
            </Card>
          ))}
        </div>
        <p className="mt-5 text-base text-ink-600">
          <Link href="/pricing/" className="prose-link font-semibold">
            이용권과 등급 비교
          </Link>
          {' · '}
          <Link href="/guide/lifetime-vs-ai/" className="prose-link font-semibold">
            어떤 이용권을 고를지 가이드
          </Link>
        </p>
      </Section>

      <Section tone="tinted" eyebrow="하지 않는 것" title="분명히 해 두는 세 가지">
        <ul className="grid gap-3 md:grid-cols-3">
          {notDoing.map((item) => (
            <li key={item} className="rounded-xl border border-ink-200 bg-ink-50 px-5 py-4 text-base leading-relaxed text-ink-700">
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Notice title="지원 환경">
            {support.os ?? unconfirmed.support} {support.note}
          </Notice>
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-card)] border border-ink-200 bg-white p-6">
          <div>
            <h2 className="text-xl font-bold text-ink-900">직접 써 보는 게 가장 빠릅니다</h2>
            <p className="mt-1 text-base text-ink-600">3일 체험은 문의 후 안내에 따라 진행됩니다.</p>
          </div>
          <TrialButton placement="features_bottom" />
        </div>
      </Section>
    </>
  );
}
