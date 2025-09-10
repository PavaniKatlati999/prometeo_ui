import React, { useState, useMemo } from 'react';
import { Column, FilterConfig, SortConfig, TableProps } from './types'
import './styles.scss';
/**
 * A Table component to display structured data with optional sorting, filtering, pagination,
 * selection, and editable rows. Useful for dashboards, reports, and data management apps.
 */

function Table<T extends { id: string | number }>({
  data,
  columns,
  pageSize = 10,
  onDataChange,
  loading = false,
  selectable = true,
  editable = true,
}: TableProps<T>) {
  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
  const [filters, setFilters] = useState<FilterConfig>({});
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCell, setEditingCell] = useState<{ id: string | number; key: keyof T } | null>(null);

  const processedData = useMemo(() => {
    let result = [...data];

    // Apply search
    if (searchTerm) {
      result = result.filter(row =>
        Object.entries(row).some(([_, value]) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(row =>
          String(row[key as keyof T]).toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof T];
        const bValue = b[sortConfig.key as keyof T];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, searchTerm, filters, sortConfig]);

  // Pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return processedData.slice(startIndex, startIndex + pageSize);
  }, [processedData, currentPage, pageSize]);

  const totalPages = Math.ceil(processedData.length / pageSize);

  // Event handlers
  const handleSort = (key: keyof T) => {
    setSortConfig(prev => ({
      key: key as string,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilter = (key: keyof T, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(checked ? paginatedData.map(row => row.id) : []);
  };

  const handleSelectRow = (id: string | number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const handleCellEdit = (id: string | number, key: keyof T, value: any) => {
    const newData = data.map(row =>
      row.id === id ? { ...row, [key]: value } : row
    );
    onDataChange?.(newData);
    setEditingCell(null);
  };

  // Render functions
  const renderSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null;

    const isActive = sortConfig.key === column.key;
    const direction = sortConfig.direction;

    return (
      <button
        // className={styles.sortButton}
        onClick={() => handleSort(column.key)}
      >
        {isActive && direction === 'asc' ? '↑' : '↓'}
      </button>
    );
  };

  const renderCell = (row: T, column: Column<T>) => {
    const value = row[column.key];
    const isEditing = editingCell?.id === row.id && editingCell?.key === column.key;

    if (isEditing && editable) {
      return (
        <input
          className="inputBase"
          value={String(value)}
          onChange={(e) => handleCellEdit(row.id, column.key, e.target.value)}
          onBlur={() => setEditingCell(null)}
          autoFocus
        />
      );
    }

    if (column.render) {
      return column.render(value, row);
    }

    return (
      <div
        onDoubleClick={() => editable && setEditingCell({ id: row.id, key: column.key })}
      >
        {String(value)}
      </div>
    );
  };

  return (
    <div>
      {/* Search and Toolbar */}
      <div className="searchWrapper">
        <input
          type="text"
          placeholder="Search..."
          className="inputBase"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {selectedRows.length > 0 && (
          <span className="selectedCount">
            {selectedRows.length} selected
          </span>
        )}
      </div>

      {/* Table */}
      <div className="tableWrapper">
        <table className="table">
          <thead className="thead">
            <tr>
              {selectable && (
                <th className="th">
                  <input
                    type="checkbox"
                    className="inputBase"
                    checked={selectedRows.length === paginatedData.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="th"
                  style={{ width: column.width }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {column.title}
                    {renderSortIcon(column)}
                    {column.filterable && (
                      <input
                        type="text"
                        placeholder="Filter..."
                        className="inputBase"
                        value={filters[column.key as string] || ''}
                        onChange={(e) => handleFilter(column.key, e.target.value)}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => (
              <tr key={row.id} className="row">
                {selectable && (
                  <td className="td">
                    <input
                      type="checkbox"
                      className="inputBase"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={`${row.id}-${String(column.key)}`}
                    className="td"
                  >
                    {renderCell(row, column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <div>
          Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, processedData.length)} of {processedData.length} results
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className="button buttonSecondary"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="button buttonSecondary"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Table;
