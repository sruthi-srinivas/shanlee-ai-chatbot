import "./App.css";
import Chatbot from "./Chatbot";

function App() {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <header className="navbar">
        <div className="logo">
          <span className="logo-dot"></span> ShanLee<span>AI</span>
        </div>
        <nav className="nav-links">
          <a href="#solutions">Solutions</a>
          <a href="#crm">AI CRM</a>
          <a href="#erp">Intelligent ERP</a>
          <a href="#technology">Technology</a>
          <button className="nav-btn">Get Started</button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="hero">
        <div className="badge">Next-Generation AI Intelligence for Business</div>
        <h1 className="hero-title">
          Empowering Enterprises with <span>Autonomous CRM & ERP</span>
        </h1>
        <p className="hero-subtitle">
          Unify your customer relationships and enterprise operations with AI-first automation. From real-time sales forecasting to smart resource management, ShanLee AI redefines productivity.
        </p>

        <div className="hero-actions">
          <button className="primary-btn">Explore Solutions</button>
          <button className="secondary-btn">Book an Enterprise Demo</button>
        </div>

        {/* Enterprise Modules: CRM & ERP */}
        <section className="solutions-section" id="solutions">
          <div className="section-header">
            <h2>Core Enterprise Solutions</h2>
            <p>Built to accelerate customer growth and streamline mission-critical operations.</p>
          </div>

          <div className="solutions-grid">
            {/* AI CRM Card */}
            <div className="solution-card" id="crm">
              <div className="card-tag">Customer Intelligence</div>
              <div className="card-icon">💼</div>
              <h3>AI-Powered CRM</h3>
              <p className="card-desc">
                Transform sales and customer experiences with autonomous lead scoring, automated follow-ups, and proactive client retention models.
              </p>
              <ul className="solution-features">
                <li><span>✓</span> Automated Lead Enrichment & Smart Scoring</li>
                <li><span>✓</span> Predictive Deal Pipeline & Revenue Forecasts</li>
                <li><span>✓</span> 360° AI-Assisted Customer Interaction Logs</li>
              </ul>
            </div>

            {/* Intelligent ERP Card */}
            <div className="solution-card" id="erp">
              <div className="card-tag">Operational Automation</div>
              <div className="card-icon">📊</div>
              <h3>Intelligent Cloud ERP</h3>
              <p className="card-desc">
                Connect finance, supply chain, and human resources with self-optimizing workflows and predictive inventory management.
              </p>
              <ul className="solution-features">
                <li><span>✓</span> Automated Financial Reconciliation & Audits</li>
                <li><span>✓</span> Dynamic Supply Chain & Inventory Optimization</li>
                <li><span>✓</span> Real-Time Operational Analytics & BI Dashboards</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Real-Time Processing</h3>
            <p>Lightning-fast inference and context awareness powered by modern Gemini LLMs.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Enterprise Security</h3>
            <p>End-to-end data encryption with SOC2, GDPR, and enterprise-grade privacy safeguards.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>Seamless Integration</h3>
            <p>Effortlessly connect conversational intelligence into existing databases and workflows.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} ShanLee AI Inc. Enterprise AI, CRM & ERP Solutions. All rights reserved.</p>
      </footer>

      {/* Fixed Chatbot Assistant */}
      <Chatbot />
    </div>
  );
}

export default App;
