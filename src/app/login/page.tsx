"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import "./page.css";

// 実際のコンポーネントをラップする内部コンポーネントを作成
function LoginContent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectPath = searchParams.get('redirect') || '/dashboard';

    // 既にログイン済みの場合はリダイレクト
    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data } = await supabase.auth.getSession();
                
                if (data.session) {
                    router.push(redirectPath);
                }
            } catch (e) {
                // エラー処理は静かに行う
            }
        };
        checkSession();
    }, [redirectPath, router]);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            const signInResult = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            
            if (signInResult.error) {
                setError(signInResult.error.message);
                throw signInResult.error;
            }
            
            const { data: { session } } = await supabase.auth.getSession();
            
            if (session) {
                router.push(redirectPath);
            } else {
                setError("セッションの確立に失敗しました");
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            setError("ログインに失敗しました。" + errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>ログイン</h1>
                    <p>管理者用</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={onSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">メールアドレス</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">パスワード</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-action">
                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >
                            {loading ? "ログイン中..." : "ログイン"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// メインコンポーネントをSuspenseでラップ
export default function Login() {
    return (
        <Suspense fallback={<div className="login-loading">読み込み中...</div>}>
            <LoginContent />
        </Suspense>
    );
}