import { useState } from 'react';
import { useComplianceStore } from '@/stores/complianceStore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';

export function ProgramPerformanceTable() {
  const programMetrics = useComplianceStore(state => state.programMetrics);
  const [sortKey, setSortKey] = useState<string>('placementRate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  if (!programMetrics || programMetrics.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Upload data to view program performance
      </div>
    );
  }

  const sortedPrograms = [...programMetrics].sort((a, b) => {
    const aValue = a[sortKey as keyof typeof a] ?? 0;
    const bValue = b[sortKey as keyof typeof b] ?? 0;

    return sortDirection === 'asc'
      ? (aValue > bValue ? 1 : -1)
      : (aValue < bValue ? 1 : -1);
  });

  const topPerformer = sortedPrograms[0];

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Program Performance Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program Name</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('totalClients')}
                >
                  Total Clients {sortKey === 'totalClients' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('activeEnrollments')}
                >
                  Active {sortKey === 'activeEnrollments' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('housingPlacements')}
                >
                  Placements {sortKey === 'housingPlacements' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('avgLengthOfStay')}
                >
                  Avg LoS (days) {sortKey === 'avgLengthOfStay' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('placementRate')}
                >
                  Placement Rate {sortKey === 'placementRate' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPrograms.map((program) => {
                const isTopPerformer = program.programName === topPerformer.programName;

                return (
                  <TableRow key={program.programName} className={isTopPerformer ? 'bg-yellow-50' : ''}>
                    <TableCell className="font-medium">
                      {isTopPerformer && <Trophy className="inline h-4 w-4 text-wfd-gold mr-2" />}
                      {program.programName}
                    </TableCell>
                    <TableCell>{program.totalClients}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{program.activeEnrollments}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default" className="bg-rc-success">{program.housingPlacements}</Badge>
                    </TableCell>
                    <TableCell>
                      {program.avgLengthOfStay !== null
                        ? Math.round(program.avgLengthOfStay)
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={program.placementRate >= 50 ? 'default' : 'secondary'}
                        className={program.placementRate >= 50 ? 'bg-rc-success' : ''}
                      >
                        {program.placementRate.toFixed(1)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
