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
    // Basic sanitization: remove HTML-like tags to prevent XSS and deep trim
    const sanitizedSolicitante = solicitante.replace(/[<>]/g, '').trim();
    const uppercaseLlave = llave.replace(/[<>]/g, '').toUpperCase().trim();
    
    // Data Integrity: length and format validation
    if (!uppercaseLlave) return { success: false, error: 'La llave no puede estar vacía' };
    if (uppercaseLlave.length > 20) return { success: false, error: 'La llave excede la longitud máxima (20)' };
    if (!/^[A-Z0-9\s-]+$/.test(uppercaseLlave)) {
      return { success: false, error: 'Formato de llave inválido (solo letras, números, espacios y guiones)' };
    }

    if (!sanitizedSolicitante) return { success: false, error: 'El solicitante no puede estar vacío' };
    if (sanitizedSolicitante.length > 50) return { success: false, error: 'El nombre excede la longitud máxima (50)' };

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
      solicitante: sanitizedSolicitante,
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
            quienDevuelve: quienDevuelve.replace(/[<>]/g, '').trim() || t.solicitante,
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
            llave: newLlave.replace(/[<>]/g, '').toUpperCase().trim(),
            solicitante: newSolicitante.replace(/[<>]/g, '').trim(),
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
