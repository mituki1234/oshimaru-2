"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabase';
import { User } from '@supabase/supabase-js';
import "@/app/dashboard/page.css";

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const getSession = async (): Promise<void> => {
            try {
                setLoading(true);
                const { data: { session }, error } = await supabase.auth.getSession();
                
                if (error) {
                    throw error;
                }
                if (session?.user) {
                    setUser(session.user);
                } else {
                    router.push('/login');
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : "不明なエラー");
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };
        getSession();
    }, [router]);

    const handleSignOut = async (): Promise<void> => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                throw error;
            }
            router.push("/login");
        } catch (error) {
            setError("ログアウトに失敗しました");
        }
    };

    if (loading) {
        return <div className="dashboard-loading">読み込み中...</div>;
    }

    return (
        <div className="dashboard-layout">
            {/* サイドバーナビゲーション */}
            <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                    <h2>おしまる</h2>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li className="active"><Link href="/dashboard">ダッシュボード</Link></li>
                        <li><Link href="/dashboard/profile">プロフィール</Link></li>
                        <li><Link href="/dashboard/messages">メッセージ</Link></li>
                        <li><Link href="/dashboard/favorites">お気に入り</Link></li>
                        <li><Link href="/dashboard/settings">設定</Link></li>
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleSignOut} className="logout-button">ログアウト</button>
                </div>
            </aside>

            {/* メインコンテンツエリア */}
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <h1>ダッシュボード</h1>
                    <div className="user-welcome">
                        <span>ようこそ、{user?.email || "ゲスト"}さん</span>
                    </div>
                </header>

                {/* ダッシュボード概要カード */}
                <div className="dashboard-cards">
                    <div className="dashboard-card">
                        <h3>お知らせ</h3>
                        <p className="card-value">3件</p>
                        <p className="card-description">未読のお知らせがあります</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>メッセージ</h3>
                        <p className="card-value">5件</p>
                        <p className="card-description">新着メッセージがあります</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>お気に入り</h3>
                        <p className="card-value">12店舗</p>
                        <p className="card-description">お気に入りのお店をチェック</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>最近の閲覧履歴</h3>
                        <p className="card-value">8件</p>
                        <p className="card-description">最近閲覧したお店</p>
                    </div>
                </div>

                {/* 最新のお知らせセクション */}
                <section className="dashboard-section">
                    <div className="section-header">
                        <h2>最新のお知らせ</h2>
                        <Link href="/dashboard/notifications" className="view-all">すべて表示</Link>
                    </div>
                    <div className="notification-list">
                        <div className="notification-item">
                            <div className="notification-date">2023/12/01</div>
                            <div className="notification-content">
                                <h4>年末キャンペーンのお知らせ</h4>
                                <p>12月のキャンペーン情報が更新されました。詳細をご確認ください。</p>
                            </div>
                        </div>
                        <div className="notification-item">
                            <div className="notification-date">2023/11/25</div>
                            <div className="notification-content">
                                <h4>システムメンテナンスのお知らせ</h4>
                                <p>12月5日の深夜にシステムメンテナンスを実施いたします。</p>
                            </div>
                        </div>
                        <div className="notification-item">
                            <div className="notification-date">2023/11/20</div>
                            <div className="notification-content">
                                <h4>新機能追加のお知らせ</h4>
                                <p>お店の検索機能が強化されました。より詳細な条件で検索できるようになりました。</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* おすすめのお店セクション */}
                <section className="dashboard-section">
                    <div className="section-header">
                        <h2>あなたへのおすすめ</h2>
                        <Link href="/dashboard/recommendations" className="view-all">すべて表示</Link>
                    </div>
                    <div className="shop-recommendations">
                        <div className="shop-card">
                            <div className="shop-image"></div>
                            <div className="shop-info">
                                <h4>和食処 さくら</h4>
                                <p>旬の食材を使った本格和食のお店</p>
                                <div className="shop-meta">
                                    <span className="shop-rating">★★★★☆ 4.2</span>
                                    <span className="shop-distance">1.2km</span>
                                </div>
                            </div>
                        </div>
                        <div className="shop-card">
                            <div className="shop-image"></div>
                            <div className="shop-info">
                                <h4>イタリアン ベラ</h4>
                                <p>本場イタリアの味が楽しめるレストラン</p>
                                <div className="shop-meta">
                                    <span className="shop-rating">★★★★★ 4.8</span>
                                    <span className="shop-distance">2.5km</span>
                                </div>
                            </div>
                        </div>
                        <div className="shop-card">
                            <div className="shop-image"></div>
                            <div className="shop-info">
                                <h4>カフェ ソラ</h4>
                                <p>落ち着いた雰囲気のカフェ＆スイーツ</p>
                                <div className="shop-meta">
                                    <span className="shop-rating">★★★★☆ 4.5</span>
                                    <span className="shop-distance">0.8km</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}