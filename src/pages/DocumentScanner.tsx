
import { useState } from "react";
import { ArrowLeft, Camera, Upload, FileText, Scan, Check, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const DocumentScanner = () => {
  const navigate = useNavigate();
  const [scannedDocuments, setScannedDocuments] = useState([
    {
      id: 1,
      title: "Prescription - Dr. Sarah Johnson",
      date: "Dec 15, 2024",
      type: "Prescription",
      status: "processed",
      content: {
        medications: [
          { name: "Paracetamol", dosage: "500mg", frequency: "Twice daily", duration: "5 days" },
          { name: "Ibuprofen", dosage: "400mg", frequency: "As needed", duration: "For pain" }
        ],
        instructions: "Take with food. Avoid alcohol."
      },
      image: "/lovable-uploads/0244b7d0-8b84-431c-82b5-f94c445efc6b.png"
    },
    {
      id: 2,
      title: "Lab Results - Blood Test",
      date: "Dec 10, 2024",
      type: "Lab Results",
      status: "processed",
      content: {
        results: [
          { test: "Hemoglobin", value: "14.2 g/dL", range: "12.0-15.5 g/dL", status: "Normal" },
          { test: "White Blood Cells", value: "7.5 K/uL", range: "4.5-11.0 K/uL", status: "Normal" }
        ],
        notes: "All values within normal range. Follow up in 6 months."
      }
    }
  ]);

  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      // Add new scanned document
      const newDoc = {
        id: Date.now(),
        title: "New Medical Document",
        date: new Date().toLocaleDateString(),
        type: "Processing...",
        status: "processing",
        content: null
      };
      setScannedDocuments(prev => [newDoc, ...prev]);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processed': return <Check className="h-4 w-4" />;
      case 'processing': return <Scan className="h-4 w-4 animate-spin" />;
      case 'error': return <X className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Document Scanner</h1>
            <p className="text-sm text-gray-500">AI-powered medical document analysis</p>
          </div>
        </div>
      </header>

      {/* Scan Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card 
          className="glass-card p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white cursor-pointer hover:scale-105 transition-transform"
          onClick={handleScan}
        >
          <div className="text-center space-y-3">
            <Camera className="h-12 w-12 mx-auto opacity-90" />
            <div>
              <h3 className="font-semibold text-lg">Camera Scan</h3>
              <p className="text-sm opacity-90">Take a photo of your document</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 bg-gradient-to-br from-green-500 to-teal-600 text-white cursor-pointer hover:scale-105 transition-transform">
          <div className="text-center space-y-3">
            <Upload className="h-12 w-12 mx-auto opacity-90" />
            <div>
              <h3 className="font-semibold text-lg">Upload File</h3>
              <p className="text-sm opacity-90">Select from gallery</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 bg-gradient-to-br from-orange-500 to-red-600 text-white cursor-pointer hover:scale-105 transition-transform">
          <div className="text-center space-y-3">
            <FileText className="h-12 w-12 mx-auto opacity-90" />
            <div>
              <h3 className="font-semibold text-lg">Text Input</h3>
              <p className="text-sm opacity-90">Type document content</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Scanning Status */}
      {isScanning && (
        <Card className="glass-card p-6 mb-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Scan className="h-6 w-6 text-blue-600 animate-spin" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Processing Document...</h3>
              <p className="text-sm text-gray-600">AI is analyzing your document for medications, instructions, and important information.</p>
            </div>
          </div>
        </Card>
      )}

      {/* Document History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Recent Documents</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>

        {scannedDocuments.map((doc) => (
          <Card key={doc.id} className="glass-card p-4 animate-fade-in">
            <div className="flex items-start gap-4">
              {/* Document Preview */}
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                {doc.image ? (
                  <img src={doc.image} alt="Document" className="w-full h-full object-cover" />
                ) : (
                  <FileText className="h-8 w-8 text-gray-400" />
                )}
              </div>

              {/* Document Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-800">{doc.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(doc.status)}`}>
                    {getStatusIcon(doc.status)}
                    {doc.status}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{doc.date} • {doc.type}</p>

                {/* Document Content */}
                {doc.content && doc.status === 'processed' && (
                  <div className="space-y-3">
                    {doc.content.medications && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Medications:</h4>
                        <div className="space-y-1">
                          {doc.content.medications.map((med, index) => (
                            <div key={index} className="bg-blue-50 p-2 rounded text-xs">
                              <span className="font-medium">{med.name}</span> - {med.dosage}, {med.frequency}
                              {med.duration && <span> for {med.duration}</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {doc.content.results && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Lab Results:</h4>
                        <div className="space-y-1">
                          {doc.content.results.map((result, index) => (
                            <div key={index} className="bg-green-50 p-2 rounded text-xs">
                              <span className="font-medium">{result.test}</span>: {result.value} 
                              <span className="text-gray-500"> ({result.range})</span>
                              <span className={`ml-2 px-1 rounded ${result.status === 'Normal' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                {result.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {(doc.content.instructions || doc.content.notes) && (
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-700">
                          <span className="font-medium">Notes:</span> {doc.content.instructions || doc.content.notes}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentScanner;
