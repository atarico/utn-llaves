import React, { useState, useMemo } from 'react';
import { Search, Edit2, CornerDownLeft } from 'lucide-react';
import { format } from 'date-fns';
import { useKeys } from '../hooks/useKeys';
import { Badge } from './Badge';
import { EditModal } from './EditModal';
import { HandoverModal } from './HandoverModal';
import { sortKeysNatural } from '../utils/sort';
import type { KeyEntry } from '../types';

export const KeyTable: React.FC<{
  activeKeys: ReturnType<typeof useKeys>['activeKeys'];
  editKey: ReturnType<typeof useKeys>['editKey'];
  returnKey: ReturnType<typeof useKeys>['returnKey'];
}> = ({ activeKeys, editKey, returnKey }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [editingEntry, setEditingEntry] = useState<KeyEntry | null>(null);
  const [returningEntry, setReturningEntry] = useState<KeyEntry | null>(null);

  const filteredAndSortedKeys = useMemo(() => {
    return activeKeys
      .filter(k => 
        k.llave.toLowerCase().includes(searchTerm.toLowerCase()) || 
        k.solicitante.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => sortKeysNatural(a.llave, b.llave));
  }, [activeKeys, searchTerm]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-utn-navy">Llaves Activas</h2>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-400 focus:outline-none focus:placeholder-slate-300 focus:ring-1 focus:ring-utn-blue focus:border-utn-blue sm:text-sm transition duration-150 ease-in-out"
            placeholder="Buscar por llave o solicitante..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Llave</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Solicitante</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Hora Préstamo</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Estado</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filteredAndSortedKeys.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No hay llaves activas que coincidan con la búsqueda.
                </td>
              </tr>
            ) : (
              filteredAndSortedKeys.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-utn-navy font-mono">
                    {entry.llave}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                    {entry.solicitante}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {format(new Date(entry.fechaPrestamo), 'HH:mm')} hs
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge status={entry.estado} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingEntry(entry)}
                        className="text-amber-600 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 p-1.5 rounded-md transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setReturningEntry(entry)}
                        className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 p-1.5 rounded-md transition-colors"
                        title="Devolver"
                      >
                        <CornerDownLeft className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editingEntry && (
        <EditModal
          entry={editingEntry}
          isOpen={!!editingEntry}
          onOpenChange={(open) => !open && setEditingEntry(null)}
          onEdit={editKey}
        />
      )}
      
      {returningEntry && (
        <HandoverModal
          entry={returningEntry}
          isOpen={!!returningEntry}
          onOpenChange={(open) => !open && setReturningEntry(null)}
          onReturn={returnKey}
        />
      )}
    </div>
  );
};
