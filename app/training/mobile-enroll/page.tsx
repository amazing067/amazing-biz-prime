import MobileEnrollWizard from "@/components/MobileEnrollWizard";
import data from "@/data/mobile-enroll-wizard.ko.json";

export default function Page() {
  return (
    <main className="min-h-screen bg-navy-deep text-white py-10">
      <MobileEnrollWizard data={data as any} />
    </main>
  );
}

