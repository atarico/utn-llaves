import React from 'react';
import { Link, useRoute } from 'wouter';
import { KeyRound, History, Download } from 'lucide-react';
import { exportToJSON } from '../utils/storage';

export const Header: React.FC = () => {
  const [isDashboard] = useRoute('/');
  const [isHistory] = useRoute('/history');

  return (
    <header className="bg-utn-navy text-white shadow-md print:hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <KeyRound className="h-6 w-6 text-utn-light" />
            <h1 className="text-xl font-bold tracking-tight">UTN Llaves</h1>
          </div>
          
          <nav className="flex space-x-4">
            <Link 
              href="/"
              className={`px-3 py-2 rounded-md font-medium text-sm transition-colors ${
                isDashboard ? 'bg-utn-blue text-white' : 'text-gray-300 hover:bg-utn-blue/50 hover:text-white'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              href="/history"
              className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium text-sm transition-colors ${
                isHistory ? 'bg-utn-blue text-white' : 'text-gray-300 hover:bg-utn-blue/50 hover:text-white'
              }`}
            >
              <History className="w-4 h-4" />
              Historial
            </Link>
            <button
              onClick={exportToJSON}
              className="flex items-center gap-2 px-3 py-2 rounded-md font-medium text-sm transition-colors text-white bg-green-600 hover:bg-green-500"
              title="Exportar Backup JSON"
            >
              <Download className="w-4 h-4" />
              Backup
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
