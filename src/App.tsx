import SettingsTable from "./components/SettingsTable/SettingsTable";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <div className='container mx-auto py-12'>
      <h1 className='mb-8 text-center font-inria text-4xl font-bold '>
        speedlink
      </h1>
      <SettingsTable />
      <Toaster />
    </div>
  );
};

export default App;
