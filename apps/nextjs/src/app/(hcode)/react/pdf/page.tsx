import { CodeBlock } from "@acme/ui/code-block";

export default function Page() {
  return (
    <div>
      <div>
        <div>Calculate page break html</div>
        <div>
          https://github.com/parallax/jsPDF/issues/2615#issuecomment-1600371956
        </div>
      </div>
      <div>Preview</div>
      <CodeBlock>
        {`
          const pdfBlob = pdf.output("blob");
          const pdfURL = URL.createObjectURL(pdfBlob);
          window.open(pdfURL);
      `}
      </CodeBlock>

      <div>
        <div>html2canvas-pro</div>
        <div>vite.config.ts</div>
        <CodeBlock>
          {`
            export default defineConfig({
              resolve: {
                alias: {
                  html2canvas: path.resolve(
                    __dirname,
                    "node_modules/html2canvas-pro",
                  ),
                },
              },
            });
          `}
        </CodeBlock>
      </div>

      <div>
        <div>with html2canvas</div>
        <CodeBlock>
          {`
const handleExportPDF = async () => {
    const contentElement = contentRef.current;
    if (!contentElement) return;

    const pdf = new jsPDF("p", "mm", "a4");
    const padding = 10;
    const imgWidth = 210 - padding * 2;
    const pageHeight = 297;
    let currentPageHeight = padding;

    const pageBreaks: { start: number; end: number }[] = [];
    let startOffset = 0;
    const recursive = (element: HTMLElement) => {
      try {
        if (element.className.includes("_page-break")) {
          pageBreaks.push({
            start: startOffset,
            end:
              element.getBoundingClientRect().top -
              contentElement.getBoundingClientRect().top,
          });
          startOffset =
            element.getBoundingClientRect().top -
            contentElement.getBoundingClientRect().top;
        }
        if (element.children.length > 0) {
          for (const elm of element.children) {
            recursive(elm as HTMLElement);
          }
        }
      } catch {
        //
      }
    };
    recursive(contentElement);
    pageBreaks.push({
      start: pageBreaks.at(-1)?.end ?? 0,
      end: contentElement.clientHeight,
    });

    const mainCanvas = await html2canvas(contentElement, {
      useCORS: true,
      allowTaint: true,
      scale: 2,
    });

    for (const section of pageBreaks) {
      const canvas = document.createElement("canvas");
      const sectionHeight = section.end - section.start;
      canvas.width = mainCanvas.width;
      canvas.height = sectionHeight * 2; // scale = 2

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(
        mainCanvas,
        0,
        section.start * 2,
        mainCanvas.width,
        sectionHeight * 2,
        0,
        0,
        mainCanvas.width,
        sectionHeight * 2,
      );

      const imgData = canvas.toDataURL("image/png");
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (currentPageHeight + imgHeight > pageHeight - padding) {
        pdf.addPage();
        currentPageHeight = padding;
      }

      pdf.addImage(
        imgData,
        "PNG",
        padding,
        currentPageHeight,
        imgWidth,
        imgHeight,
      );
      currentPageHeight += imgHeight;
    }

    setGenerating(false);
    return pdf;
  };

`}
        </CodeBlock>
      </div>
      <div>
        <div>keep render diff width not change current width</div>
        <CodeBlock>
          {`
<div
            style={{
              position: "absolute",
            }}
          >
<div ref={contentRef}>...</div>
</div>
          `}
        </CodeBlock>
      </div>
    </div>
  );
}
