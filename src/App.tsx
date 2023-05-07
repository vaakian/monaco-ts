import './App.css';
import TheEditor from './TheEditor';
import { useProgress } from './TheEditor/setupEditor';
import LoadingStatus from './loadingStatus';

function App() {
  return (
    <div className="container">
      <h2>
        Monaco Editor with <code>`TypeScript`</code> acquisition
      </h2>
      <TheEditor />
      <StatusBar />
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer>
      made by <a href="https://twitter.com/vaakianX">@vaakian</a> on{' '}
      <a href="https://github.com/vaakian">Github</a>
    </footer>
  );
}

function StatusBar() {
  const { progress, finished } = useProgress();
  return (
    <>
      <p>
        load status: <LoadingStatus value={finished} />
      </p>
      <p>
        loaded `d.ts` file count:{' '}
        <span style={{ color: 'green', fontWeight: 'bold' }}>{progress}</span>
      </p>
    </>
  );
}

export default App;
