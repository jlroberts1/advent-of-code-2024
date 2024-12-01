import Problems from "./components/problems";

function App() {
  return (
    <div className="min-h-screen py-8">
      <div className="container justify-center mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6">Advent of Code 2024</h1>
        <Problems />
      </div>
    </div>
  );
}

export default App;
