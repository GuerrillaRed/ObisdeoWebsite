import { defineComponent } from 'vue';
import { PDFDocument, degrees, SaveOptions } from 'pdf-lib';

interface PDFFile {
    pdf_uri: string,
    file: null | File;
}

export default defineComponent({
    name: 'CustomPDFDocument',
    created() {
        this.createPdf().then(x => {
            this.rotatePdf(90);
        });
        //this.rotatePdf();
    },
    data(): PDFFile {
        return {
            pdf_uri: "",
            file: null
        }
    },
    methods: {
        createPdf: async function () {
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage([1000, 3000]);
            page.moveTo(110, 200);
            page.drawText('Hello World!');
            const uri = await pdfDoc.saveAsBase64({ dataUri: true });
            this.pdf_uri = uri;
        },
        setPdf: function () {
            let pdf: HTMLImageElement | null = <HTMLImageElement>document.getElementById('pdf');
            if(pdf) pdf.src = this.pdf_uri;
        },
        rotatePdf: async function (rotation: number) {
            const pdf_doc = await PDFDocument.load(this.pdf_uri);
            const page = pdf_doc.getPage(0);
            page.setRotation(degrees(rotation));
            this.pdf_uri = await pdf_doc.saveAsBase64({ dataUri: true });
            this.setPdf();
        },
        handleLoadFile: function (event: any) {
            let file: File = event.target.files[0];
            this.file = file;
            
            // read file as byte array
            var reader = new FileReader();
            var set_uri = "";
            reader.readAsArrayBuffer(file);
            reader.onloadend = this.readFileBytes;

        },
        handleExportFile: async function (event: any) {
            const pdf_doc = await PDFDocument.load(this.pdf_uri);
            let bytes: ArrayBuffer = await pdf_doc.save();
            const url = window.URL.createObjectURL(new Blob([bytes]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', this.file?.name + '.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        readFileBytes: async function (evt: any) {
            if (evt.target?.readyState == FileReader.DONE) {
                var arrayBuffer = evt.target.result, array = new Uint8Array(arrayBuffer as ArrayBuffer);
                const pdf_doc = await PDFDocument.load(array);
                const uri = await pdf_doc.saveAsBase64({ dataUri: true });
                this.pdf_uri = uri;
                this.setPdf();
            }
            else {
                alert("failed to load pdf");
            }
        },
        setWindowCenter: async function () {
            const pdf_doc = await PDFDocument.load(this.pdf_uri);
            const view_prefs = pdf_doc.catalog.getOrCreateViewerPreferences();
            view_prefs.setCenterWindow(false);
            this.pdf_uri = await pdf_doc.saveAsBase64({ dataUri: true });
            this.setPdf();
        }
    }
});