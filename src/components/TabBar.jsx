import { Home, Dumbbell, Utensils, Bot, User } from "lucide-react";

export default function TabBar({ active, onChange }) {
  const items = [
    { key: "home", label: "Home", icon: Home },
    { key: "exercises", label: "Exercises", icon: Dumbbell },
    { key: "nutrition", label: "Nutrition", icon: Utensils },
    { key: "ai", label: "AI Coach", icon: Bot },
    { key: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="sticky bottom-0 z-30 bg-white border-t border-gray-100">
      <ul className="grid grid-cols-5">
        {items.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <li key={key} className="">
              <button
                aria-label={label}
                onClick={() => onChange(key)}
                className={`w-full py-2.5 flex flex-col items-center gap-1 text-xs focus:outline-none ${
                  isActive ? "text-[#008080]" : "text-gray-500"
                }`}
              >
                <Icon size={20} />
                <span className="sr-only sm:not-sr-only">{label}</span>
                <span aria-hidden className={`h-0.5 mt-1 rounded w-6 ${isActive ? "bg-[#008080]" : "bg-transparent"}`} />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
