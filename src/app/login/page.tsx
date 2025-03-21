"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import "./page.css";

// デバッグ情報を表示するコンポーネント
function DebugInfo({ data }: { data: Record<string, any> }) {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <div className="debug-panel" style={{ margin: '10px 0', padding: '10px', border: '1px dashed #ccc' }}>
            <button 
                onClick={() => setIsVisible(!isVisible)}
                style={{ marginBottom: '10px', padding: '5px 10px' }}
            >
                {isVisible ? 'デバッグ情報を隠す' : 'デバッグ情報を表示'}
            </button>
            {isVisible && (
                <pre style={{ background: '#f5f5f5', padding: '10px', overflowX: 'auto' }}>
                    {JSON.stringify(data, null, 2)}
                </pre>
            )}
        </div>
    );
}

// 実際のコンポーネントをラップする内部コンポーネントを作成
function LoginContent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [debugData, setDebugData] = useState({});
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectPath = searchParams.get('redirect') || '/dashboard';

    // 既にログイン済みの場合はリダイレクト
    useEffect(() => {
        const checkSession = async () => {
            console.log("セッションチェック開始");
            try {
                const { data, error } = await supabase.auth.getSession();
                console.log("セッション取得結果:", { data, error });
                
                // デバッグデータを更新
                setDebugData(prev => ({ 
                    ...prev, 
                    sessionCheck: { 
                        timestamp: new Date().toISOString(),
                        session: data.session,
                        error
                    } 
                }));
                
                if (data.session) {
                    console.log("有効なセッションを検出、リダイレクト先:", redirectPath);
                    router.push(redirectPath);
                } else {
                    console.log("セッションなし、ログインフォームを表示");
                }
            } catch (e) {
                console.error("セッションチェックエラー:", e);
                setDebugData(prev => ({ 
                    ...prev, 
                    sessionCheckError: { 
                        timestamp: new Date().toISOString(),
                        error: e instanceof Error ? e.message : String(e)
                    } 
                }));
            }
        };
        checkSession();
    }, [redirectPath, router]);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        console.log("ログイン処理開始:", { email });
        
        try {
            console.log("Supabaseによる認証開始");
            const signInResult = await supabase.auth.signInWithPassword({
            email,
            password,
            });
            
            console.log("サインイン結果:", signInResult);
            setDebugData(prev => ({ 
            ...prev, 
            signInAttempt: { 
                timestamp: new Date().toISOString(),
                result: signInResult 
            } 
            }));
            
            if (signInResult.error) {
            console.error("サインインエラー:", signInResult.error);
            setError(signInResult.error.message);
            throw signInResult.error;
            }
            
            // セッションが確実に設定されたか確認する
            console.log("セッション確認中...");
            const { data: { session } } = await supabase.auth.getSession();
            console.log("確認後のセッション:", session);
            
            setDebugData(prev => ({ 
            ...prev, 
            sessionAfterSignIn: { 
                timestamp: new Date().toISOString(),
                session
            } 
            }));
            
            if (session) {
            console.log("認証成功、リダイレクト先:", redirectPath);
            router.push(redirectPath);
            } else {
            console.error("セッションの確立に失敗");
            setError("セッションの確立に失敗しました");
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            console.error("ログイン処理エラー:", err);
            setDebugData(prev => ({ 
            ...prev, 
            loginError: { 
                timestamp: new Date().toISOString(),
                error: errorMessage
            } 
            }));
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
                
                {/* 開発環境でのみデバッグ情報を表示 */}
                <DebugInfo data={debugData} />
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