# Welcome to your Altan project

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Project Structure

The project includes several key examples and components:

### Database Example (`/dashboard/database`)
A complete CRUD interface for Altan DB tables that demonstrates:
- Dynamic table schema handling
- Record creation, reading, updating, and deletion
- Form generation based on table schemas
- Data formatting and validation

Example usage:
```typescript
// Fetching table records
dispatch(fetchTableRecords({
  tableName: "users",
  queryParams: { limit: 20 }
}));

// Creating a record
dispatch(createRecord({
  tableName: "users",
  record: {
    username: "john_doe",
    email: "john@example.com"
  }
}));
```

### Dashboard Example (`/dashboard`)
A responsive dashboard layout featuring:
- Multiple chart types using Recharts
- Card-based layout
- Activity feeds
- Quick action buttons

### Redux Store Structure
The application uses Redux for state management:
```javascript
const initialState = {
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
```

### Available Tables
The application comes with pre-configured tables:
```javascript
const SAMPLE_TABLES = {
  users: '1b52a5c4-ce93-4790-aa2a-d186daa2068d',
  posts: 'd8812981-b246-4de4-8ef9-40fa8a7dbbda',
};
```

## Database Structure and Setup

### Table Structure
When creating new tables, follow this structure for compatibility with the existing components:

```typescript
// Example table schema structure
{
    "table": {
        "base_id": "your_base_id",
        "name": "TableName",
        "version": 1,
        "order": 1.0,
        "fields": {
            "items": [
                {
                    "name": "field_name",
                    "type": "singleLineText", // Available types: singleLineText, email, date, number, etc.
                    "cell_value_type": "string",
                    "is_multiple_cell_value": false,
                    "not_null": false,
                    "unique": false,
                    "order": 1.0
                }
            ]
        }
    }
}
```

### Setting Up New Tables

1. First, add your table ID to the `SAMPLE_TABLES` object in `src/redux/slices/tables.js`:
```javascript
const SAMPLE_TABLES = {
  users: '1b52a5c4-ce93-4790-aa2a-d186daa2068d',
  posts: 'd8812981-b246-4de4-8ef9-40fa8a7dbbda',
  // Add your new table:
  your_table: 'your-table-uuid'
};
```

2. Ensure your table schema includes these required fields:
- `id` - Primary key
- `created_time` - Timestamp
- `last_modified_time` - Timestamp
- `last_modified_by` - User reference

### Supported Field Types
The components support these field types:
- `singleLineText`
- `email`
- `date`
- `number`
- `boolean`
- `multilineText`

### Example Table Creation
Here's a complete example of creating a "Users" table:

```javascript
// Table Schema
{
    "table": {
        "base_id": "a8a0f7dd-d854-4245-9c42-d73edb4ae309",
        "name": "Users",
        "version": 1,
        "order": 1.0,
        "fields": {
            "items": [
                {
                    "name": "username",
                    "type": "singleLineText",
                    "cell_value_type": "string",
                    "not_null": false,
                    "unique": true,
                    "order": 1.0
                },
                {
                    "name": "email",
                    "type": "email",
                    "cell_value_type": "string",
                    "not_null": true,
                    "unique": true,
                    "order": 2.0
                },
                {
                    "name": "signup_date",
                    "type": "date",
                    "cell_value_type": "date",
                    "not_null": false,
                    "options": {
                        "date_options": {
                            "time_zone": "GMT/UTC",
                            "date_format": "ISO"
                        }
                    },
                    "order": 3.0
                }
            ]
        }
    }
}
```

### Record Structure
When creating or updating records, use this structure:

```javascript
// Creating a record
dispatch(createRecord({
  tableName: "users",
  record: {
    username: "john_doe",
    email: "john@example.com",
    signup_date: "2024-01-22"
  }
}));
```

### API Endpoints
The database components interact with these endpoints:
- `GET /table/{table_id}` - Get table schema
- `POST /table/{table_id}/record/query` - Query records
- `POST /table/{table_id}/record` - Create record
- `PATCH /table/{table_id}/record/{record_id}` - Update record
- `DELETE /table/{table_id}/record/{record_id}` - Delete record

