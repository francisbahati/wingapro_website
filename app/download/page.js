export default function Download() {
  return (
    <section className="download-page">
      <div className="container">
        <div className="download-content">
          <h1>Get the WingaPro App</h1>
          <p>
            Download our official Android APK and enjoy faster browsing,
            exclusive offers, and easy package management – all from your phone.
          </p>
          <div className="download-buttons">
            <a
              href="/apk/wingapro.apk"
              download
              className="download-btn"
            >
              <i className="fas fa-download"></i>
              <span>
                <small>Download APK</small>
                <strong>Version 2.0.1</strong>
              </span>
            </a>
          </div>
          <p className="note">
            <i className="fas fa-shield-alt"></i> Secure & verified – install with confidence.
          </p>
        </div>
        <div className="download-visual">
          <div className="phone-mock">
            <i className="fas fa-mobile-alt"></i>
            <p>Scan QR to download</p>
            <div className="qr-placeholder">
              <i className="fas fa-qrcode"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}