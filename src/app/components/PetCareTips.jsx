"use client";

import { Apple, Zap, Calendar, Brain, Scissors, Home } from 'lucide-react';

const PetCareTips = () => {
  const tips = [
    {
      icon: <Apple className="w-10 h-10" />,
      title: "Balanced Nutrition",
      desc: "Feed species-appropriate food in measured portions. Avoid human food that can be toxic to pets.",
      color: "text-red-500"
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Daily Exercise",
      desc: "Regular physical activity keeps your pet healthy and reduces destructive behavior.",
      color: "text-yellow-500"
    },
    {
      icon: <Calendar className="w-10 h-10" />,
      title: "Regular Vet Visits",
      desc: "Annual check-ups catch health issues early. Keep vaccinations and parasite prevention up to date.",
      color: "text-blue-500"
    },
    {
      icon: <Brain className="w-10 h-10" />,
      title: "Mental Stimulation",
      desc: "Puzzle toys, training sessions and social interaction keep pets mentally sharp and happy.",
      color: "text-purple-500"
    },
    {
      icon: <Scissors className="w-10 h-10" />,
      title: "Proper Grooming",
      desc: "Regular brushing, nail trims and baths as needed prevent health issues and keep pets comfortable.",
      color: "text-pink-500"
    },
    {
      icon: <Home className="w-10 h-10" />,
      title: "Safe Environment",
      desc: "Pet proof your home. Remove toxic plants, secure chemicals and create a cozy, safe space.",
      color: "text-emerald-500"
    }
  ];

  return (
    <section className="py-20 bg-[#0F172A] text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-teal-500/10 text-teal-400 text-sm font-medium rounded-full mb-4">
            Expert Advice
          </span>
          <h2 className="text-5xl font-bold mb-4">
            Expert <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Pet Care Tips</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Give your new companion the best life possible with these essential care guidelines.
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="group bg-[#1E2937] border border-gray-800 hover:border-teal-500/30 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gray-800/60 rounded-2xl mb-6 group-hover:scale-110 transition-transform ${tip.color}`}>
                {tip.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-4">{tip.title}</h3>
              <p className="text-gray-400 leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          💡 Always consult with your veterinarian for personalized advice for your pet.
        </div>
      </div>
    </section>
  );
};

export default PetCareTips;