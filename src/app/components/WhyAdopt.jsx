"use client";

import { Heart, Users, ShieldCheck, Award } from 'lucide-react';

const WhyAdopt = () => {
  const features = [
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Save a Life",
      desc: "Every adoption gives a pet a second chance. You become a hero in their story.",
      color: "text-red-500"
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Join Our Community",
      desc: "Connect with thousands of happy pet owners who share tips, stories and support.",
      color: "text-blue-500"
    },
    {
      icon: <ShieldCheck className="w-10 h-10" />,
      title: "Verified & Safe",
      desc: "All pets are health-checked, vaccinated and verified before being listed.",
      color: "text-emerald-500"
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: "Lifelong Support",
      desc: "Get expert guidance on pet care, training and wellness throughout your journey.",
      color: "text-amber-500"
    }
  ];

  return (
    <section className="py-20 bg-[#0F172A] text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-purple-500/10 text-purple-400 text-sm font-medium rounded-full mb-4">
            Why PetNest?
          </span>
          <h2 className="text-5xl font-bold mb-4">
            Adopt with <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Confidence</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We make the adoption process simple, safe, and rewarding for both you and your new companion.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-[#1E2937] hover:bg-[#25334a] border border-gray-800 hover:border-purple-500/30 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gray-800/50 rounded-2xl mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                {feature.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>

              {/* Decorative line */}
              <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-8 group-hover:w-20 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAdopt;