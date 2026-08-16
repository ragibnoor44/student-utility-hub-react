function About() {
  return (
    <section className="container py-5">
      <h1 className="mb-4">About This Project</h1>
      <p className="lead">
        Secure Student Utility Hub is an all-in-one student productivity
        dashboard that brings notes, tasks, and security-first design together
        in one place.
      </p>
      <p>
        This project started with HTML and CSS, and is now evolving into a full
        React application with routing, reusable components, and a
        Node.js/Express + MySQL backend.
      </p>

      <div className="row mt-5">
        <div className="col-md-6">
          <h5>Tech Stack Used</h5>
          <ul>
            <li>React (Vite)</li>
            <li>React Router</li>
            <li>Bootstrap 5</li>
            <li>Node.js</li>
            <li>Express js</li>
            <li>MySQL</li>
          </ul>
        </div>
        <div className="col-md-6">
          <h5>Built By</h5>
          <p>Ragibnoor - Final Year B.Tech CSE Student.</p>
          <a
            href="https://github.com/ragibnoor44"
            className="btn btn-outline-dark btn-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            View GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;
