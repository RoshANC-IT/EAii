import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';
import "./index.css";

const AppliedJobTable = () => {
  const { allAppliedJob = [] } = useSelector(store => store.job);

  return (
    <div className="w-full overflow-x-auto">
      {allAppliedJob.length === 0 ? (
        <div className="p-6 text-center text-gray-600 dark:text-gray-400">
          You haven&apos;t applied to any jobs yet.
        </div>
      ) : (
        <Table className="min-w-[600px] md:min-w-full">
          <TableCaption>A list of your applied jobs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppliedJob.map((appliedJob) => (
              <TableRow key={appliedJob._id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <TableCell className="whitespace-nowrap">
                  {appliedJob?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="whitespace-normal max-w-xs">
                  {appliedJob.job?.title}
                </TableCell>
                <TableCell className="whitespace-normal max-w-xs">
                  {appliedJob.job?.company?.name}
                </TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  <Badge
                    className={`px-3 py-1 rounded-full text-sm ${
                      appliedJob.status === "rejected"
                        ? "bg-red-600 text-white"
                        : appliedJob.status === "pending"
                        ? "bg-yellow-600 text-black"
                        : "bg-green-600 text-white"
                    }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AppliedJobTable;
