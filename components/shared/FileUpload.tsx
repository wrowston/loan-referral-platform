"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type UploadItem = {
  name: string;
};

type FileUploadProps = {
  onUploaded: (files: UploadItem[]) => void;
};

export function FileUpload({ onUploaded }: FileUploadProps) {
  const [files, setFiles] = useState<UploadItem[]>([]);

  return (
    <div className="space-y-2">
      <Input
        type="file"
        multiple
        onChange={(event) => {
          const list = Array.from(event.target.files ?? []).map((file) => ({ name: file.name }));
          setFiles(list);
        }}
      />
      <Button type="button" variant="secondary" onClick={() => onUploaded(files)}>
        Attach Selected Files
      </Button>
      {files.length > 0 ? (
        <ul className="text-xs text-muted-foreground">
          {files.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
