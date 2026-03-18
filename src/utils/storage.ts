import type { JornadaTurno } from '../types';

const STORAGE_KEY = 'utn_llaves_jornadas';

export const getJornadas = (): JornadaTurno[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading localStorage:', error);
    return [];
  }
};

export const saveJornadas = (jornadas: JornadaTurno[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jornadas));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};
