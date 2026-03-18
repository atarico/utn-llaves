import type { JornadaTurno } from '../types';

const STORAGE_KEY = 'utn_llaves_jornadas';

export const getJornadas = (): JornadaTurno[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const parsed = JSON.parse(data);
    // Schema Validation: Ensure the root object is an array to prevent crashes
    if (!Array.isArray(parsed)) {
      console.warn('Storage data corrupted (not an array), resetting to empty array.');
      return [];
    }
    
    return parsed;
  } catch (error) {
    console.error('Error reading localStorage:', error);
    return [];
  }
};

export const saveJornadas = (jornadas: JornadaTurno[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jornadas));
  } catch (error: unknown) {
    // Handling QuotaExceededError avoiding silent fails
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      alert('Error: Espacio en disco local insuficiente. No se pueden guardar más llaves.');
    }
    console.error('Error writing to localStorage:', error);
  }
};

export const exportToJSON = (): void => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      alert('No hay datos para exportar.');
      return;
    }
    
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup_llaves_utn.json';
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al exportar JSON:', error);
    alert('Ocurrió un error al intentar exportar los datos.');
  }
};
