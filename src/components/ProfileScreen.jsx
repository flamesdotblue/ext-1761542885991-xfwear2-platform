import { useState } from "react";

export default function ProfileScreen({ user, onUpdateUser }) {
  const [form, setForm] = useState(user);

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const save = () => {
    onUpdateUser(form);
    alert("Profile updated");
  };

  return (
    <section className="p-4 space-y-4">
      <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-4">
        <h3 className="font-semibold">Personal Information</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="block text-xs text-gray-600">Name</label>
            <input value={form.name} onChange={e=>update('name', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          </div>
          <div>
            <label className="block text-xs text-gray-600">Height (cm)</label>
            <input type="number" value={form.heightCm} onChange={e=>update('heightCm', Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          </div>
          <div>
            <label className="block text-xs text-gray-600">Weight (kg)</label>
            <input type="number" value={form.weightKg} onChange={e=>update('weightKg', Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          </div>
          <div>
            <label className="block text-xs text-gray-600">Fitness Level</label>
            <select value={form.level} onChange={e=>update('level', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600">Goal</label>
            <select value={form.goal} onChange={e=>update('goal', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm">
              <option>Lose Fat</option>
              <option>Build Muscle</option>
              <option>Improve Endurance</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-xs text-gray-600">Daily Calorie Goal</label>
            <input type="number" value={form.dailyCalorieGoal} onChange={e=>update('dailyCalorieGoal', Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          </div>
          <div className="col-span-2">
            <label className="block text-xs text-gray-600">Dietary Preferences (comma-separated)</label>
            <input value={form.dietaryPrefs.join(', ')} onChange={e=>update('dietaryPrefs', e.target.value.split(',').map(s=>s.trim()).filter(Boolean))} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
          </div>
        </div>
        <button onClick={save} className="w-full py-2.5 rounded-lg bg-[#008080] text-white text-sm font-medium active:scale-[.99]">Save</button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <h3 className="font-semibold">Connected Devices</h3>
        <p className="text-xs text-gray-600 mt-1">Connect your smartwatch to sync steps and heart rate.</p>
        <div className="mt-3 flex items-center gap-2">
          <button className="px-3 py-2 rounded-lg border border-gray-200 text-xs">Connect Apple Health</button>
          <button className="px-3 py-2 rounded-lg border border-gray-200 text-xs">Connect Google Fit</button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <h3 className="font-semibold">Progress History</h3>
        <div className="mt-3 grid grid-cols-3 gap-3 text-center">
          {["Weight","Steps","Calories"].map((k,i)=>(
            <div key={i} className="p-3 rounded-lg bg-gray-50">
              <div className="text-xs text-gray-500">{k}</div>
              <div className="text-sm font-semibold">{i===0? form.weightKg + ' kg' : i===1? '9,200' : '2,150'}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
