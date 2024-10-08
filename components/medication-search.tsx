"use client"

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function MedicationSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    // TODO: Implement actual search logic using Supabase
    const mockResults = [
      { id: 1, name: 'Acetaminophen', dosage: '500-1000 mg every 4-6 hours' },
      { id: 2, name: 'Ibuprofen', dosage: '200-400 mg every 4-6 hours' },
      { id: 3, name: 'Amoxicillin', dosage: '250-500 mg every 8 hours' },
    ];
    setSearchResults(mockResults);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medication Search</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Search medications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        <ul className="space-y-2">
          {searchResults.map((medication) => (
            <li key={medication.id} className="border p-2 rounded">
              <strong>{medication.name}</strong>: {medication.dosage}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}