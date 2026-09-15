import type { Metadata } from 'next';
import Link from 'next/link';
import { guides, plans, trial, unconfirmed } from '@/data/product';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { TrialButton } from '@/components/Cta';
import { Container, Notice } from '@/components/ui';

const guide = guides.find((item) => item.slug === 'getting-started');
if (!guide) throw new Error('guide meta missing: getting-started');
const meta = guide;

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.summary,
  path: '/guide/getting-started/',
  type: 'article',
});

const steps = [
  {
    title: '3일 체험을 문의합니다',
    body: `카카오톡 오픈채팅으로 ${trial.label}를 보내면 이용 방법을 안내받습니다. 버튼을 누른다고 즉시 발급되는 방식은 아니며, 체험 등급과 제공 범위는 안내 시 확인할 수 있습니다.`,
  },
  {
    title: '안내에 따라 프로그램을 준비합니다',
    body: '프로그램 제공 방법과 지원 환경은 문의 시 안내드립니다. 이 홈페이지에는 다운로드 버튼이 없으며, 확인되지 않은 경로에서 받은 파일은 사용하지 마세요.',
  },
  {
    title: '이메일로 가입하고 인증 메일을 확인합니다',
    body: '프로그램에서 이메일과 비밀번호로 가입하면 인증 메일이 옵니다. 메일의 링크를 열어 인증을 마친 뒤 프로그램으로 돌아가 로그인합니다. 비밀번호를 잊으면 프로그램의 재설정 기능으로 메일을 다시 받을 수 있습니다.',
  },
  {
    title: '문구 방식을 설정합니다',
    body: `${plans.lifetime.name}은 사용할 문구와 팜플렛을 등록하고, ${plans.ai.name}은 AI가 게시글 내용에 맞춰 문구를 만들도록 설정합니다. 어느 쪽이든 같은 등급이면 관리 기능 범위는 같습니다.`,
  },
  {
    title: '작업을 실행하고 내역을 확인합니다',
    body: '서로이웃 대상 탐색·신청, 공감·댓글, 답방, 이웃관리 작업을 등급 범위에서 실행하고, 작업기록에서 무엇을 언제 했는지 확인합니다. 처음에는 작은 범위로 시작해 결과를 보며 넓히는 것을 권합니다.',
  },
];

export default function GettingStartedPage() {
  return (
    <Container size="narrow" className="py-6 sm:py-8">
      <Breadcrumbs
        items={[
          { name: '이용 가이드', path: '/guide/' },
          { name: meta.title, path: '/guide/getting-started/' },
        ]}
      />
      <article className="mt-4">
        <header>
          <h1 className="text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">{meta.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">{meta.summary}</p>
          <p className="mt-2 text-sm text-ink-500">
            <time dateTime={meta.updatedAt}>{meta.updatedAt}</time> 업데이트
          </p>
        </header>

        <ol className="mt-10 grid gap-6">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-6">
              <p className="text-sm font-semibold text-brand-700">{index + 1}단계</p>
              <h2 className="mt-1 text-xl font-bold text-ink-900">{step.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-700">{step.body}</p>
            </li>
          ))}
        </ol>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink-900">이용할 때 지켜 주세요</h2>
          <div className="mt-4">
            <Notice tone="caution">
              <ul className="grid gap-1.5">
                <li>· 네이버의 정책과 다른 이용자의 의사를 존중하는 범위에서 사용합니다.</li>
                <li>· 어떤 도구도 플랫폼의 조치를 대신 보장하지 않습니다. 과한 빈도의 작업은 피합니다.</li>
                <li>· 네이버 인증정보를 이 홈페이지에 입력하는 일은 없습니다. 그런 요구를 받으면 이용하지 마세요.</li>
              </ul>
            </Notice>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-ink-900">아직 확인이 필요한 것</h2>
          <p className="mt-3 text-base leading-relaxed text-ink-700">
            {unconfirmed.support} {unconfirmed.trialScope} 확인되는 대로 이 가이드에 반영합니다.
          </p>
        </section>

        <footer className="mt-12 flex flex-wrap items-center gap-3 border-t border-ink-200 pt-8">
          <TrialButton placement="guide_getting_started" />
          <Link href="/guide/lifetime-vs-ai/" className="prose-link font-semibold">
            다음 글: 영구 이용권과 AI 이용권의 차이 →
          </Link>
        </footer>
      </article>
    </Container>
  );
}
