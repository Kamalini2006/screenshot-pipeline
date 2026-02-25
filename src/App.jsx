function App(){
  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.nav}>
        <h2 style={{margin: 0 }}>Screenshot Pipeline</h2>
        <div style={styles.links}>
          <a href="#">Home</a>
          <a href="#">About</a>
        </div>
      </nav>

      {/* Main Content */}
      <div style={styles.content}>

      {/* Hero Section */}
      <section style={styles.hero}>
        <h1>Automate your Sreenshot Workflow</h1>
        <p>Capture, process and manage screenshots efficiently with our smart pipeline solution.</p>
        <button style={styles.button}>Start Now</button>
      </section>

      {/* Features */}
      <section style={styles.features}>
        <div style={styles.card}>
          <h3>Fast Procesing</h3>
          <p>Automatically process screenshots in seconds.</p>
        </div>

        <div style={styles.card}>
          <h3>Cloud Storage</h3>
          <p>Securely store and access your screenshots anywhere.</p>
        </div>

        <div style={styles.card}>
          <h3>Easy Integeration</h3>
          <p>Integerates smoothly with your existing tools.</p>
        </div>
      </section>

      </div>

      {/*Footer */}
      <footer style={styles.footer}>
        <p>kamalini Tirukkovalluri © 2026 | Built with React</p>
      </footer>
    </div>
  ); 
}

const styles={
  page: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "#111",
    color: "white",
  },
  links:{
    display: "flex",
    gap: "20px",
  },
  hero: {
    textAlign: "center",
    padding: "100px 20px",
  },
  button: {
    padding: "10px 20px",
    marginTop: "20px",
    border: "none",
    background: "#111",
    color: "white",
    cursor: "pointer",
  },
  features: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    padding: "80px 20px",
  },
  card: {
    padding : "20px",
    width: "250px",
    boarder: "1px solid #ddd",
    boarderRadius: "8px",
    textAlign: "center",
  },
  footer: {
    textAlign: "center",
    padding: "15px",
    background: "#f4f4f4",
  },
};

export default App;