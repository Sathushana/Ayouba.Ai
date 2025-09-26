export default function Features() {
  return (
    <section id="learn" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10 text-center">
        <div className="p-6 bg-white rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2 text-black">Smart Onboarding</h3>
          <p className="text-gray-600">We use a dynamic conversation to learn about you and your goals.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2  text-black">Personal Wellness Plan</h3>
          <p className="text-gray-600">Receive evolving nutrition and activity plans crafted just for you.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2  text-black">Fun & Motivating</h3>
          <p className="text-gray-600">Gamified experience with avatars, rewards, and community challenges.</p>
        </div>
      </div>
    </section>
  );
}
