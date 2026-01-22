"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CircularSpinner } from "@/components/ui/circular_spinner";
import { Key } from "lucide-react";
import { useCreateSearchApiKeyForm } from "../search_api_keys_home";

const SearchApiKeysDataSubmisssion = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const {
    formState: { errors, isSubmitting },
  } = useCreateSearchApiKeyForm();

  return (
    <div>
      <div className="flex-col gap-0.5">
        {errors.description && (
          <p className="text-sm text-destructive font-mono">
            - (description) {errors.description.message}
          </p>
        )}
        {errors.collections && (
          <p className="text-sm text-destructive font-mono">
            - (collections) {errors.collections.message}
          </p>
        )}
        {errors.expiration && (
          <p className="text-sm text-destructive font-mono">
            - (expiration) {errors.expiration.message}
          </p>
        )}
        {errors.root && (
          <p className="text-sm text-destructive font-mono">
            - {errors.root.message}
          </p>
        )}
      </div>

      <div className="flex items-center gap-6 mt-2 mb-6 ml-2">
        {isSubmitting ? (
          <div className="flex items-center ml-3">
            <CircularSpinner />
          </div>
        ) : (
          <Button type="submit">
            <div className="flex items-center gap-2">
              <Key />
              <p className="font-mono">Generate API Key</p>
            </div>
          </Button>
        )}
        <Button
          variant="outline"
          className="font-mono"
          onClick={() => {
            router.replace(`/server/${params.id}/api-keys`);
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default SearchApiKeysDataSubmisssion;
