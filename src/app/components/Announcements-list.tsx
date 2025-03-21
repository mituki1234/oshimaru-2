import "@/app/components/components.css";

export default function AnnouncementsList() {
    return (
        <section className="announcements">
            <div className="section-title">
                <h1>お知らせ</h1>
            </div>
            <div className="announcements-list">
                <div className="announcement-item">
                    <div className="announcement-date">2023/11/15</div>
                    <div className="announcement-content">
                        <h3>【イベント】冬の地域グルメフェア開催のお知らせ</h3>
                        <p>12月1日から3日間、市民広場にて冬の地域グルメフェアを開催します。地元のお店が多数出店予定です。</p>
                    </div>
                </div>
                <div className="announcement-item">
                    <div className="announcement-date">2023/11/01</div>
                    <div className="announcement-content">
                        <h3>【お知らせ】サイトリニューアルのお知らせ</h3>
                        <p>おしまるのウェブサイトが新しくなりました。より使いやすく、情報も充実しています。</p>
                    </div>
                </div>
            </div>
            <div className="view-more">
                <a href="/announcements" className="secondary-btn"><span>お知らせ一覧</span></a>
            </div>
        </section>
    )
}