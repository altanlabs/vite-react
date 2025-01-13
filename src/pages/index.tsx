import "@radix-ui/themes/styles.css";
import { Toggle } from '@radix-ui/react-toggle';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import { useTheme } from "../hooks/use-theme";

function Index() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <main className={`h-screen w-full ${theme === 'dark' ? 'bg-neutral-950 text-white' : 'bg-white text-black'} flex items-center justify-center`}>
      <div className="flex flex-col items-center gap-12">
        <h1 className="text-4xl font-light">Welcome to your app</h1>
        <p className="text-neutral-400">Start chatting to edit</p>
        <Toggle
          pressed={theme === 'dark'}
          onPressedChange={toggleTheme}
          className={`mt-4 px-4 py-2 rounded-full flex items-center gap-2 transition-colors
            ${theme === 'dark' 
              ? 'bg-neutral-800 hover:bg-neutral-700 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-black'
            }`}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </Toggle>
      </div>
    </main>
  );
}

export default Index;