## How can I edit this code?

### Using Altan

Simply visit the [Altan Dashboard](https://dashboard.altan.ai) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

### Using your preferred IDE

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
bun i

# Step 4: Start the development server with auto-reloading and an instant preview.
bun run dev
```

## Technologies Used

This project is built with:
- Vite
- TypeScript
- React
- Redux Toolkit for state management
- shadcn-ui for UI components
- Tailwind CSS for styling
- Recharts for data visualization
- React Router for navigation

## Project Routes

The application includes the following routes:
- `/` - Landing page
- `/dashboard` - Main dashboard
- `/dashboard/database` - Database management interface

## Environment Variables

Before running the application, make sure to set up the following environment variable:

ALTAN_API_KEY=your_api_key_here

This API key is required for the database functionality to work properly.

## Component Examples

### Database Table
```typescript
<DataTable
  records={records}
  schema={schema}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

### Form Fields
```typescript
<FormField
  field={field}
  value={value}
  onChange={handleChange}
/>
```

## Deployment

The github repo is automatically deployed everytime you make a commit to main. 

## Custom Domain Setup

Yes, click on the settings icon in the top right of the preview of your project, select "Add Custom Domain" and follow the steps.

### Querying Records

The database supports advanced querying capabilities with filtering, sorting, and pagination:

```typescript
// Basic query
dispatch(fetchTableRecords({
  tableName: "users",
  queryParams: { 
    limit: 20 
  }
}));

// Advanced query with filters
dispatch(fetchTableRecords({
  tableName: "users",
  queryParams: {
    filters: [
      {
        field: "username",
        operator: "contains",
        value: "john"
      },
      {
        field: "signup_date",
        operator: "gte",
        value: "2024-01-01"
      }
    ],
    sort: [
      {
        field: "created_time",
        direction: "desc"
      }
    ],
    limit: 20
  }
}));
```

#### Filter Operators
Available filter operators:
- `eq` - Equals
- `neq` - Not equals (includes NULL values)
- `gt` - Greater than
- `gte` - Greater than or equal
- `lt` - Less than
- `lte` - Less than or equal
- `contains` - Case-insensitive text search
- `startswith` - Case-insensitive prefix search
- `endswith` - Case-insensitive suffix search

#### Sorting
- Sort by multiple fields using the `sort` parameter
- Each sort item requires a `field` and `direction` ("asc" or "desc")
- Default sort is by `id` ascending if not specified

#### Pagination
The API uses cursor-based pagination for efficient data retrieval:
- Use `limit` to control records per page
- A `page_token` will be returned if more records are available
- Pass the `page_token` in subsequent requests to fetch next page

Example pagination usage:
```typescript
// First page
const firstPage = await dispatch(fetchTableRecords({
  tableName: "users",
  queryParams: { limit: 20 }
}));

// Next page
if (firstPage.pageToken) {
  const nextPage = await dispatch(fetchTableRecords({
    tableName: "users",
    queryParams: { 
      limit: 20,
      page_token: firstPage.pageToken 
    }
  }));
}
```

## Adding New Pages

When creating new pages in your application, you need to:

1. Create your page component in the `pages` directory
2. Add the route to `src/App.tsx` to make it visible

Example of adding a new page:

```typescript
// 1. Create your page component (e.g., src/pages/NewPage.tsx)
const NewPage = () => {
  return <div>My new page content</div>;
};

// 2. Add the route in src/App.tsx
<Routes>
  {/* ... existing routes ... */}
  <Route
    path="/new-page"
    element={
      <Layout
        showSidebar={false}
        header={{
          title: appName,
          // ... other header config
        }}
      />
    }
  >
    <Route index element={<NewPage />} />
  </Route>
</Routes>
```

For dashboard pages, add them under the `/dashboard` route with the sidebar configuration.

