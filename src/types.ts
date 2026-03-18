export type KeyStatus = 'ACTIVO' | 'DEVUELTO' | 'EDITADO';

export interface KeyEntry {
  id: string; // uuid
  llave: string; // F1, F2, etc. uppercase
  solicitante: string;
  quienDevuelve: string | null;
  fechaPrestamo: string; // ISO date string
  fechaDevolucion: string | null; // ISO date string
  estado: KeyStatus;
}

export interface JornadaTurno {
  fecha: string; // YYYY-MM-DD
  turnos: KeyEntry[];
}
