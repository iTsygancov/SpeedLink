import { ModeToggle } from "./components/ModeToggle/ModeToggle";
import SettingsTable from "./components/SettingsTable/SettingsTable";
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <div className='container mx-auto py-12'>
        <div className='relative'>
          <h1 className='mb-8 text-center font-inria text-4xl font-bold '>
            speedlink
          </h1>
          <ModeToggle className='absolute right-0 top-0' />
        </div>
        <SettingsTable />
        <Toaster />
      </div>
    </ThemeProvider>
  );
};

export default App;
