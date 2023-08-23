import SettingsTable from "./components/SettingsTable/SettingsTable";

const App = () => {
  return (
    <div className='container mx-auto py-12'>
      <h1 className='mb-8 text-4xl font-bold'>SpeedLink shortcuts</h1>
      <SettingsTable />
    </div>
  );
};

export default App;
