import { Navbar } from '@/components/navbar';
import { DosageCalculator } from '@/components/dosage-calculator';
import { DropsPerMinuteCalculator } from '@/components/drops-per-minute-calculator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">NurseAid</h1>
        <Tabs defaultValue="dosage" className="w-full max-w-md mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dosage">Dosage Calculator</TabsTrigger>
            <TabsTrigger value="drops">Drops per Minute</TabsTrigger>
          </TabsList>
          <TabsContent value="dosage">
            <DosageCalculator />
          </TabsContent>
          <TabsContent value="drops">
            <DropsPerMinuteCalculator />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}