import React from "react";
import { Select, MenuItem, Button } from "@material-ui/core";

const DownloadForm = ({
  selectedFormat,
  onDownloadFormatChange,
  onDownloadData
}) => {
  const handleDownloadFormatChange = (event) => {
    const format = event.target.value;
    onDownloadFormatChange(format);
  };

  return (
    <div>
      Download Format:
      <Select
        value={selectedFormat}
        onChange={handleDownloadFormatChange}
      >
        <MenuItem value="csv">CSV</MenuItem>
        <MenuItem value="json">JSON</MenuItem>
      </Select>
      <Button variant="contained" onClick={onDownloadData}>
        Download
      </Button>
    </div>
  );
};

export default DownloadForm;
