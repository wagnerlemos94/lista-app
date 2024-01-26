import logo from './logo.svg';
import './App.css';
import { Suspense } from 'react';
import Router from './services/Router';

function App() {
  return (
    <Suspense>
      <Router />
    </Suspense>
  );
}

export default App;
