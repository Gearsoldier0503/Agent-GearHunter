import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Download, ArrowLeft, Shield, AlertTriangle } from 'lucide-react';

export function Results() {
  const location = useLocation();
  const { target, vulnerabilities, scanTime } = location.state || {};

  const mockResults = [
    {
      cve: 'CVE-2023-1234',
      description: 'Cross-Site Scripting (XSS) vulnerability found in login form',
      severity: 'High',
      method: 'POST /api/login',
      poc: '<script>alert("XSS")</script>',
    },
    {
      cve: 'CVE-2023-5678',
      description: 'SQL Injection vulnerability in user search endpoint',
      severity: 'Critical',
      method: 'GET /api/users/search',
      poc: "' OR '1'='1",
    },
  ];

  const mockLogs = [
    '[2025-02-24 10:22:15] Starting scan on target: ' + target,
    '[2025-02-24 10:22:16] Checking for XSS vulnerabilities...',
    '[2025-02-24 10:22:17] Found potential XSS in login form',
    '[2025-02-24 10:22:18] Checking for SQL injection...',
    '[2025-02-24 10:22:19] Critical: SQL injection vulnerability detected',
  ];

  const handleDownload = () => {
    const data = {
      target,
      scanTime,
      vulnerabilities,
      results: mockResults,
      logs: mockLogs,
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scan-results-${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 hover:text-[var(--primary)]">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <button onClick={handleDownload} className="flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Download Results</span>
        </button>
      </div>

      <div className="card">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="w-6 h-6" />
          <h1 className="text-3xl font-bold">Scan Results</h1>
        </div>
        
        <div className="space-y-2 mb-6">
          <p><strong>Target:</strong> {target}</p>
          <p><strong>Scan Time:</strong> {scanTime}</p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Vulnerabilities Found</h2>
            <div className="space-y-4">
              {mockResults.map((result, index) => (
                <div key={index} className="border border-[var(--primary)] rounded p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-[var(--primary)]" />
                    <h3 className="font-bold">{result.cve}</h3>
                    <span className="ml-auto text-sm">{result.severity}</span>
                  </div>
                  <p className="mb-2">{result.description}</p>
                  <p className="text-sm mb-2">Method: {result.method}</p>
                  <pre className="bg-black p-2 rounded overflow-x-auto">
                    <code>{result.poc}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Scan Logs</h2>
            <pre className="bg-black p-4 rounded overflow-x-auto h-48 overflow-y-auto">
              {mockLogs.join('\n')}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}