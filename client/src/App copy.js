import Header from "./pages/Home";

function App() {
  return (
    <div className="App flex h-screen items-center justify-center">
      <h1 className="text-5xl font-bold underline text-center text-blue-700">
        MC Portfolio
      </h1>
      <div>
        <h2 className="text-3xl font-bold text-center text-gray-700">
          Welcome to my portfolio!
        </h2>
        <p className="text-lg text-center text-gray-700">
          I am a full stack developer with a passion for learning and creating
          new things. I have experience with JavaScript, React, Node.js, and
          more. I am always looking for new opportunities to learn and grow as a
          developer.
        </p>
        <Header />
      </div>
    </div>
  );
}

export default App;
