import React from 'react';
import { BeautyTreatment } from '@/data/services/beautyTreatments';
import { beautyTreatmentProcedures } from '@/data/beautyTreatmentsSection';

export const renderTreatmentSteps = (treatmentId: string) => {
  const procedure = beautyTreatmentProcedures[treatmentId];
  if (!procedure) return null;

  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-900 mb-3">Kako izgleda tretman</h4>
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="space-y-3">
          {procedure.steps.map((step) => (
            <div key={step.number} className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center mr-3 mt-0.5 shadow-sm ring-1 ring-slate-200/50">
                <span className="text-xs font-semibold text-slate-700">{step.number}</span>
              </div>
              <span className="text-gray-600 text-sm">{step.description}</span>
            </div>
          ))}
        </div>
        
        {/* Warnings */}
        {procedure.warnings && procedure.warnings.length > 0 && (
          <div className="mt-4 space-y-3">
            {procedure.warnings.map((warning, index) => (
              <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm font-medium">{warning}</p>
              </div>
            ))}
          </div>
        )}
        
        {/* Gifts */}
        {procedure.gifts && procedure.gifts.length > 0 && (
          <div className="mt-4 space-y-3">
            {procedure.gifts.map((gift, index) => (
              <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm font-medium">{gift}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const renderTreatmentContent = (treatment: BeautyTreatment) => {
  return (
    <div className="space-y-6">
      {/* Procedure Steps */}
      {renderTreatmentSteps(treatment.id)}

      {/* Pricing */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-3">Cijena</h4>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">{treatment.price}</div>
            <div className="text-gray-600 text-sm mb-2">Trajanje: {treatment.duration}</div>
            <p className="text-gray-600 text-sm">
              Za detaljne informacije i rezervacije, slobodno nas kontaktirajte
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 