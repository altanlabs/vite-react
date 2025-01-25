import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Record, TableSchema, TableField } from "../types.ts";

interface DataTableProps {
  records: Record[];
  schema: TableSchema | null;
  onEdit: (record: Record) => void;
  onDelete: (recordId: string) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  records,
  schema,
  onEdit,
  onDelete,
}) => {
  if (!schema) return null;

  const fields = schema.fields.items;

  // Helper function to safely get field value
  const getFieldValue = (record: Record, fieldName: string) => {
    // Handle both direct access and nested fields
    if (record[fieldName] !== undefined) {
      return record[fieldName];
    }
    return record.fields?.[fieldName] ?? '';
  };

  // Format value based on field type
  const formatValue = (value: unknown, fieldType: string) => {
    if (value === null || value === undefined) return '';
    
    switch (fieldType) {
      case 'date':
        return typeof value === 'string' ? new Date(value).toLocaleDateString() : '';
      case 'boolean':
        return value ? 'Yes' : 'No';
      case 'number':
        return Number(value).toString();
      default:
        return String(value);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {fields.map((field: TableField) => (
            <TableHead key={field.id}>{field.name}</TableHead>
          ))}
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((record) => (
          <TableRow key={record.id}>
            {fields.map((field: TableField) => (
              <TableCell key={field.id}>
                {formatValue(getFieldValue(record, field.name), field.type)}
              </TableCell>
            ))}
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => onEdit(record)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(record.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}; 