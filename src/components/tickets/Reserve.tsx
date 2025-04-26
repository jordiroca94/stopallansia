"use client";

import { useState } from "react";
import { Check, Music } from "lucide-react";

export default function TicketsContent() {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  const tickets = [
    {
      id: "early-bird",
      name: "Early Bird",
      price: 199,
      description: "General admission for all 4 days",
      features: [
        "Access to all main stages",
        "Camping access (tent not included)",
        "Access to food vendors and bars",
        "Festival app access",
      ],
      available: true,
      popular: false,
    },
    {
      id: "regular",
      name: "Regular",
      price: 249,
      description: "Full festival experience",
      features: [
        "Access to all main stages",
        "Camping access (tent not included)",
        "Access to food vendors and bars",
        "Festival app access",
        "Tote bag",
      ],
      available: true,
      popular: true,
    },
    {
      id: "vip",
      name: "VIP",
      price: 399,
      description: "Premium festival experience",
      features: [
        "Access to all stages including VIP viewing areas",
        "Premium camping area",
        "VIP lounge access with complimentary drinks",
        "Festival merchandise pack",
        "Backstage tour",
        "Fast-track entry",
      ],
      available: true,
      popular: false,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 text-white">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl">
          Get Your Tickets
        </h1>
      </div>

      <div className="mx-auto max-w-5xl">
        {/* Ticket Selection */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`relative rounded-xl p-1 transition-all duration-300 ${
                selectedTicket === ticket.id
                  ? "scale-105 bg-gradient-to-br from-white/50 to-white/20"
                  : "bg-white/5 hover:bg-white/10"
              } border-white/30`}
            >
              <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                <h3 className="mb-1 text-2xl font-bold">{ticket.name}</h3>
                <div className="mb-4 flex items-baseline">
                  <span className="text-3xl font-bold">${ticket.price}</span>
                  <span className="ml-1 text-sm opacity-80">/ person</span>
                </div>
                <p className="mb-4 text-sm opacity-90">{ticket.description}</p>

                <ul className="mb-6 space-y-2">
                  {ticket.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="mr-2 h-5 w-5 shrink-0 text-white" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedTicket(ticket.id)}
                  className={`w-full rounded-full py-3 text-center font-bold transition-all duration-300 ${
                    selectedTicket === ticket.id
                      ? "bg-white text-[#2d112b]"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {selectedTicket === ticket.id ? "SELECTED" : "SELECT"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Form */}
        {selectedTicket && (
          <div className="mb-16 rounded-xl bg-white/10 p-8 backdrop-blur-sm">
            <h2 className="mb-6 text-3xl font-bold">Complete Your Purchase</h2>

            <form className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-medium"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="w-full rounded-md border border-white/20 bg-white/5 p-3 text-white placeholder-white/50 backdrop-blur-sm focus:border-white/50 focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-md border border-white/20 bg-white/5 p-3 text-white placeholder-white/50 backdrop-blur-sm focus:border-white/50 focus:outline-none"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full rounded-md border border-white/20 bg-white/5 p-3 text-white placeholder-white/50 backdrop-blur-sm focus:border-white/50 focus:outline-none"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="quantity"
                    className="mb-2 block text-sm font-medium"
                  >
                    Number of Tickets
                  </label>
                  <select
                    id="quantity"
                    className="w-full rounded-md border border-white/20 bg-white/5 p-3 text-white backdrop-blur-sm focus:border-white/50 focus:outline-none"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="promoCode"
                    className="mb-2 block text-sm font-medium"
                  >
                    Promo Code (Optional)
                  </label>
                  <input
                    type="text"
                    id="promoCode"
                    className="w-full rounded-md border border-white/20 bg-white/5 p-3 text-white placeholder-white/50 backdrop-blur-sm focus:border-white/50 focus:outline-none"
                    placeholder="Enter promo code if you have one"
                  />
                </div>

                <div className="flex items-start space-x-2 pt-4">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-[#2d112b]"
                  />
                  <label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <a href="#" className="underline">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-bold text-[#2d112b] transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <span className="absolute h-0 w-0 rounded-full bg-[#2d112b] opacity-10 transition-all duration-300 group-hover:h-56 group-hover:w-56"></span>
                  <span className="relative flex items-center">
                    <span>PROCEED TO PAYMENT</span>
                    <span className="ml-2 rounded-full bg-[#2d112b] p-1 text-white">
                      <Music className="h-4 w-4" />
                    </span>
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
