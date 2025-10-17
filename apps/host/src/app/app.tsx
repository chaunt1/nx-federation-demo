import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';
import { AngularWrapper } from './angular-wrapper';

const DashboardModule = React.lazy(() =>
  // @ts-ignore
  import('dashboard/Module').then((module: any) => ({
    default: () => (
      <AngularWrapper
        mountFn={module.mountAngularComponent}
        elementName="dashboard"
      />
    ),
  }))
);

export function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="host" />} />
        <Route path="/dashboard" element={<DashboardModule />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
