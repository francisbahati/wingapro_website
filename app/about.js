export default function About() {
  return (
    <section className="about-page">
      <div className="container">
        <h1>About WingaPro</h1>
        <div className="about-content">
          <p>
            WingaPro is a modern digital platform dedicated to providing fast,
            affordable internet packages and quality networking devices. We believe
            everyone deserves reliable connectivity – whether at home, in the office,
            or on the go.
          </p>
          <p>
            Our mission is to simplify how you buy data and hardware. With just a
            few clicks, you can choose a plan, order a router, and get started.
            We serve only customers – no complicated business portals, just
            straightforward service.
          </p>
          <div className="features-grid">
            <div>
              <i className="fas fa-wifi"></i>
              <h4>Reliable Networks</h4>
              <p>Partnered with top ISPs for stable connections.</p>
            </div>
            <div>
              <i className="fas fa-tags"></i>
              <h4>Fair Prices</h4>
              <p>Transparent pricing with no hidden fees.</p>
            </div>
            <div>
              <i className="fas fa-headset"></i>
              <h4>Customer Support</h4>
              <p>We’re here to help you 7 days a week.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}