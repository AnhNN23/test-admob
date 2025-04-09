"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Define the type for our data
type AdMobReport = {
  id: string
  app: string
  date: string
  adUnit: string
  adFormat: string
  requests: number
  impressions: number
  clicks: number
  ctr: string
  revenue: string
  ecpm: string
}

// Sample data
const data: AdMobReport[] = [
  {
    id: "1",
    app: "Puzzle Game Pro",
    date: "2023-04-01",
    adUnit: "Banner - Main Menu",
    adFormat: "Banner",
    requests: 125000,
    impressions: 110000,
    clicks: 3300,
    ctr: "3.0%",
    revenue: "$550.00",
    ecpm: "$5.00",
  },
  {
    id: "2",
    app: "Puzzle Game Pro",
    date: "2023-04-01",
    adUnit: "Interstitial - Level Complete",
    adFormat: "Interstitial",
    requests: 45000,
    impressions: 40000,
    clicks: 2000,
    ctr: "5.0%",
    revenue: "$800.00",
    ecpm: "$20.00",
  },
  {
    id: "3",
    app: "Adventure Runner",
    date: "2023-04-01",
    adUnit: "Rewarded - Extra Lives",
    adFormat: "Rewarded",
    requests: 30000,
    impressions: 25000,
    clicks: 1500,
    ctr: "6.0%",
    revenue: "$750.00",
    ecpm: "$30.00",
  },
  {
    id: "4",
    app: "Weather Pro",
    date: "2023-04-01",
    adUnit: "Native - Forecast Page",
    adFormat: "Native",
    requests: 80000,
    impressions: 75000,
    clicks: 1500,
    ctr: "2.0%",
    revenue: "$375.00",
    ecpm: "$5.00",
  },
  {
    id: "5",
    app: "Fitness Tracker",
    date: "2023-04-01",
    adUnit: "Banner - Stats Page",
    adFormat: "Banner",
    requests: 60000,
    impressions: 55000,
    clicks: 1100,
    ctr: "2.0%",
    revenue: "$275.00",
    ecpm: "$5.00",
  },
  {
    id: "6",
    app: "Cooking Master",
    date: "2023-04-01",
    adUnit: "Interstitial - Recipe Complete",
    adFormat: "Interstitial",
    requests: 25000,
    impressions: 22000,
    clicks: 880,
    ctr: "4.0%",
    revenue: "$330.00",
    ecpm: "$15.00",
  },
]

// Define columns
const columns: ColumnDef<AdMobReport>[] = [
  {
    accessorKey: "app",
    header: "App",
    cell: ({ row }) => <div>{row.getValue("app")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "adUnit",
    header: "Ad Unit",
    cell: ({ row }) => <div>{row.getValue("adUnit")}</div>,
  },
  {
    accessorKey: "adFormat",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Ad Format
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("adFormat")}</div>,
  },
  {
    accessorKey: "requests",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Requests
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("requests") ? (row.getValue("requests") as number).toLocaleString() : 0}</div>
    ),
  },
  {
    accessorKey: "impressions",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Impressions
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("impressions") ? (row.getValue("impressions") as number).toLocaleString() : 0}</div>
    ),
  },
  {
    accessorKey: "clicks",
    header: "Clicks",
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("clicks") ? (row.getValue("clicks") as number).toLocaleString() : 0}</div>
    ),
  },
  {
    accessorKey: "ctr",
    header: "CTR",
    cell: ({ row }) => <div className="text-right">{row.getValue("ctr")}</div>,
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Revenue
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-right font-medium">{row.getValue("revenue")}</div>,
  },
  {
    accessorKey: "ecpm",
    header: "eCPM",
    cell: ({ row }) => <div className="text-right">{row.getValue("ecpm")}</div>,
  },
]

export function ReportsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter apps..."
          value={(table.getColumn("app")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("app")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {table.getFilteredRowModel().rows.length} of {data.length} results
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
