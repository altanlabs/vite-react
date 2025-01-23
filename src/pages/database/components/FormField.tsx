import React from "react";
import { TableField } from "../types.ts";

interface FormFieldProps {
  field: TableField;
  value: unknown;
  onChange: (value: unknown) => void;
}

export const FormField: React.FC<FormFieldProps> = ({ field, value, onChange }) => {
  const getInputType = () => {
    switch (field.type) {
      case 'email':
        return 'email';
      case 'date':
        return 'date';
      case 'number':
        return 'number';
      case 'checkbox':
        return 'checkbox';
      default:
        return 'text';
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">
        {field.name} {field.not_null && <span className="text-red-500">*</span>}
      </label>
      <input
        type={getInputType()}
        value={typeof value === 'string' ? value : ''}
        onChange={(e) => onChange(e.target.value)}
        required={field.not_null}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}; 