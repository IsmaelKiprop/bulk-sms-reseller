import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Kimani",
    role: "Marketing Director, Nairobi Retail Group",
    image: "/api/placeholder/100/100",
    content:
      "Go Digital Africa's Bulk SMS platform has transformed how we communicate with our customers. The delivery rates are exceptional, and the analytics help us refine our messaging strategy.",
    stars: 5,
  },
  {
    name: "David Ochieng",
    role: "CEO, TechHub Kenya",
    image: "/api/placeholder/100/100",
    content:
      "We've tried several SMS providers, but none match the reliability and ease of use of Go Digital Africa. Their API integration was seamless with our existing systems.",
    stars: 5,
  },
  {
    name: "Grace Mwangi",
    role: "Operations Manager, Savannah Hotels",
    image: "/api/placeholder/100/100",
    content:
      "The scheduling feature has been a game-changer for our hotel chain. We can now automate confirmation messages and reminders, saving our staff countless hours.",
    stars: 4,
  },
  {
    name: "Michael Adeyemi",
    role: "Director, Lagos Medical Center",
    image: "/api/placeholder/100/100",
    content:
      "Patient appointment reminders have never been easier. The platform's reliability ensures our messages are delivered on time, every time.",
    stars: 5,
  },
  {
    name: "Fatima Ibrahim",
    role: "Founder, EduTech Solutions",
    image: "/api/placeholder/100/100",
    content:
      "The token-based pricing model works perfectly for our seasonal business needs. We only pay for what we use, and the M-Pesa integration makes payments effortless.",
    stars: 4,
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const next = () => {
    setCurrent((current + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        next();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoplay, current]);

  return (
    <section className="py-16 md:py-24 bg-blue-50 dark:bg-blue-900">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-600 dark:text-white">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-blue-700 dark:text-blue-200">
            Trusted by businesses across Africa to deliver their important messages
          </p>
        </div>
        <div className="relative mx-auto max-w-4xl">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="h-full border border-blue-200 dark:border-blue-700 bg-white dark:bg-blue-800 rounded-lg shadow-md">
                    <div className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-blue-300 dark:border-blue-600">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="mt-4 flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < testimonial.stars
                                  ? "fill-blue-500 text-blue-500 dark:fill-blue-300 dark:text-blue-300"
                                  : "fill-blue-200 text-blue-200 dark:fill-blue-600 dark:text-blue-600"
                              }`}
                            />
                          ))}
                        </div>
                        <blockquote className="mt-4 text-lg italic text-blue-700 dark:text-blue-100">
                          "{testimonial.content}"
                        </blockquote>
                        <div className="mt-4">
                          <div className="font-semibold text-blue-600 dark:text-white">{testimonial.name}</div>
                          <div className="text-sm text-blue-600 dark:text-blue-300">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full md:-left-6 bg-white dark:bg-blue-800 border border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-700 text-blue-600 dark:text-white p-2"
            onClick={prev}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous testimonial</span>
          </button>
          <button
            className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full md:-right-6 bg-white dark:bg-blue-800 border border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-700 text-blue-600 dark:text-white p-2"
            onClick={next}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next testimonial</span>
          </button>
        </div>
      </div>
    </section>
  );
}
