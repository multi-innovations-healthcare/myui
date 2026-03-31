import React from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { toast } from "sonner";

const commands = {
  npm: "npm install myui",
  pnpm: "pnpm add myui",
  yarn: "yarn add myui",
  bun: "bun add myui",
};

export default function InstallTabs() {
  const [active, setActive] = React.useState<keyof typeof commands>("npm");
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(commands[active]);
    setCopied(true);
    toast.success("Command copied");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 dark:bg-black rounded-xl border border-gray-800 shadow-xl overflow-hidden group relative">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70"></div>

      {/* Tabs */}
      <div className="flex items-center gap-2 px-4 pt-3 pb-2 border-b border-gray-800/50">
        {Object.keys(commands).map((key) => (
          <button
            key={key}
            onClick={() => setActive(key as keyof typeof commands)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
              ${active === key
                ? "bg-gray-700/80 text-white shadow-sm"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Code */}
      <div className="flex items-center justify-between px-4 py-4 bg-black/20">
        <div className="flex items-center gap-3">
          <Terminal className="text-gray-500 w-5 h-5" />
          <code className="text-gray-200 font-mono text-sm selection:bg-indigo-500/30">
            {commands[active].split(' ').map((word, i) => (
              i === 0 ? <span key={i} className="text-pink-400 mr-2">{word}</span> : <span key={i} className="mr-2">{word}</span>
            ))}
          </code>
        </div>

        <button
          onClick={handleCopy}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Copy installation command"
        >
          {copied ? (
            <Check className="w-5 h-5 text-emerald-400" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
