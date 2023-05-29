'use client';

import { ChangeEvent, useState } from 'react';

const MAX_FILE_SIZE = 5_242_880;

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null);

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) return;

    const file = files[0];

    if (file.size > MAX_FILE_SIZE) {
      alert('O arquivo deve ter no máximo 5MB');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  }

  return (
    <>
      <input
        type="file"
        id="media"
        name="coverUrl"
        accept="image/*"
        onChange={onFileSelected}
        className="invisible h-0 w-0"
      />
      {preview && (
        <img
          src={preview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  );
}
