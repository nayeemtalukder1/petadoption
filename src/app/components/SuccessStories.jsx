"use client";

import { Star, Quote } from 'lucide-react';

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      name: "Sarah & Max",
      petType: "Labrador Mix",
      image: "https://i.ibb.co.com/5YkVv3k/dog1.jpg",
      quote: "Max was a shy rescue dog who'd been passed over dozens of times. Now he greets me at the door every day and is the heart of our family.",
      rating: 5
    },
    {
      id: 2,
      name: "John & Whiskers",
      petType: "Tabby Cat",
      image: "https://i.ibb.co.com/0jK7Z3L/cat1.jpg",
      quote: "Whiskers came as a stray kitten. Now she sleeps on my pillow and purrs me to sleep. I can't imagine life without her.",
      rating: 5
    },
    {
      id: 3,
      name: "Emma & Tweety",
      petType: "Budgerigar",
      image: "https://i.ibb.co.com/3zN7vKp/bird1.jpg",
      quote: "Our budgie Tweety learned to say 'I love you' within a week. He sings every morning and brightens our entire household!",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-[#0F172A] text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-pink-500/10 text-pink-400 text-sm font-medium rounded-full mb-4">
            Success Stories
          </span>
          <h2 className="text-5xl font-bold mb-4">
            Happy Tails & <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Happy Homes</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real stories from real families who found their perfect match through PetNest.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-[#1E2937] border border-gray-800 hover:border-purple-500/30 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Pet Image */}
              <div className="relative mb-6">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-56 object-cover rounded-2xl"
                />
                <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full text-xs font-medium">
                  {story.petType}
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(story.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative">
                <Quote className="w-8 h-8 text-purple-500/30 absolute -left-1 -top-2" />
                <p className="text-gray-300 leading-relaxed text-[15px] italic">
                  "{story.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <p className="font-semibold text-lg">{story.name}</p>
                <p className="text-gray-500 text-sm">Happy Pet Parent</p>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3.5 border border-gray-600 hover:border-purple-500 rounded-2xl text-sm font-medium transition hover:bg-purple-500/10">
            Read More Success Stories →
          </button>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;