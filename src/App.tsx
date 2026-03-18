import React from 'react';
import { Route, Switch } from 'wouter';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { History } from './pages/History';
import { useKeys } from './hooks/useKeys';

const App: React.FC = () => {
  const keysLogic = useKeys();

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-utn-light">
      <Header />
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Switch>
          <Route path="/">
            <Dashboard keysLogic={keysLogic} />
          </Route>
          <Route path="/history">
            <History keysLogic={keysLogic} />
          </Route>
          <Route>
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-slate-800">404 - Página no encontrada</h2>
              <p className="text-slate-500 mt-2">La ruta que buscas no existe en este sistema.</p>
            </div>
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default App;
