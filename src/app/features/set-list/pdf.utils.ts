import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function htmlToPdf(htmlElement: HTMLElement, fileName: string) {
  html2canvas(htmlElement, { scale: 2 }).then((canvas) => {
    canvasToPdf(canvas, fileName);
  });
}

export function canvasToPdf(canvas: HTMLCanvasElement, fileName: string) {
  const imageData = canvas.toDataURL('image/png');

  const pdf = new jsPDF('p', 'pt', 'a4');

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  // Définir la marge de 1 cm (28 points)
  const margin = 28;

  const availableWidth = pdfWidth - 2 * margin;
  const availableHeight = pdfHeight - 2 * margin;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // Calculer l'échelle pour ajuster le contenu dans une page A4
  const scaleFactor = Math.min(
    availableWidth / canvasWidth,
    availableHeight / canvasHeight
  );

  const adjustedWidth = canvasWidth * scaleFactor;
  const adjustedHeight = canvasHeight * scaleFactor;

  // Calcul du décalage horizontal pour centrer le contenu
  const xOffset = (pdfWidth - adjustedWidth) / 2;
  const yOffset = margin; // Ajouter la marge supérieure

  pdf.addImage(
    imageData,
    'PNG',
    xOffset,
    yOffset,
    adjustedWidth,
    adjustedHeight
  );

  pdf.save(`${fileName}.pdf`);
}
