import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Switch from '@radix-ui/react-switch';
import type { KeyEntry } from '../types';

interface HandoverModalProps {
  entry: KeyEntry;
  onReturn: (id: string, quienDevuelve: string) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const HandoverModal: React.FC<HandoverModalProps> = ({ entry, onReturn, isOpen, onOpenChange }) => {
  const [isOtherPerson, setIsOtherPerson] = useState(false);
  const [quienDevuelve, setQuienDevuelve] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-complete or clear based on switch
  const handleSwitchChange = (checked: boolean) => {
    setIsOtherPerson(checked);
    if (!checked) {
      setQuienDevuelve(entry.solicitante);
    } else {
      setQuienDevuelve('');
    }
  };

  // Reset state when opened
  React.useEffect(() => {
    if (isOpen) {
      setIsOtherPerson(false);
      setQuienDevuelve(entry.solicitante);
    }
  }, [isOpen, entry.solicitante]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    onReturn(entry.id, quienDevuelve);
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <Dialog.Title className="text-lg font-semibold leading-none tracking-tight text-utn-navy">
              Devolver Llave {entry.llave}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-slate-500">
              Registra la devolución de la llave retirada por {entry.solicitante}.
            </Dialog.Description>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <label htmlFor="other-person" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                ¿La devuelve otra persona?
              </label>
              <Switch.Root
                id="other-person"
                checked={isOtherPerson}
                onCheckedChange={handleSwitchChange}
                className="peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-utn-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-utn-blue data-[state=unchecked]:bg-slate-200"
              >
                <Switch.Thumb className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
              </Switch.Root>
            </div>

            <div className="space-y-2">
              <label htmlFor="quienDevuelve" className="text-sm font-medium leading-none">
                Nombre de quien devuelve
              </label>
              <input
                id="quienDevuelve"
                type="text"
                value={quienDevuelve}
                onChange={(e) => setQuienDevuelve(e.target.value)}
                readOnly={!isOtherPerson}
                required
                maxLength={50}
                disabled={isSubmitting}
                className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-utn-blue focus:border-utn-blue disabled:cursor-not-allowed disabled:opacity-50 read-only:bg-slate-50"
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
                {isSubmitting ? 'Registrando...' : 'Confirmar Devolución'}
              </button>
            </div>
          </form>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
