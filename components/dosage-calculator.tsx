"use client"

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function DosageCalculator() {
  const [medication, setMedication] = useState('');
  const [dosageRequired, setDosageRequired] = useState('');
  const [dosageRequiredUnit, setDosageRequiredUnit] = useState('');
  const [dosageOnHand, setDosageOnHand] = useState('');
  const [dosageOnHandUnit, setDosageOnHandUnit] = useState('');
  const [routeOfAdministration, setRouteOfAdministration] = useState('');
  const [frequency, setFrequency] = useState('');
  const [results, setResults] = useState([]);
  const [alert, setAlert] = useState('');

  const calculateDosage = () => {
    if (!medication || !dosageRequired || !dosageRequiredUnit || !dosageOnHand || !dosageOnHandUnit || !routeOfAdministration || !frequency) {
      setAlert('Please fill in all fields.');
      return;
    }

    const drNum = parseFloat(dosageRequired);
    const dohNum = parseFloat(dosageOnHand);

    if (isNaN(drNum) || isNaN(dohNum)) {
      setAlert('Please enter valid numbers for Dosage Required and Dosage on Hand.');
      return;
    }

    // Convert units if necessary
    const convertedDR = convertToBaseUnit(drNum, dosageRequiredUnit);
    const convertedDOH = convertToBaseUnit(dohNum, dosageOnHandUnit);

    // Calculate required volume
    const requiredVolume = (convertedDR / convertedDOH).toFixed(2);

    const newResult = `Administer ${medication} ${requiredVolume}${dosageOnHandUnit} ${routeOfAdministration} ${frequency}.`;
    setResults([newResult, ...results]);
    setAlert('');
  };

  const convertToBaseUnit = (value: number, unit: string) => {
    switch (unit) {
      case 'g': return value * 1000;
      case 'mg': return value;
      case 'mcg': return value / 1000;
      case 'ng': return value / 1000000;
      case 'pg': return value / 1000000000;
      default: return value;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-xl sm:text-2xl">Dosage Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="medication" className="text-sm sm:text-base">Medication</Label>
              <Input
                id="medication"
                type="text"
                value={medication}
                onChange={(e) => setMedication(e.target.value)}
                placeholder="Enter medication name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="dr" className="text-sm sm:text-base">Dosage Required (DR)</Label>
              <div className="flex mt-1 space-x-2">
                <Input
                  id="dr"
                  type="number"
                  value={dosageRequired}
                  onChange={(e) => setDosageRequired(e.target.value)}
                  placeholder="Enter dosage"
                  className="flex-grow"
                />
                <Select value={dosageRequiredUnit} onValueChange={setDosageRequiredUnit}>
                  <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mcg">mcg</SelectItem>
                    <SelectItem value="mg">mg</SelectItem>
                    <SelectItem value="g">g</SelectItem>
                    <SelectItem value="ng">ng</SelectItem>
                    <SelectItem value="pg">pg</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="doh" className="text-sm sm:text-base">Dosage on Hand (DOH)</Label>
              <div className="flex mt-1 space-x-2">
                <Input
                  id="doh"
                  type="number"
                  value={dosageOnHand}
                  onChange={(e) => setDosageOnHand(e.target.value)}
                  placeholder="Enter dosage on hand"
                  className="flex-grow"
                />
                <Select value={dosageOnHandUnit} onValueChange={setDosageOnHandUnit}>
                  <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mcg">mcg</SelectItem>
                    <SelectItem value="mg">mg</SelectItem>
                    <SelectItem value="g">g</SelectItem>
                    <SelectItem value="ng">ng</SelectItem>
                    <SelectItem value="pg">pg</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="roa" className="text-sm sm:text-base">Route of Administration (ROA)</Label>
              <Select value={routeOfAdministration} onValueChange={setRouteOfAdministration}>
                <SelectTrigger id="roa" className="mt-1">
                  <SelectValue placeholder="Select route of administration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IV">IV (Intravenous)</SelectItem>
                  <SelectItem value="IM">IM (Intramuscular)</SelectItem>
                  <SelectItem value="PO">PO (Oral)</SelectItem>
                  <SelectItem value="SUB">SUB (Subcutaneous)</SelectItem>
                  <SelectItem value="SUP">SUP (Suppository)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="frequency" className="text-sm sm:text-base">Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger id="frequency" className="mt-1">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="once daily">Once daily</SelectItem>
                  <SelectItem value="BID">BID (Twice daily)</SelectItem>
                  <SelectItem value="TID">TID (Three times daily)</SelectItem>
                  <SelectItem value="QID">QID (Four times daily)</SelectItem>
                  <SelectItem value="every 4 hours">Every 4 hours</SelectItem>
                  <SelectItem value="every 6 hours">Every 6 hours</SelectItem>
                  <SelectItem value="every 8 hours">Every 8 hours</SelectItem>
                  <SelectItem value="every 12 hours">Every 12 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={calculateDosage} className="w-full">Calculate Dosage</Button>
          </div>
          {alert && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{alert}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Calculation History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {results.map((result, index) => (
                <div key={index} className="p-3 bg-secondary text-secondary-foreground rounded text-sm sm:text-base">
                  {result}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}