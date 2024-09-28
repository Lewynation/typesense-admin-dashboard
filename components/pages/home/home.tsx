import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddServer from "./add_server";
import { Eye } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui";
import Link from "next/link";
import { fetchServers } from "@/actions";
import DeleteServerIcon from "./delete_server_icon";

export async function Home() {
  const typesenseServers = await fetchServers();
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto w-full max-w-4xl items-start gap-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader className="px-7 flex justify-between items-center flex-row">
                <div className="flex items-start flex-col ">
                  <CardTitle>Servers</CardTitle>
                  <CardDescription>All your typesense servers</CardDescription>
                </div>
                <AddServer />
              </CardHeader>
              <CardContent>
                {typesenseServers && typesenseServers.length > 0 && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Server</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {typesenseServers.map(({ host, id, name }, index) => (
                        <SingleServerTile
                          host={host}
                          id={id}
                          name={name}
                          key={index}
                        />
                      ))}
                    </TableBody>
                  </Table>
                )}
                {(!typesenseServers || typesenseServers?.length === 0) && (
                  <div className="flex items-center justify-center text-xl">
                    No servers found
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

interface SingleServerTileProps {
  id: string;
  name: string;
  host: string;
}

const SingleServerTile: React.FC<SingleServerTileProps> = ({
  host,
  id,
  name,
}) => {
  return (
    <TableRow className="">
      <TableCell>
        <div className="font-medium">{name}</div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          <span className="truncate">{host}</span>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/server/${id}`}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground text-muted-foreground`}
                >
                  <Eye className="h-5 w-5" />
                  <span className="sr-only">View</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">View</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DeleteServerIcon id={id} />
              </TooltipTrigger>
              <TooltipContent side="right">Delete</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </TableCell>
    </TableRow>
  );
};
