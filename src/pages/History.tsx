import React, { useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import { Calendar, Clock, User } from 'lucide-react';
import { useKeys } from '../hooks/useKeys';
import { Badge } from '../components/Badge';

export const History: React.FC<{
  keysLogic: ReturnType<typeof useKeys>;
}> = ({ keysLogic }) => {
  // Sort jornadas from newest to oldest
  const sortedJornadas = useMemo(() => {
    return [...keysLogic.jornadas].sort(
      (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
    );
  }, [keysLogic.jornadas]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {sortedJornadas.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-slate-200 shadow-sm">
          <p className="text-slate-500">No hay registros de jornadas anteriores.</p>
        </div>
      ) : (
        sortedJornadas.map((jornada) => (
          <div key={jornada.fecha} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-utn-navy" />
              <h2 className="text-lg font-semibold text-utn-navy">
                {format(parseISO(jornada.fecha), 'dd/MM/yyyy')}
              </h2>
            </div>
            <div className="p-6">
              {jornada.turnos.length === 0 ? (
                <p className="text-slate-500 text-sm italic">Sin operaciones registradas este día.</p>
              ) : (
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                  {/* Timeline representation */}
                  {jornada.turnos.map((turno, i) => (
                    <div key={turno.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      {/* Icon */}
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <Clock className="w-4 h-4" />
                      </div>
                      
                      {/* Card Content */}
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-lg border border-slate-200 shadow-sm transition-shadow hover:shadow-md">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-mono font-bold text-lg text-utn-navy">{turno.llave}</span>
                          <Badge status={turno.estado} />
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-slate-600">
                            <User className="w-4 h-4 text-slate-400" />
                            <span>Retiró: <span className="font-medium text-slate-900">{turno.solicitante}</span></span>
                            <span className="text-xs text-slate-500 ml-auto">
                              {format(new Date(turno.fechaPrestamo), 'HH:mm')}
                            </span>
                          </div>
                          
                          {turno.fechaDevolucion && turno.quienDevuelve && (
                            <div className="flex items-center gap-2 text-slate-600 border-t border-slate-100 pt-2 mt-2">
                              <User className="w-4 h-4 text-slate-400" />
                              <span>Devolvió: <span className="font-medium text-slate-900">{turno.quienDevuelve}</span></span>
                              <span className="text-xs text-slate-500 ml-auto flex gap-1 items-center">
                                {format(new Date(turno.fechaDevolucion), 'HH:mm')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
