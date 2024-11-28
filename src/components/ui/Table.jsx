import PropTypes from "prop-types";
import { cn } from "../../utils/cn";

const Table = ({ className, children }) => {
  return (
    <div className="w-full overflow-auto">
      <table
        className={cn(
          "w-full caption-bottom text-sm",
          className
        )}
      >
        {children}
      </table>
    </div>
  );
};

const TableHeader = ({ className, children }) => {
  return (
    <thead className={cn("[&_tr]:border-b", className)}>
      {children}
    </thead>
  );
};

const TableBody = ({ className, children }) => {
  return (
    <tbody
      className={cn("[&_tr:last-child]:border-0", className)}
    >
      {children}
    </tbody>
  );
};

const TableFooter = ({ className, children }) => {
  return (
    <tfoot
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
    >
      {children}
    </tfoot>
  );
};

const TableRow = ({ className, children }) => {
  return (
    <tr
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
    >
      {children}
    </tr>
  );
};

const TableHead = ({ className, children }) => {
  return (
    <th
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
    >
      {children}
    </th>
  );
};

const TableCell = ({ className, children }) => {
  return (
    <td
      className={cn(
        "p-4 align-middle [&:has([role=checkbox])]:pr-0",
        className
      )}
    >
      {children}
    </td>
  );
};

const TableCaption = ({ className, children }) => {
  return (
    <caption
      className={cn(
        "mt-4 text-sm text-muted-foreground",
        className
      )}
    >
      {children}
    </caption>
  );
};

const commonPropTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Table.propTypes = commonPropTypes;
TableHeader.propTypes = commonPropTypes;
TableBody.propTypes = commonPropTypes;
TableFooter.propTypes = commonPropTypes;
TableRow.propTypes = commonPropTypes;
TableHead.propTypes = commonPropTypes;
TableCell.propTypes = commonPropTypes;
TableCaption.propTypes = commonPropTypes;

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
}; 