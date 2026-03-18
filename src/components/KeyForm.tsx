import React, { useState, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useKeys } from '../hooks/useKeys';

export const KeyForm: React.FC<{
  addKey: ReturnType<typeof useKeys>['addKey'];
}> = ({ addKey }) => {
  const [llave, setLlave] = useState('');
  const [solicitante, setSolicitante] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [shouldFocus, setShouldFocus] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const llaveInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (shouldFocus) {
      llaveInputRef.current?.focus();
      setShouldFocus(false);
    }
  }, [shouldFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);
    const result = addKey(llave, solicitante);
    
    if (result.success) {
      setLlave('');
      setSolicitante('');
      setShouldFocus(true);
    } else {
      setError(result.error || 'Error desconocido');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <h2 className="text-lg font-semibold text-utn-navy mb-4">Registrar Préstamo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="llave" className="block text-sm font-medium text-slate-700">Llave</label>
            <input
              type="text"
              id="llave"
              ref={llaveInputRef}
              value={llave}
              onChange={(e) => setLlave(e.target.value.toUpperCase())}
              placeholder="Ej: F1, F5"
              maxLength={20}
              disabled={isSubmitting}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-utn-blue focus:outline-none focus:ring-1 focus:ring-utn-blue font-mono disabled:opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="solicitante" className="block text-sm font-medium text-slate-700">Solicitante</label>
            <input
              type="text"
              id="solicitante"
              value={solicitante}
              onChange={(e) => setSolicitante(e.target.value)}
              placeholder="Nombre de quien retira"
              maxLength={50}
              disabled={isSubmitting}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-utn-blue focus:outline-none focus:ring-1 focus:ring-utn-blue disabled:opacity-50"
              required
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-200">{error}</p>}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-utn-blue hover:bg-utn-navy text-white px-4 py-2 rounded-md font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-utn-blue focus:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            {isSubmitting ? 'Registrando...' : 'Registrar'}
          </button>
        </div>
      </form>
    </div>
  );
};
