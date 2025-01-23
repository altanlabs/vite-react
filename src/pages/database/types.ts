export interface TableField {
  id: string;
  name: string;
  type: string;
  cell_value_type: string;
  not_null: boolean;
  unique: boolean;
  order: number;
  options?: {
    required?: boolean;
    date_options?: {
      time_zone: string;
      date_format: string;
    };
  };
}

export interface TableSchema {
  id: string;
  name: string;
  fields: {
    items: TableField[];
  };
  views: {
    items: unknown[];
  };
}

export interface Fields {
  [key: string]: string | number | boolean;
}

export interface Record {
  id: string;
  fields: Fields;
  [key: string]: unknown; // Allow string indexing for direct access
}

export interface DataTableProps {
  records: Record[];
  schema: TableSchema | null;
  onEdit: (record: Record) => void;
  onDelete: (recordId: string) => void;
}