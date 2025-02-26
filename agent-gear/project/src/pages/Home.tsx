import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, AlertTriangle, Bug } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();
  const [target, setTarget] = useState('');
  const [vulnerabilities, setVulnerabilities] = useState({
    xss: false,
    sqli: false,
    rce: false,
    lfi: false,
  });

  const recentExploits = [
    {
      cve: 'CVE-2023-1234',
      description: 'Critical XSS vulnerability in web application',
      code: '<script>alert(document.cookie)</script>',
    },
    {
      cve: 'CVE-2023-5678',
      description: 'SQL Injection in authentication endpoint',
      code: "' OR '1'='1",
    },
    // Add more mock exploits here
  ];

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/scan', { state: { target, vulnerabilities } });
  };

  return (
    <div className="space-y-8">
      <section className="card">
        <h1 className="text-3xl font-bold mb-6">Bug Bounty Scanner</h1>
        
        <form onSubmit={handleScan} className="space-y-6">
          <div>
            <label className="block mb-2">Target IP/Domain</label>
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="example.com"
              className="w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Select Vulnerabilities</label>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(vulnerabilities).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      setVulnerabilities((prev) => ({
                        ...prev,
                        [key]: e.target.checked,
                      }))
                    }
                    className="form-checkbox"
                  />
                  <span className="uppercase">{key}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <span>Start Scan</span>
          </button>
        </form>
      </section>

      <section className="card">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Bug className="w-6 h-6 mr-2" />
          Recent Exploits
        </h2>
        <div className="space-y-4">
          {recentExploits.map((exploit) => (
            <div
              key={exploit.cve}
              className="p-4 border border-[var(--primary)] rounded"
            >
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-[var(--primary)]" />
                <h3 className="font-bold">{exploit.cve}</h3>
              </div>
              <p className="mb-2">{exploit.description}</p>
              <pre className="bg-black p-2 rounded overflow-x-auto">
                <code>{exploit.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}