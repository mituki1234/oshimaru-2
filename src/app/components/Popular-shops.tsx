export default function PopularShops() {
    return (
        <section className="popular-shops">
            <div className="section-title">
                <h1>人気のお店</h1>
            </div>
            <div className="shops-grid">
                <div className="shop-card">
                    <div className="shop-image">
                        <div className="placeholder-image"></div>
                    </div>
                    <h3>カフェ おしまる</h3>
                    <p>季節の食材を使った料理が楽しめる地元で人気のカフェです。</p>
                    <a href="/shop/1" className="shop-btn">詳細を見る</a>
                </div>
                <div className="shop-card">
                    <div className="shop-image">
                        <div className="placeholder-image"></div>
                    </div>
                    <h3>和食処 まるよし</h3>
                    <p>伝統的な和食から創作料理まで、幅広いメニューを提供しています。</p>
                    <a href="/shop/2" className="shop-btn">詳細を見る</a>
                </div>
                <div className="shop-card">
                    <div className="shop-image">
                        <div className="placeholder-image"></div>
                    </div>
                    <h3>八百屋 新鮮館</h3>
                    <p>地元農家から直接仕入れた新鮮な野菜や果物を販売しています。</p>
                    <a href="/shop/3" className="shop-btn">詳細を見る</a>
                </div>
            </div>
        </section>
    )
}