import PDFDocument from "pdfkit";
import fs from "fs";

export const pdfDownload = async (req, res) => {
    try {
        const { applicantName, startDate, endDate, reason } = req.body;

        const doc = new PDFDocument();

        const filePath = `Leave_Application_${Date.now()}.pdf`;
        doc.pipe(fs.createWriteStream(filePath));   //Also download in developer side
        

        res.setHeader('Content-Disposition', 'attachment; filename="Leave_Application.pdf"');
        res.setHeader('Content-Type', 'application/pdf');

        doc.fontSize(20).text('Leave Application', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Date: ${new Date().toLocaleDateString()}`);
        doc.moveDown();

        doc.text(`To, \n     The HR Department, \n     [Company Name]`, { align: 'left' });
        doc.moveDown();

        doc.text(`Subject: Application for Leave\n`, { align: 'left' });
        doc.moveDown();

        doc.text(`Respected Sir/Madam,\n`, { align: 'left' });
        doc.moveDown();

        doc.text(`I, ${applicantName}, would like to request leave from ${startDate} to ${endDate} due to ${reason}. Kindly consider my application and grant me leave for the mentioned dates.\n`, { align: 'left' });
        doc.moveDown();

        doc.text(`Thank you,\n${applicantName}`, { align: 'left' });
        doc.moveDown();

        doc.pipe(res); //important
        doc.end();


    } catch (error) {
        console.log(error)
    }
}