import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from './ui/Modal';
import { Button, Input, Card } from './ui';
import { CalendarIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { cn } from '../utils/cn';

export const ReportBuilder = ({ isOpen, onClose, onGenerate }) => {
  const [reportConfig, setReportConfig] = useState({
    type: 'sales',
    dateRange: {
      start: '',
      end: '',
    },
    format: 'pdf',
    filters: [],
    includeCharts: true,
    includeSummary: true,
  });

  const reportTypes = [
    { id: 'sales', label: 'Sales Report', 
      fields: ['revenue', 'orders', 'average_order_value', 'top_products'] },
    { id: 'inventory', label: 'Inventory Report', 
      fields: ['stock_levels', 'low_stock', 'reorder_suggestions', 'stock_value'] },
    { id: 'customers', label: 'Customer Report', 
      fields: ['total_customers', 'new_customers', 'customer_retention', 'top_customers'] },
  ];

  const exportFormats = [
    { id: 'pdf', label: 'PDF Document', icon: '📄' },
    { id: 'excel', label: 'Excel Spreadsheet', icon: '📊' },
    { id: 'csv', label: 'CSV File', icon: '📑' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(reportConfig);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Generate Custom Report"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Report Type Selection */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Report Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reportTypes.map((type) => (
              <Card
                key={type.id}
                className={cn(
                  "cursor-pointer transition-all",
                  "hover:border-blue-500 dark:hover:border-blue-400",
                  reportConfig.type === type.id && "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                )}
                onClick={() => setReportConfig(prev => ({ ...prev, type: type.id }))}
              >
                <div className="text-center">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {type.label}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {type.fields.join(' • ')}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Start Date
            </label>
            <Input
              type="date"
              icon={CalendarIcon}
              value={reportConfig.dateRange.start}
              onChange={(e) => setReportConfig(prev => ({
                ...prev,
                dateRange: { ...prev.dateRange, start: e.target.value }
              }))}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              End Date
            </label>
            <Input
              type="date"
              icon={CalendarIcon}
              value={reportConfig.dateRange.end}
              onChange={(e) => setReportConfig(prev => ({
                ...prev,
                dateRange: { ...prev.dateRange, end: e.target.value }
              }))}
            />
          </div>
        </div>

        {/* Export Format */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Export Format
          </label>
          <div className="grid grid-cols-3 gap-4">
            {exportFormats.map((format) => (
              <button
                key={format.id}
                type="button"
                className={cn(
                  "p-4 rounded-lg border text-left",
                  "hover:border-blue-500 dark:hover:border-blue-400",
                  "transition-colors",
                  reportConfig.format === format.id && "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                )}
                onClick={() => setReportConfig(prev => ({ ...prev, format: format.id }))}
              >
                <span className="text-2xl mr-2">{format.icon}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {format.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Additional Options */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Report Options
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={reportConfig.includeCharts}
                onChange={(e) => setReportConfig(prev => ({
                  ...prev,
                  includeCharts: e.target.checked
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Include visual charts and graphs
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={reportConfig.includeSummary}
                onChange={(e) => setReportConfig(prev => ({
                  ...prev,
                  includeSummary: e.target.checked
                }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Include executive summary
              </span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Generate Report
          </Button>
        </div>
      </form>
    </Modal>
  );
};

ReportBuilder.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onGenerate: PropTypes.func.isRequired,
}; 