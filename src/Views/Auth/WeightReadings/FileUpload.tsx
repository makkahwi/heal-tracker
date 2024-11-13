import React, { useState } from "react";

import {
  analyzeDocumentWithTextract,
  extractKeyValuePairs,
  uploadFileToS3,
} from "../../../Utils/aswsTextract";

// Assuming extractKeyValuePairs is in this utility file

const FileUploadComponent: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUploadAndAnalyze = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setLoading(true);
    try {
      // Upload the file to S3
      const fileKey = await uploadFileToS3(file);
      if (!fileKey) throw new Error("File upload failed.");

      // Analyze the file with Textract
      const blocks = await analyzeDocumentWithTextract(fileKey);

      // Extract key-value pairs from blocks
      const keyValuePairs = extractKeyValuePairs(blocks);
      setAnalysisResult(keyValuePairs);
    } catch (error) {
      console.error("Error during upload and analyze:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label className="form-label text-start w-100 mt-4">
        Upload & Analyze Data
      </label>

      <div className="input-group mb-3">
        <input
          className="form-control"
          type="file"
          onChange={handleFileChange}
        />

        <button
          className="btn btn-primary"
          onClick={handleUploadAndAnalyze}
          disabled={loading}
        >
          {loading ? "Processing..." : "Upload"}
        </button>
      </div>

      {analysisResult && (
        <div>
          <h3>Analysis Result:</h3>
          <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
