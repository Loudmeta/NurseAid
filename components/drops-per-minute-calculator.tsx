"use client"

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function DropsPerMinuteCalculator() {
  const [dropFactor, setDropFactor] = useState('');
  const [volume, setVolume] = useState('');
  const [time, setTime] = useState('');
  const [timeUnit, setTimeUnit] = useState('hours');
  const [result, setResult] = useState('');
  const [alert, setAlert] = useState('');

  const calculateDropsPerMinute = () => {
    if (!dropFactor || !volume || !time) {
      setAlert('Please fill in all fields.');
      return;
    }

    const dropFactorNum = parseFloat(dropFactor);
    const volumeNum = parseFloat(volume);
    const timeNum = parseFloat(time);

    if (isNaN(dropFactorNum) || isNaN(volumeNum) || isNaN(timeNum)) {
      setAlert('Please enter valid numbers for all fields.');
      return;
    }

    let timeInMinutes = timeNum;
    if (timeUnit === 'hours') {
      timeInMinutes = timeNum * 60;
    }

    const dropsPerMinute = (volumeNum * dropFactorNum) / timeInMinutes;
    setResult(`Drops per minute: ${dropsPerMinute.toFixed(2)}`);
    setAlert('');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl sm:text-2xl">Drops per Minute Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="dropFactor" className="text-sm sm:text-base">Drop Factor (drops/mL)</Label>
            <Input
              id="dropFactor"
              type="number"
              value={dropFactor}
              onChange={(e) => setDropFactor(e.target.value)}
              placeholder="Enter drop factor"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="volume" className="text-sm sm:text-base">Volume (mL)</Label>
            <Input
              id="volume"
              type="number"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              placeholder="Enter volume"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="time" className="text-sm sm:text-base">Time</Label>
            <div className="flex mt-1 space-x-2">
              <Input
                id="time"
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Enter time"
                className="flex-grow"
              />
              <Select value={timeUnit} onValueChange={setTimeUnit}>
                <SelectTrigger className="w-[110px]">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minutes">Minutes</SelectItem>
                  <SelectItem value="hours">Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={calculateDropsPerMinute} className="w-full">Calculate Drops per Minute</Button>
        </div>
        {alert && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{alert}</AlertDescription>
          </Alert>
        )}
        {result && (
          <Alert variant="default" className="mt-4">
            <AlertTitle>Result</AlertTitle>
            <AlertDescription>{result}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}