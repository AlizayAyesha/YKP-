export async function normalizePortrait(file: File): Promise<File> {
  if (file.size > 8 * 1024 * 1024) {
    throw new Error('Photograph must be 8MB or smaller.');
  }

  const url = URL.createObjectURL(file);
  try {
    const image = await loadImage(url);
    if (image.width < 300 || image.height < 300) {
      throw new Error('Please upload a clearer portrait at least 300×300 pixels.');
    }

    const maxEdge = 1600;
    const scale = Math.min(1, maxEdge / Math.max(image.width, image.height));
    const width = Math.max(300, Math.round(image.width * scale));
    const height = Math.max(300, Math.round(image.height * scale));
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not process the photograph. Please try a JPG or PNG portrait.');
    }
    ctx.drawImage(image, 0, 0, width, height);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (next) => (next ? resolve(next) : reject(new Error('Could not process the photograph.'))),
        'image/jpeg',
        0.9
      );
    });

    const base = file.name.replace(/\.[^.]+$/, '') || 'portrait';
    return new File([blob], `${base}.jpg`, { type: 'image/jpeg' });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Please upload')) throw error;
    if (error instanceof Error && error.message.startsWith('Photograph')) throw error;
    if (error instanceof Error && error.message.startsWith('Could not')) throw error;
    throw new Error('That file could not be read as an image. Please upload a JPG, PNG, or WebP portrait.');
  } finally {
    URL.revokeObjectURL(url);
  }
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Could not read image.'));
    image.src = src;
  });
}
