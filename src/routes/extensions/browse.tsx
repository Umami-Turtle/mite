import {
  fetchRemoteExtensionList,
  loadRemoteExtension,
} from "@/lib/extensions/loader";
import { createFileRoute } from "@tanstack/react-router";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CloudAlert, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useExtensions } from "@/lib/extensions/store";

export const Route = createFileRoute("/extensions/browse")({
  component: RouteComponent,
});

function RouteComponent() {
  const extensionStore = useExtensions();

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["extensions"],
    queryFn: fetchRemoteExtensionList,
  });

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-medium">Extensions</h1>
        <Button
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ["extensions"] })
          }
          disabled={query.isLoading}
        >
          Reload
          <RefreshCw className={cn(query.isLoading && "animate-spin")} />
        </Button>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {query.isLoading && (
          <span className="flex mx-auto gap-2">
            <RefreshCw className={cn(query.isLoading && "animate-spin")} />
            Loading
          </span>
        )}
        {query.isError && (
          <span className="bg-destructive text-destructive-foregroundp p-3 rounded-lg mt-5 mx-auto flex gap-2">
            <CloudAlert /> {query.error.message}
          </span>
        )}
        {query.data?.map((extensionMetadata) => (
          <Card
            className="w-full md:w-1/2 lg:w-1/3 xl:1/4"
            key={extensionMetadata.id}
          >
            <CardHeader>
              <CardTitle>{extensionMetadata.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{extensionMetadata.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex gap-2">
              {extensionStore.extensions.hasOwnProperty(
                extensionMetadata.id,
              ) ? (
                <>
                  <Button variant="secondary">Settings</Button>
                  <Button
                    onClick={() =>
                      extensionStore.removeExtension(extensionMetadata)
                    }
                    variant="destructive"
                  >
                    Remove
                  </Button>
                </>
              ) : (
                <Button
                  onClick={async () => {
                    const loadedExtension =
                      await loadRemoteExtension(extensionMetadata);
                    if (!loadedExtension) {
                      return;
                    }
                    extensionStore.addExtension(
                      extensionMetadata,
                      loadedExtension,
                    );
                  }}
                >
                  Install
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
