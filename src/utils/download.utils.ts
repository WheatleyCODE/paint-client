export const downloadCanvasImg = (dataUrl: string, filename: string) => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `${filename}.jpg`;
  link.click();
  link.remove();
};
