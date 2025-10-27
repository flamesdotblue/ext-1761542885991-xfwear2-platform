import { useEffect, useState } from "react";
import TabBar from "./components/TabBar";
import HomeScreen from "./components/HomeScreen";
import ExercisesScreen from "./components/ExercisesScreen";
import NutritionScreen from "./components/NutritionScreen";
import AICoachScreen from "./components/AICoachScreen";
import ProfileScreen from "./components/ProfileScreen";

const TABS = {
  home: "Home",
  exercises: "Exercises",
  nutrition: "Nutrition",
  ai: "AI Coach",
  profile: "Profile",
};

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [user, setUser] = useState(() => ({
    name: "Alex",
    level: "Beginner",
    goal: "Lose Fat",
    heightCm: 175,
    weightKg: 78,
    dietaryPrefs: ["High Protein", "No Pork"],
    dailyCalorieGoal: 2200,
  }));

  useEffect(() => {
    const seen = localStorage.getItem("seen_onboarding_v1");
    if (!seen) setOnboardingOpen(true);
  }, []);

  const closeOnboarding = () => {
    localStorage.setItem("seen_onboarding_v1", "1");
    setOnboardingOpen(false);
  };

  return (
    <div className="min-h-dvh bg-white text-gray-900 flex flex-col font-sans">
      <header className="px-4 pt-4 pb-2 sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-6 rounded bg-[#008080]" aria-hidden />
            <h1 className="text-lg font-semibold">FitFuel</h1>
          </div>
          <div className="text-xs text-gray-500">Powered by GPT-5-NANO</div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {activeTab === "home" && <HomeScreen user={user} onQuickStart={() => setActiveTab("exercises")} />}
        {activeTab === "exercises" && (
          <ExercisesScreen
            user={user}
            onLogComplete={() => setActiveTab("home")}
          />
        )}
        {activeTab === "nutrition" && (
          <NutritionScreen user={user} onPlanReady={() => setActiveTab("home")} />
        )}
        {activeTab === "ai" && (
          <AICoachScreen user={user} onUpdateUser={setUser} />
        )}
        {activeTab === "profile" && (
          <ProfileScreen user={user} onUpdateUser={setUser} />
        )}
      </main>

      <TabBar active={activeTab} onChange={setActiveTab} />

      {onboardingOpen && (
        <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-black/40">
          <div role="dialog" aria-modal="true" aria-label="Welcome to FitFuel"
               className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-6 shadow-xl">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Welcome to FitFuel</h2>
              <p className="text-sm text-gray-600">
                Your mobile-first fitness and nutrition coach. Track progress, discover workouts, plan meals, and chat with your AI Coach.
              </p>
              <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                <li>Personalized routines and meal plans</li>
                <li>Barcode food logging and calorie tracker</li>
                <li>Progress charts and wearable sync</li>
              </ul>
              <button onClick={closeOnboarding}
                      className="w-full mt-2 py-3 rounded-xl text-white font-medium bg-[#008080] active:scale-[.99]">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
