import { CharacterAvatar } from "../components/CharacterAvatar";
import { StatusPill } from "../components/StatusPill";
import { characterState, publicProfileItems } from "../data/demoData";
import { getApprovedProfileItems } from "../lib/profile";

export function PublicProfileScreen() {
  const approvedItems = getApprovedProfileItems(publicProfileItems);

  return (
    <section className="screen-layout">
      <div className="page-hero">
        <StatusPill tone="public">사용자 승인 후 공개</StatusPill>
        <h2>친구에게 보여주는 캐릭터 프로필</h2>
        <p>AI가 제안한 항목 중 사용자가 승인한 내용만 공유 카드에 포함합니다.</p>
      </div>
      <div className="profile-preview">
        <article className="panel character-panel">
          <CharacterAvatar character={characterState} />
          <button className="primary-action" type="button">공유 링크 복사</button>
          <button className="secondary-action" type="button">명함 이미지 저장</button>
        </article>
        <article className="panel">
          <h3>공개 항목</h3>
          {approvedItems.map((item) => (
            <div className="approval-row" key={item.id}>
              <span aria-hidden="true">✓</span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </div>
            </div>
          ))}
          <div className="locked-private">
            <strong>원문 비공개</strong>
            <p>일기 원문은 공유 카드에 포함하지 않습니다.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
