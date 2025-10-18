const PRIMARY_COLOR_HEX = "#C263F2"; 
const SECONDARY_COLOR_HOVER_HEX = "#E6E6FA"; 

export default function Features() {
  return (
    <section id="learn" className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
        {[
          {
            title: "Smart Onboarding",
            description: "We use a dynamic conversation to learn about your current health, goals, and motivations.",
          },
          {
            title: "Personal Wellness Plan",
            description: "Receive an evolving nutrition, activity, and mental health plan crafted just for you by our AI.",
          },
          {
            title: "Fun & Motivating",
            description: "A gamified experience complete with AI avatars, milestone rewards, and community-based challenges.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-2xl shadow-xl transition duration-300 hover:shadow-2xl hover:translate-y-[-2px] border-t-4"
            style={{ borderColor: PRIMARY_COLOR_HEX }}
          >
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}