import "@/app/components/components.css";

export default function Features() {
    return (
        <div className="features">
        <div className="feature-title">
          <h1>おしまるとは</h1>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-image">
            <span>✓</span>
            </div>
            <h3>地元のお店を応援</h3>
            <p>地元のお店を応援するための情報を提供します。</p>
          </div>
          <div className="feature-card">
            <div className="feature-image">
              <span>✓</span>
            </div>
            <h3>地元のお店を応援</h3>
            <p>地元のお店を応援するための情報を提供します。</p>
          </div>
          <div className="feature-card">
            <div className="feature-image">
              <span>✓</span>
            </div>
            <h3>地元のお店を応援</h3>
            <p>地元のお店を応援するための情報を提供します。</p>
          </div>
        </div>
      </div>
    )
}