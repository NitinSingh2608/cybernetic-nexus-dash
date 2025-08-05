import { useState, useEffect } from 'react';

interface SheetData {
  Clients: string;
  'No. of Products': string;
  Price: string;
  Status: string;
  Email: string;
}

export function useGoogleSheets() {
  const [data, setData] = useState<SheetData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        'https://docs.google.com/spreadsheets/d/18abfzA-icdzsf5xrU0myk_SLzSCC-ff3voy6nFdwbnI/export?format=csv',
        {
          headers: {
            'Accept': 'text/csv',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const csvText = await response.text();
      const lines = csvText.trim().split('\n');
      const headers = lines[0].split(',');
      
      const parsedData = lines.slice(1).map(line => {
        const values = line.split(',');
        const row: any = {};
        headers.forEach((header, index) => {
          row[header.trim()] = values[index]?.trim() || '';
        });
        return row;
      });

      setData(parsedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching Google Sheets data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Manual refresh function
  const refresh = () => {
    fetchData();
  };

  return { data, loading, error, refresh };
}