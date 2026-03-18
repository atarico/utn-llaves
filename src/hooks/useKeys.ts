import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import type { JornadaTurno, KeyEntry } from '../types';
import { getJornadas, saveJornadas } from '../utils/storage';

export const useKeys = () => {
  const [jornadas, setJornadas] = useState<JornadaTurno[]>([]);

  // Load initial data
  useEffect(() => {
    setJornadas(getJornadas());
  }, []);

  // Sync to storage when state changes
  useEffect(() => {
    saveJornadas(jornadas);
  }, [jornadas]);

  const addKey = useCallback((llave: string, solicitante: string): { success: boolean, error?: string } => {
    const uppercaseLlave = llave.toUpperCase().trim();
    if (!uppercaseLlave) return { success: false, error: 'La llave no puede estar vacía' };
    if (!solicitante.trim()) return { success: false, error: 'El solicitante no puede estar vacío' };

    // Check if key is already active
    const isAlreadyActive = jornadas.some(j => 
      j.turnos.some(t => t.llave === uppercaseLlave && (t.estado === 'ACTIVO' || t.estado === 'EDITADO'))
    );

    if (isAlreadyActive) {
      return { success: false, error: `La llave ${uppercaseLlave} ya se encuentra activa.` };
    }

    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const newEntry: KeyEntry = {
      id: uuidv4(),
      llave: uppercaseLlave,
      solicitante: solicitante.trim(),
      quienDevuelve: null,
      fechaPrestamo: new Date().toISOString(),
      fechaDevolucion: null,
      estado: 'ACTIVO',
    };

    setJornadas(prev => {
      const clone = [...prev];
      const todayJornadaIndex = clone.findIndex(j => j.fecha === todayStr);

      if (todayJornadaIndex >= 0) {
        // Create a new jornada object to trigger react render
        const updatedJornada = {
          ...clone[todayJornadaIndex],
          turnos: [...clone[todayJornadaIndex].turnos, newEntry]
        };
        clone[todayJornadaIndex] = updatedJornada;
      } else {
        clone.unshift({ fecha: todayStr, turnos: [newEntry] });
      }

      return clone;
    });

    return { success: true };
  }, [jornadas]);

  const returnKey = useCallback((id: string, quienDevuelve: string) => {
    setJornadas(prev => prev.map(j => ({
      ...j,
      turnos: j.turnos.map(t => {
        if (t.id === id) {
          return {
            ...t,
            quienDevuelve: quienDevuelve.trim() || t.solicitante,
            fechaDevolucion: new Date().toISOString(),
            estado: 'DEVUELTO'
          };
        }
        return t;
      })
    })));
  }, []);

  const editKey = useCallback((id: string, newLlave: string, newSolicitante: string) => {
    setJornadas(prev => prev.map(j => ({
      ...j,
      turnos: j.turnos.map(t => {
        if (t.id === id) {
          return {
            ...t,
            llave: newLlave.toUpperCase().trim(),
            solicitante: newSolicitante.trim(),
            estado: 'EDITADO'
          };
        }
        return t;
      })
    })));
  }, []);

  // Filter out the active keys
  const activeKeys = jornadas.flatMap(j => j.turnos).filter(t => t.estado === 'ACTIVO' || t.estado === 'EDITADO');

  return {
    jornadas,
    activeKeys,
    addKey,
    returnKey,
    editKey,
  };
};
