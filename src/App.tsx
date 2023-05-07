import './App.css';
import TheEditor from './TheEditor';

function App() {
  return (
    <div className="container">
      <h2>Monaco Editor with <code>`TypeScript`</code> acquisition</h2>
      <TheEditor />
      <footer>
        made by <a href="https://twitter.com/vaakianX">@vaakian</a> on{' '}
        <a href="https://github.com/vaakian">Github</a>
      </footer>
    </div>
  );
}

export default App;
