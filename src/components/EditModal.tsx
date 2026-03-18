import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import type { KeyEntry } from '../types';

interface EditModalProps {
  entry: KeyEntry;
  onEdit: (id: string, newLlave: string, newSolicitante: string) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditModal: React.FC<EditModalProps> = ({ entry, onEdit, isOpen, onOpenChange }) => {
  const [llave, setLlave] = useState(entry.llave);
  const [solicitante, setSolicitante] = useState(entry.solicitante);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLlave(entry.llave);
      setSolicitante(entry.solicitante);
    }
  }, [isOpen, entry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    onEdit(entry.id, llave, solicitante);
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <Dialog.Title className="text-lg font-semibold leading-none tracking-tight text-utn-navy">
              Editar Registro
            </Dialog.Title>
            <Dialog.Description className="text-sm text-slate-500">
              Modifica los datos del préstamo activo. Al guardar, el estado pasará a "EDITADO".
            </Dialog.Description>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="edit-llave" className="text-sm font-medium leading-none">
                Llave
              </label>
              <input
                id="edit-llave"
                type="text"
                value={llave}
                onChange={(e) => setLlave(e.target.value.toUpperCase())}
                required
                maxLength={20}
                disabled={isSubmitting}
                className="font-mono flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-utn-blue focus:border-utn-blue disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="edit-solicitante" className="text-sm font-medium leading-none">
                Solicitante
              </label>
              <input
                id="edit-solicitante"
                type="text"
                value={solicitante}
                onChange={(e) => setSolicitante(e.target.value)}
                required
                maxLength={50}
                disabled={isSubmitting}
                className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-utn-blue focus:border-utn-blue disabled:opacity-50"
              />
            </div>
            
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <Dialog.Close asChild>
                <button type="button" className="mt-2 sm:mt-0 inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
                  Cancelar
                </button>
              </Dialog.Close>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-md bg-utn-blue px-4 py-2 text-sm font-medium text-white hover:bg-utn-navy focus:outline-none focus:ring-2 focus:ring-utn-blue focus:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </form>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
