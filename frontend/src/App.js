import './App.css';
import Description from './Description';
import Upload from './Upload';
import Links from './Links';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Rapid Study</h1>
      </header>

      <main>
        <Description />
        <Upload />
        <Links />
      </main>
    </div>
  );
}

export default App;
