import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { sales, trial } from '@/data/product';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ContactButton, PurchaseButton, TrialButton } from '@/components/Cta';
import { Card, Container, Notice, Section } from '@/components/ui';

export const metadata: Metadata = buildMetadata({
  title: '체험·구매·지원 문의',
  description:
    '이웃부스터 3일 체험 문의, 구매 문의, 이용 중 지원 문의는 카카오톡 오픈채팅으로 받습니다. 문의 시 함께 알려주시면 좋은 내용을 안내합니다.',
  path: '/contact/',
});

const inquiryTypes = [
  {
    title: '3일 체험 문의',
    body: `${trial.days}일 체험을 원하시면 이 버튼으로 문의해 주세요. 안내에 따라 진행되며 즉시 발급되는 방식은 아닙니다.`,
    action: <TrialButton placement="contact_trial" className="w-full sm:w-auto" />,
  },
  {
    title: '구매 문의',
    body:
      sales.status === 'live'
        ? '공식 판매 페이지에서 구매할 수 있습니다.'
        : '이용권과 등급을 정하셨다면 구매 문의를 남겨 주세요. 요금과 결제 방법을 안내드립니다.',
    action: <PurchaseButton placement="contact_purchase" className="w-full sm:w-auto" />,
  },
  {
    title: '이용 중 지원 문의',
    body: '이용 중 궁금한 점이나 문제가 있으면 같은 채널로 문의해 주세요.',
    action: (
      <ContactButton placement="contact_support" label="지원 문의" className="w-full sm:w-auto" />
    ),
  },
];

const tips = [
  '어떤 이용권(영구 / AI)과 등급(STANDARD / DELUXE / PREMIUM)에 관심이 있는지',
  '체험 문의라면 블로그 운영 목적과 하루에 이웃관리에 쓰는 대략적인 시간',
  '지원 문의라면 어떤 작업에서 어떤 현상이 있었는지',
  '네이버 아이디·비밀번호 등 인증정보는 어떤 경우에도 보내지 마세요',
];

export default function ContactPage() {
  return (
    <>
      <Container className="pt-6 sm:pt-8">
        <Breadcrumbs items={[{ name: '문의', path: '/contact/' }]} />
        <header className="mt-4 max-w-3xl">
          <h1 className="text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">체험·구매·지원 문의</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">
            모든 문의는 카카오톡 오픈채팅으로 받습니다. 홈페이지에는 문의 양식이나 회원가입이 없습니다.
          </p>
        </header>
      </Container>

      <Section className="!pt-8">
        <div className="grid gap-4 md:grid-cols-3">
          {inquiryTypes.map((item) => (
            <Card key={item.title} className="flex flex-col">
              <h2 className="text-xl font-bold text-ink-900">{item.title}</h2>
              <p className="mt-2 flex-1 text-base leading-relaxed text-ink-600">{item.body}</p>
              <div className="mt-5">{item.action}</div>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="tinted" eyebrow="문의할 때" title="함께 알려주시면 빠릅니다">
        <ul className="grid max-w-2xl gap-2 text-base leading-relaxed text-ink-700">
          {tips.map((tip) => (
            <li key={tip}>· {tip}</li>
          ))}
        </ul>
        <div className="mt-8 max-w-2xl">
          <Notice title="개인정보에 대해">
            이 홈페이지는 개인정보를 수집하거나 저장하지 않습니다. 카카오톡 오픈채팅에서 나눈 대화는
            카카오의 서비스 정책을 따릅니다. 문의 채널 주소:{' '}
            <a
              href={siteConfig.contact.kakaoOpenChat}
              target="_blank"
              rel="noopener noreferrer"
              className="prose-link break-all"
            >
              {siteConfig.contact.kakaoOpenChat}
            </a>
          </Notice>
        </div>
      </Section>
    </>
  );
}
