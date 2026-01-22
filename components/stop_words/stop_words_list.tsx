import { getSearchPresets, getStopWords } from "@/actions";
import { notFound } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NoResourcesFound } from "../shared/no_resources_found";
import { StopwordSchema } from "typesense/lib/Typesense/Stopword";
import StopWordsRowActions from "./stop_words_row_actions";
import { Badge } from "../ui/badge";
import { DocumentationLinks } from "@/config/documentaion_links";

const StopWordsList = async ({ serverId }: { serverId: string }) => {
  const stopWords = await getStopWords(serverId);
  if (!stopWords) {
    notFound();
  }
  return (
    <div className="my-4">
      {stopWords.stopwords && stopWords.stopwords.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-mono font-bold">Name</TableHead>
              <TableHead className="font-mono font-bold">
                Stopword Locale
              </TableHead>
              <TableHead className="font-mono font-bold">Stop Words</TableHead>
              <TableHead className="text-center font-mono font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stopWords.stopwords.map((stopWord, index) => (
              <SingleStopWordTile {...stopWord} key={index} />
            ))}
          </TableBody>
        </Table>
      )}
      {stopWords.stopwords.length <= 0 && (
        <>
          <NoResourcesFound
            resource="Stopword"
            documentationLink={DocumentationLinks.stopWords}
          />
        </>
      )}
    </div>
  );
};

const SingleStopWordTile = (stopWord: StopwordSchema) => {
  const definiteStopWords = Array.isArray(stopWord?.stopwords)
    ? stopWord.stopwords
    : stopWord?.stopwords.stopwords;
  return (
    <TableRow className="">
      <TableCell>
        <div className="font-mono font-bold">{stopWord.id}</div>
      </TableCell>
      <TableCell>
        <div className="font-mono font-bold text-center">
          {stopWord.locale ?? "N/A"}
        </div>
      </TableCell>
      <TableCell>
        <div className="font-mono flex gap-1.5 flex-wrap">
          {definiteStopWords &&
            definiteStopWords.map((stopword, index) => (
              <Badge className="font-mono" key={index}>
                {stopword}
              </Badge>
            ))}
        </div>
      </TableCell>
      <TableCell className="text-right">
        <StopWordsRowActions {...stopWord} />
      </TableCell>
    </TableRow>
  );
};

export default StopWordsList;
