import { adder } from "@/util";

function App() {
  const sum = adder(1, 2);
  return (
    <div className="min-h-screen bg-orange-400 flex items-center justify-center flex-col gap-12">
      <h1 className="font-bold text-4xl text-purple-800">Heyy :)</h1>
      <p>{sum}</p>
    </div>
  );
}

export default App;
