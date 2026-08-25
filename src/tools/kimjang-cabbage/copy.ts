/** 김장 배추 수량 계산기 UI 문자열 */
export interface KimjangCabbageCopy {
  membersLabel: string;
  membersUnit: string;
  monthsLabel: string;
  monthsUnit: string;
  monthsHint: string;
  gramLabel: string;
  gramUnit: string;
  gramHint: string;
  weightLabel: string;
  weightUnit: string;
  weightHint: string;

  countLabel: string;
  kimchiLabel: string;
  saltedLabel: string;
  freshLabel: string;
  saltLabel: string;
  brineLabel: string;

  /** %{count} */
  noteCount: string;
  /** %{kimchi} */
  noteKimchi: string;
  /** %{salt}, %{brine} */
  noteSalt: string;
  noteSalted: string;
  noteBasis: string;

  issueMembers: string;
  issueMonths: string;
  issueGram: string;
  issueWeight: string;
}
