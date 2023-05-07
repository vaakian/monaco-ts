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
  const { progress, finished, total } = useProgress();
  return (
    <>
      <p>
        load status: <LoadingStatus value={finished} />
      </p>
      <p>
        loaded `d.ts` file:{' '}
        <span style={{ color: 'green', fontWeight: 'bold' }}>
          {progress} / {total} (
          {total !== 0 ? `${((progress / total) * 100).toFixed(2)}%` : '0%'})
        </span>
      </p>
    </>
  );
}

export default App;
