import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2, XCircle } from 'lucide-react';

export function Scan() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);

  const { target, vulnerabilities } = location.state || {
    target: '',
    vulnerabilities: { xss: false, sqli: false, rce: false, lfi: false },
  };

  useEffect(() => {
    if (!target) {
      navigate('/');
      return;
    }

    const startScan = async () => {
      setIsScanning(true);
      
      // Simulate scan progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setProgress(i);
      }

      navigate('/results', {
        state: {
          target,
          vulnerabilities,
          scanTime: new Date().toISOString(),
        },
      });
    };

    startScan();
  }, [target, vulnerabilities, navigate]);

  const handleCancel = () => {
    setIsScanning(false);
    navigate('/');
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Scanning Target</h1>
      
      <div className="space-y-6">
        <div className="border border-[var(--primary)] rounded p-4">
          <h2 className="text-xl mb-2">Target Information</h2>
          <p className="font-mono">{target}</p>
          <div className="mt-2">
            <h3 className="text-sm mb-1">Selected Vulnerabilities:</h3>
            <ul className="list-disc list-inside">
              {Object.entries(vulnerabilities)
                .filter(([, value]) => value)
                .map(([key]) => (
                  <li key={key} className="uppercase">{key}</li>
                ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative h-2 bg-black border border-[var(--primary)]">
            <div
              className="absolute top-0 left-0 h-full bg-[var(--primary)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isScanning && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              <span>{progress}% Complete</span>
            </div>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2"
            >
              <XCircle className="w-4 h-4" />
              <span>Cancel Scan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}