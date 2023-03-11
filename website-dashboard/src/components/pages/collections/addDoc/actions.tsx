import { ReactComponent as Question } from "./svgs/question.svg";

interface Props {
  title: string;
  description: string;
  link: string;
}

function SingleAction({ title, description, link }: Props) {
  return (
    <div className="w-full border-t-2 mt-3 flex items-center gap-10 dark:border-gray-600">
      <div>
        <div className="flex gap-1 items-start my-2">
          <p className="font-lato font-bold text-gray-600">{title}</p>
          <a href={link} target="_blank" rel="noreferrer">
            <Question className="w-3 h-3 cursor-pointer dark:text-gray-400" />
          </a>
        </div>
        <p className="w-96 text-sm font-lato text-gray-400">{description}</p>
      </div>
      <input type="radio" />
    </div>
  );
}

function Actions() {
  return (
    <div className="w-full">
      <h2 className="font-lato font-bold mt-1 dark:text-gray-400">Actions</h2>
      <SingleAction
        title="Create new"
        description="Creates a new document. Fails if a document with the same id already exists"
        link="https://typesense.org/docs/0.24.0/api/documents.html#index-a-single-document"
      />
      <SingleAction
        title="Edit existing"
        description="Updates an existing document. Fails if a document with the given id does
        not exist. You can send a partial document containing only the fields
        that are to be updated."
        link="https://typesense.org/docs/0.24.0/api/documents.html#update-a-document"
      />
      <SingleAction
        title="Upsert"
        description="Replaces a document with the same id if it already exists, or create a new document if one doesn't already exist with the same id"
        link="https://typesense.org/docs/0.24.0/api/documents.html#upsert-a-single-document"
      />
      <SingleAction
        title="Import from file"
        description=" Indexes multiple documents in a batch using the import API. Has various action modes including upsert, create, update and emplace."
        link="https://typesense.org/docs/0.21.0/api/documents.html#import-documents"
        // Add a combined radio button for the select from file import
      />
    </div>
  );
}

export default Actions;
