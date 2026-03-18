import React from 'react';
import { useKeys } from '../hooks/useKeys';
import { KeyForm } from '../components/KeyForm';
import { KeyTable } from '../components/KeyTable';

export const Dashboard: React.FC<{
  keysLogic: ReturnType<typeof useKeys>;
}> = ({ keysLogic }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 border border-slate-200 shadow-sm rounded-lg bg-white overflow-hidden">
          <KeyForm addKey={keysLogic.addKey} />
        </div>
        <div className="lg:col-span-2 border border-slate-200 shadow-sm rounded-lg bg-white overflow-hidden">
          <KeyTable 
            activeKeys={keysLogic.activeKeys}
            editKey={keysLogic.editKey}
            returnKey={keysLogic.returnKey}
          />
        </div>
      </div>
    </div>
  );
};
