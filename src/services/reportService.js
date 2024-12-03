import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import ExcelJS from 'exceljs';
import { formatCurrency } from '../utils/formatNumber';

export const generateReport = async (config) => {
  // Simulate API call to get report data
  const data = await getReportData(config);
  
  switch (config.format) {
    case 'pdf':
      return generatePDFReport(data, config);
    case 'excel':
      return generateExcelReport(data, config);
    case 'csv':
      return generateCSVReport(data, config);
    default:
      throw new Error('Unsupported format');
  }
};

const getReportData = async (config) => {
  // This would be replaced with actual API calls
  // Simulated data for demonstration
  const mockData = {
    sales: {
      summary: {
        totalRevenue: 15250000, // UGX
        totalOrders: 145,
        averageOrderValue: 105172,
        growth: 12.5
      },
      details: [
        { date: '2024-03-01', orders: 48, revenue: 5040000 },
        { date: '2024-03-02', orders: 52, revenue: 5460000 },
        { date: '2024-03-03', orders: 45, revenue: 4750000 }
      ],
      topProducts: [
        { name: 'Product A', sales: 28, revenue: 2940000 },
        { name: 'Product B', sales: 22, revenue: 2310000 }
      ]
    },
    // Add other report types...
  };

  return mockData[config.type];
};

const generatePDFReport = (data, config) => {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(20);
  doc.text('Sales Report', 105, 15, { align: 'center' });
  doc.setFontSize(12);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 25, { align: 'center' });

  // Add summary section
  if (config.includeSummary) {
    doc.setFontSize(16);
    doc.text('Summary', 14, 40);
    
    const summaryData = [
      ['Total Revenue', formatCurrency(data.summary.totalRevenue)],
      ['Total Orders', data.summary.totalOrders],
      ['Average Order Value', formatCurrency(data.summary.averageOrderValue)],
      ['Growth', `${data.summary.growth}%`]
    ];

    doc.autoTable({
      startY: 45,
      head: [['Metric', 'Value']],
      body: summaryData,
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [59, 130, 246] }
    });
  }

  // Add charts if requested
  if (config.includeCharts) {
    // Add charts using a charting library
    // This would require additional implementation
  }

  // Add detailed data
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 15,
    head: [['Date', 'Orders', 'Revenue']],
    body: data.details.map(row => [
      row.date,
      row.orders,
      formatCurrency(row.revenue)
    ]),
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [59, 130, 246] }
  });

  return doc.save('report.pdf');
};

const generateExcelReport = async (data, config) => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'InvenEase';
  workbook.lastModifiedBy = 'InvenEase';
  workbook.created = new Date();
  workbook.modified = new Date();
  
  // Create summary worksheet
  if (config.includeSummary) {
    const summarySheet = workbook.addWorksheet('Summary');
    
    // Add title
    summarySheet.addRow(['Sales Report Summary']);
    summarySheet.mergeCells('A1:B1');
    summarySheet.getCell('A1').font = { bold: true, size: 14 };
    
    // Add summary data
    summarySheet.addRow(['Metric', 'Value']);
    summarySheet.addRow(['Total Revenue', formatCurrency(data.summary.totalRevenue)]);
    summarySheet.addRow(['Total Orders', data.summary.totalOrders]);
    summarySheet.addRow(['Average Order Value', formatCurrency(data.summary.averageOrderValue)]);
    summarySheet.addRow(['Growth', `${data.summary.growth}%`]);
    
    // Style the header row
    summarySheet.getRow(2).font = { bold: true };
    summarySheet.columns = [
      { key: 'metric', width: 20 },
      { key: 'value', width: 20 }
    ];
  }

  // Create details worksheet
  const detailsSheet = workbook.addWorksheet('Details');
  
  // Add headers
  detailsSheet.addRow(['Date', 'Orders', 'Revenue']);
  
  // Add data
  data.details.forEach(row => {
    detailsSheet.addRow([
      row.date,
      row.orders,
      formatCurrency(row.revenue)
    ]);
  });
  
  // Style the header row
  detailsSheet.getRow(1).font = { bold: true };
  detailsSheet.columns = [
    { key: 'date', width: 15 },
    { key: 'orders', width: 10 },
    { key: 'revenue', width: 20 }
  ];

  // Generate and download the file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'report.xlsx';
  link.click();
};

const generateCSVReport = (data, config) => {
  const csvContent = data.details.map(row => 
    `${row.date},${row.orders},${row.revenue}`
  ).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'report.csv';
  link.click();
}; 