import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { altan_db } from '../../utils/axios.ts';

// Define interfaces for the state
interface TableRecord {
  id: string;
  name: string;
}

interface TableRecordItem {
  id: string;
  fields: Record<string, unknown>;
}

interface TableRecordData {
  items: TableRecordItem[];
  total: number;
  lastUpdated: string;
}

interface LoadingState {
  tables: 'idle' | 'loading';
  records: 'idle' | 'loading';
  schemas: 'idle' | 'loading';
}

interface TableState {
  tables: {
    byId: Record<string, TableRecord>;
    byName: Record<string, string>;
    allIds: string[];
  };
  schemas: {
    byTableId: Record<string, unknown>;
  };
  records: {
    byTableId: Record<string, TableRecordData>;
  };
  loading: LoadingState;
  error: string | null;
}

// Query params interface
interface QueryParams {
  filters?: unknown[];
  sort?: unknown[];
  limit?: number;
  pageToken?: string;
}

// Initial state structure
const initialState: TableState = {
  tables: {
    byId: {},
    byName: {},
    allIds: [],
  },
  schemas: {
    byTableId: {},
  },
  records: {
    byTableId: {},
  },
  loading: {
    tables: 'idle',
    records: 'idle',
    schemas: 'idle',
  },
  error: null,
};

// INCLUDE YOUR TABLE NAMES AND IDS HERE
const SAMPLE_TABLES: Record<string, string> = {
  your_table: 'YOUR_TABLE_ID',
  your_table2: 'YOUR_TABLE_ID2',
};

// Async Thunks
export const fetchTableRecords = createAsyncThunk(
  'tables/fetchRecords',
  async ({ tableName, queryParams = {} }: { tableName: string; queryParams?: QueryParams }, { getState }) => {
    const state = getState() as { tables: TableState };
    const tableId = state.tables.tables.byName[tableName];
    if (!tableId) throw new Error(`Table ${tableName} not found`);

    const response = await altan_db.post(`/table/${tableId}/record/query`, {
      filters: queryParams.filters || [],
      sort: queryParams.sort || [],
      limit: queryParams.limit || 100,
      page_token: queryParams.pageToken,
    });

    return {
      tableId,
      records: response.data.records,
      total: response.data.total,
      nextPageToken: response.data.next_page_token,
    };
  }
);

export const createRecord = createAsyncThunk(
  'tables/createRecord',
  async ({ tableName, record }: { tableName: string; record: unknown }, { getState }) => {
    const state = getState() as { tables: TableState };
    const tableId = state.tables.tables.byName[tableName];
    if (!tableId) throw new Error(`Table ${tableName} not found`);

    const response = await altan_db.post(`/table/${tableId}/record`, {
      records: [{ fields: record }],
    });

    return {
      tableId,
      record: response.data.records[0],
    };
  }
);

export const updateRecord = createAsyncThunk(
  'tables/updateRecord',
  async ({ tableName, recordId, updates }: { tableName: string; recordId: string; updates: unknown }, { getState }) => {
    const state = getState() as { tables: TableState };
    const tableId = state.tables.tables.byName[tableName];
    if (!tableId) throw new Error(`Table ${tableName} not found`);

    const response = await altan_db.patch(`/table/${tableId}/record/${recordId}`, {
      fields: updates,
    });

    return {
      tableId,
      record: response.data.record,
    };
  }
);

export const deleteRecord = createAsyncThunk(
  'tables/deleteRecord',
  async ({ tableName, recordId }: { tableName: string; recordId: string }, { getState }) => {
    const state = getState() as { tables: TableState };
    const tableId = state.tables.tables.byName[tableName];
    if (!tableId) throw new Error(`Table ${tableName} not found`);

    await altan_db.delete(`/table/${tableId}/record/${recordId}`);

    return {
      tableId,
      recordId,
    };
  }
);

