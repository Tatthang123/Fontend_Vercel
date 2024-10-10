import React, { useContext } from "react";
import { WebGeneratorContext } from "../contexts/WebGeneratorContext";

function GeneratedWebPreview() {
  const { generatedCode } = useContext(WebGeneratorContext);

  if (!generatedCode) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Generated Website Preview</h2>
      <div className="border rounded p-4">
        <h3 className="text-xl font-semibold mb-2">Generated Code:</h3>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
          <code>{generatedCode}</code>
        </pre>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Live Preview:</h3>
        <iframe
          title="Generated Website Preview"
          srcDoc={generatedCode}
          className="w-full h-96 border rounded"
        />
      </div>
    </div>
  );
}

export default GeneratedWebPreview;
