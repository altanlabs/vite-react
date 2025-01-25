import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  initializeTables,
  fetchTableRecords,
  fetchTableSchema,
  createRecord,
  updateRecord,
  deleteRecord,
  selectTableRecords,
  selectIsLoading,
  selectTableSchema,
  selectSchemaLoading,
} from "../../../redux/slices/tables.ts";
import { EditModal } from "./components/EditModal";
import { DataTable } from "./components/DataTable";
import { Record, TableSchema, Fields } from "./types";

const DatabaseExample: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedTable, setSelectedTable] = useState<string>("users");
  const [editingRecord, setEditingRecord] = useState<Record | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const records = useSelector((state: RootState) => selectTableRecords(state, selectedTable)) || [] as Record[];
  const schema = useSelector((state: RootState) => selectTableSchema(state, selectedTable)) as TableSchema | null;
  const isLoading = useSelector((state: RootState) => selectIsLoading(state));
  const schemaLoading = useSelector((state: RootState) => selectSchemaLoading(state));

  const tables = ["users", "posts"];

  useEffect(() => {
    dispatch(initializeTables());
  }, [dispatch]);

  useEffect(() => {
    if (selectedTable) {
      dispatch(fetchTableSchema({ tableName: selectedTable }));
      dispatch(fetchTableRecords({
        tableName: selectedTable,
        queryParams: { limit: 20 },
      }));
    }
  }, [dispatch, selectedTable]);

  const handleCreateNew = () => {
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record: Record) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (recordId: string) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await dispatch(
          deleteRecord({
            tableName: selectedTable,
            recordId,
          })
        );
      } catch (error) {
        console.error("Failed to delete record:", error);
      }
    }
  };

  const handleSave = async (fields: Fields) => {
    try {
      if (editingRecord) {
        await dispatch(
          updateRecord({
            tableName: selectedTable,
            recordId: editingRecord.id,
            updates: fields,
          })
        );
      } else {
        await dispatch(
          createRecord({
            tableName: selectedTable,
            record: fields,
          })
        );
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save record:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Altan DB Example</h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="font-medium">Select Table:</label>
            <select
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
              className="px-3 py-1 border rounded-md bg-background"
            >
              {tables.map((table) => (
                <option key={table} value={table}>
                  {table}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCreateNew}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Create New Record
          </button>
        </div>
      </div>

      {isLoading || schemaLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : records.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No records found
        </div>
      ) : schema ? (
        <DataTable
          records={records as Record[]}
          schema={schema as TableSchema}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : null}

      <EditModal
        record={editingRecord}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        schema={schema}
      />
    </div>
  );
};

export default DatabaseExample;