export const fetchTableSchema = createAsyncThunk(
  'tables/fetchSchema',
  async ({ tableName }: { tableName: string }, { getState }) => {
    const state = getState() as { tables: TableState };
    const tableId = state.tables.tables.byName[tableName];
    if (!tableId) throw new Error(`Table ${tableName} not found`);

    const response = await altan_db.get(`/table/${tableId}`);
    return {
      tableId,
      schema: response.data.table,
    };
  }
);

// Slice
const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    initializeTables: (state) => {
      Object.entries(SAMPLE_TABLES).forEach(([name, id]) => {
        state.tables.byId[id] = { id, name };
        state.tables.byName[name] = id;
        if (!state.tables.allIds.includes(id)) {
          state.tables.allIds.push(id);
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableRecords.pending, (state) => {
        state.loading.records = 'loading';
      })
      .addCase(fetchTableRecords.fulfilled, (state, action) => {
        const { tableId, records, total } = action.payload;
        state.records.byTableId[tableId] = {
          items: records,
          total,
          lastUpdated: new Date().toISOString(),
        };
        state.loading.records = 'idle';
      })
      .addCase(fetchTableRecords.rejected, (state, action) => {
        state.loading.records = 'idle';
        state.error = action.error.message || null;
      })
      .addCase(createRecord.fulfilled, (state, action) => {
        const { tableId, record } = action.payload;
        if (state.records.byTableId[tableId]?.items) {
          state.records.byTableId[tableId].items.push(record);
        }
      })
      .addCase(updateRecord.fulfilled, (state, action) => {
        const { tableId, record } = action.payload;
        if (state.records.byTableId[tableId]?.items) {
          const index = state.records.byTableId[tableId].items.findIndex(
            (r: TableRecordItem) => r.id === record.id
          );
          if (index !== -1) {
            state.records.byTableId[tableId].items[index] = record;
          }
        }
      })
      .addCase(deleteRecord.fulfilled, (state, action) => {
        const { tableId, recordId } = action.payload;
        if (state.records.byTableId[tableId]?.items) {
          state.records.byTableId[tableId].items = 
            state.records.byTableId[tableId].items.filter(
              (record: TableRecordItem) => record.id !== recordId
            );
        }
      })
      .addCase(fetchTableSchema.pending, (state) => {
        state.loading.schemas = 'loading';
      })
      .addCase(fetchTableSchema.fulfilled, (state, action) => {
        const { tableId, schema } = action.payload;
        state.schemas.byTableId[tableId] = schema;
        state.loading.schemas = 'idle';
      })
      .addCase(fetchTableSchema.rejected, (state, action) => {
        state.loading.schemas = 'idle';
        state.error = action.error.message || null;
      });
  },
});

// Actions
export const { initializeTables } = tablesSlice.actions;

// Selectors
export const selectTablesState = (state: { tables: TableState }) => state.tables;

export const selectTableId = (state: { tables: TableState }, tableName: string) => 
  selectTablesState(state)?.tables?.byName[tableName];

export const selectTableRecords = (state: { tables: TableState }, tableName: string) => {
  const tableId = selectTableId(state, tableName);
  return tableId ? selectTablesState(state)?.records?.byTableId[tableId]?.items || [] : [];
};

export const selectTableTotal = (state: { tables: TableState }, tableName: string) => {
  const tableId = selectTableId(state, tableName);
  return tableId ? selectTablesState(state)?.records?.byTableId[tableId]?.total || 0 : 0;
};

export const selectIsLoading = (state: { tables: TableState }) => 
  selectTablesState(state)?.loading?.records === 'loading';

export const selectTableSchema = (state: { tables: TableState }, tableName: string) => {
  const tableId = selectTableId(state, tableName);
  return tableId ? state.tables.schemas.byTableId[tableId] : null;
};

export const selectSchemaLoading = (state: { tables: TableState }) => 
  state.tables.loading.schemas === 'loading';

export default tablesSlice.reducer;