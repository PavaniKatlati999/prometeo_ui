import React, { useMemo, useState, useEffect, useRef } from "react"

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  ColumnDef,
  SortingState,
  ColumnPinningState,
} from "@tanstack/react-table"

import { DataTableStructure } from "./interface"
import { useVirtualizer } from '@tanstack/react-virtual'

/**
 *  A reusable DataTable component for displaying tabular data.
 * Supports client-side and server-side rendering, pagination, infinite scroll,
 * column pinning, sorting, and global search.
 *
 */

export default function DataTable<T extends object>({
  enableGlobalSearch = false,
  enableFilter = false,
  enableInfiniteScroll = false,
  columns,
  dataSource,
  isServerSide = false,
  fetchFromServer,
  total,
  pageSize = 20,
}: DataTableStructure<T>) {

  // Scroll container and search input refs
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const searchRef = useRef<HTMLInputElement | null>(null)

  // Local table state (client-side or hydrated by server fetches)
  const [tableData, setTableData] = useState<T[]>(dataSource ?? [])
  // Table features: sorting, global filter, pagination page and totals
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [page, setPage] = useState(0)
  const [totalCount, setTotalCount] = useState(total ?? dataSource.length)

  // infinite scroll loading flag
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  // Pinned (frozen) columns configuration
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: columns.filter(c => c.isFrozen).map(c => c.key),
  })


  // Enable infinite scroll only if explicitly requested and classic pagination is not provided
  const infiniteScroll = enableInfiniteScroll
  const enablePagination = !enableInfiniteScroll
  /**
   * @description Keyboard shortcuts for accessibility
   * - Ctrl+F focuses search
   * - Escape clears filter
   */  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "f") {
        e.preventDefault()
        searchRef.current?.focus()
      } else if (e.key === "Escape") {
        setGlobalFilter("")
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  /**
 * @description Fetch or update table data
 * - Client-side → mirrors incoming `dataSource`
 * - Server-side → fetches from API (append for infinite scroll, replace for normal mode)
 */
  useEffect(() => {
    if (!isServerSide) {
      setTableData(dataSource)
      setTotalCount(dataSource.length)
      return
    }
    if (fetchFromServer) {
      const load = async () => {
        setIsLoadingMore(true)
        const newData = await fetchFromServer(page, pageSize)
        if (infiniteScroll) {
          setTableData(prev => [...prev, ...newData])
        } else {
          setTableData(newData)
        }
        setTotalCount(total ?? 1000000)
        setIsLoadingMore(false)
      }
      load()
    }
  }, [page, dataSource, fetchFromServer, isServerSide, infiniteScroll])

  /**
 * @description Infinite scroll handler
 * Loads next page when user scrolls near the bottom of the container
 */
  useEffect(() => {
    if (!infiniteScroll) return
    const el = scrollRef.current
    if (!el) return
    const onScroll = async () => {
      if (isLoadingMore) return
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
        const nextPage = page + 1
        setPage(nextPage)
      }
    }
    el.addEventListener("scroll", onScroll)
    return () => el.removeEventListener("scroll", onScroll)
  }, [page, isLoadingMore, infiniteScroll])

  const [editing, setEditing] = useState<{ rowId: string; colId: string } | null>(null)

  /**
   * @description Enhance column definitions with:
   * - Custom headers
   * - Inline cell editing
   */
  const enhancedColumns: ColumnDef<T>[] = useMemo(() => {
    return columns.map(col => ({
      id: col.key,
      accessorKey: col.dataIndex,
      header: () => col.title,
      size: col.width,
      cell: (info: any) => {
        const val = info.getValue()
        return editing ? (
          <input
            autoFocus
            value={val ?? ""}
            onChange={e => {
              if (!isServerSide) (tableData as any)[info.row.index][info.column.id] = e.target.value
            }}
            onBlur={() => setEditing(null)}
            style={{ width: "100%", boxSizing: "border-box" }}
          />
        ) : (
          <div
            onDoubleClick={() =>
              setEditing({ rowId: info.row.id, colId: info.column.id })
            } title={String(val ?? "")}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {val as any}
          </div>
        )
      },
    }))
  }, [columns, tableData, isServerSide])

  /**
    * @description Initialize TanStack Table
    * Enables sorting, filtering, resizing, pagination, and column pinning
    */
  const table = useReactTable({
    data: tableData,
    columns: enhancedColumns,
    state: {
      sorting,
      globalFilter,
      columnPinning,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnPinningChange: setColumnPinning,
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: "onChange",

    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    initialState: {
      pagination: { pageSize: pageSize ?? 20 },
      columnPinning: { left: columns.filter(c => c.isFrozen).map(c => c.key) },
    },

  })

  // Visual offset for pinned columns from container edges
  const FROZEN_OFFSET = 8
  /**
   * @description Compute CSS styles for pinned columns and headers
   * @param {any} column - The column object from TanStack Table
   * @param {boolean} isHeader - Whether the styles are for a header cell
   * @returns {React.CSSProperties} Sticky positioning styles
   */
  const getPinStyles = (column: any, isHeader = false): React.CSSProperties => {
    const isPinned = column.getIsPinned()
    const styles: React.CSSProperties = {
      boxSizing: "border-box",
      minWidth: column.getSize(),
      width: column.getSize(),
      padding: "8px 10px",
      background: isHeader ? "#f8f9fa" : "#fff",
      borderBottom: "1px solid #e9ecef",
      overflow: "hidden",
      textOverflow: column.columnDef.ellipse ? "ellipsis" : "clip",
      whiteSpace: "nowrap",
    }
    if (isPinned) {
      styles.position = "sticky"
      if (isHeader) styles.top = 0
      if (isPinned === "left") {
        const left = column.getStart("left")
        styles.left = left != null ? `${left + FROZEN_OFFSET}px` : `${FROZEN_OFFSET}px`
        if (column.getIsLastColumn("left")) styles.boxShadow = "-4px 0 6px -4px rgba(0,0,0,0.12) inset"
      }
      if (isPinned === "right") {
        const right = column.getAfter("right")
        styles.right = right != null ? `${right + FROZEN_OFFSET}px` : `${FROZEN_OFFSET}px`
        if (column.getIsFirstColumn("right")) styles.boxShadow = "4px 0 6px -4px rgba(0,0,0,0.12) inset"
      }
      styles.zIndex = isHeader ? 100 : 90
    } else if (isHeader) {
      styles.position = "sticky"
      styles.top = 0
      styles.zIndex = 80
    }
    return styles
  }

  // Scroll container styles for responsive table viewport
  const scrollStyle: React.CSSProperties = {
    overflowX: "auto",
    overflowY: "auto",
    width: "100%",
    maxHeight: "70vh",
    position: "relative",
    border: "1px solid #ddd",
  }

  // Compute total pages for the pagination controls
  const totalPages = Math.ceil(totalCount / (pageSize ?? 20))

  return (
    <div style={{ width: "95%", position: "relative", left: "24px", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* global search input */}
      {enableGlobalSearch && (
        <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 8 }}>
          <input
            ref={searchRef}
            placeholder="Search..."
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #ccc" }}
          />
        </div>
      )}

      <div ref={scrollRef} className="responsive-table" style={scrollStyle}>
        <table
          style={{
            width: table.getTotalSize ? table.getTotalSize() : "max-content",
            minWidth: "100%",
            borderCollapse: "separate",
            tableLayout: "fixed",
            borderSpacing: 0,
            background: "#fff",
          }}
        >
          <thead>
            {table.getHeaderGroups().map(hg => (
              <tr key={hg.id}>
                {hg.headers.map(header => {
                  const col = header.column
                  return (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{
                        ...getPinStyles(col, true),
                        textAlign: "left",
                        fontWeight: 600,
                        fontSize: 13,
                        color: "#333",
                        cursor: header.column.getCanSort() ? "pointer" : "default",
                        userSelect: "none",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",

                      }}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <span style={{ fontSize: "16px" }}>
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? ""}
                        </span>
                      )}
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        style={{ position: "absolute", right: 0, top: 0, height: "100%", width: 6, cursor: "col-resize" }}
                      />
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    const col = cell.column
                    return (
                      <td key={cell.id} data-label={col.columnDef.header as string} style={{ ...getPinStyles(col, false) }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    )
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: "center", padding: "16px", color: "#666" }}>
                  No data found
                </td>
              </tr>
            )}
            {isLoadingMore && (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: "center", padding: "16px", color: "#666" }}>
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Classic pagination controls (hidden when infinite scroll is used) */}
      {enablePagination && (
        <div
          className="pagination-controls"
          style={{ display: "flex", alignItems: "center", justifyContent: "end", marginTop: "16px", gap: "8px", flexWrap: "wrap" }}
        >
          <button
            onClick={() => setPage(p => Math.max(p - 1, 0))}
            disabled={page === 0}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              background: page === 0 ? "#f5f5f5" : "#fff",
              color: page === 0 ? "#999" : "#000",
              cursor: page === 0 ? "not-allowed" : "pointer",
            }}
          >
            ◀
          </button>
          <div style={{ display: "flex", gap: "8px" }}>
            {Array.from({ length: totalPages }).map((_, i) => {
              if (i === 0 || i === totalPages - 1 || (i >= page - 1 && i <= page + 1)) {
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setPage(i)
                    }}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      background: i === page ? "#228be6" : "#fff",
                      color: i === page ? "#fff" : "#000",
                      fontWeight: i === page ? "600" : "400",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {i + 1}
                  </button>
                )
              } else if (i === page - 2 || i === page + 2) {
                return (
                  <span key={i} style={{ padding: "6px 8px", color: "#888" }}>
                    ...
                  </span>
                )
              }
              return null
            })}
          </div>
          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))}
            disabled={page === totalPages - 1}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              background: page === totalPages - 1 ? "#f5f5f5" : "#fff",
              color: page === totalPages - 1 ? "#999" : "#000",
              cursor: page === totalPages - 1 ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            ▶
          </button>
        </div>
      )}
    </div>
  )
}
