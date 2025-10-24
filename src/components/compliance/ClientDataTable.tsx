import { useState, useMemo } from 'react';
import { useComplianceStore } from '@/stores/complianceStore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, Search } from 'lucide-react';
import { utils, writeFile } from 'xlsx';
import { Badge } from '@/components/ui/badge';

const PROGRAMS = ["Ted's Place", "Hondo", "Pathway Home", "Midvale", "A2C", "ICMS"];
const ROWS_PER_PAGE = 25;

export function ClientDataTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const {
    getFilteredRecords,
    selectedProgram,
    setSelectedProgram,
    searchQuery,
    setSearchQuery,
  } = useComplianceStore();

  const filteredRecords = getFilteredRecords();

  // Sorting
  const sortedRecords = useMemo(() => {
    if (!sortColumn) return filteredRecords;

    return [...filteredRecords].sort((a, b) => {
      const aValue = a[sortColumn as keyof typeof a];
      const bValue = b[sortColumn as keyof typeof b];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [filteredRecords, sortColumn, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(sortedRecords.length / ROWS_PER_PAGE);
  const paginatedRecords = sortedRecords.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  // Export to CSV
  const handleExport = () => {
    const ws = utils.json_to_sheet(filteredRecords);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Client Data');
    writeFile(wb, `WFD_Client_Data_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // Column sort toggle
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by Client ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedProgram || 'all'} onValueChange={(v) => setSelectedProgram(v === 'all' ? null : v)}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="All Programs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Programs</SelectItem>
            {PROGRAMS.map(prog => (
              <SelectItem key={prog} value={prog}>{prog}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={handleExport} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export to CSV
        </Button>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {paginatedRecords.length} of {sortedRecords.length} records
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => handleSort('ClientID')}>
                  Client ID {sortColumn === 'ClientID' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('ProgramName')}>
                  Program {sortColumn === 'ProgramName' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('IntakeDate')}>
                  Intake Date {sortColumn === 'IntakeDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('ExitDate')}>
                  Exit Date {sortColumn === 'ExitDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead>Exit Destination</TableHead>
                <TableHead>Housing Date</TableHead>
                <TableHead>Length of Stay</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRecords.map((record, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{record.ClientID}</TableCell>
                  <TableCell>{record.ProgramName}</TableCell>
                  <TableCell>{record.IntakeDate || '—'}</TableCell>
                  <TableCell>
                    {record.ExitDate || <Badge variant="secondary">Active</Badge>}
                  </TableCell>
                  <TableCell>{record.ExitDestination || '—'}</TableCell>
                  <TableCell>{record.HousingPlacementDate || '—'}</TableCell>
                  <TableCell>
                    {record.LengthOfStay !== null ? `${record.LengthOfStay} days` : 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
