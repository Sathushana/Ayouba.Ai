import React from 'react';
import { Target, Droplet, Apple, Utensils, Zap, Salad, Calendar, BarChart3, ChevronRight, CheckCircle, Flame, Heart } from 'lucide-react';

const PRIMARY_COLOR = '#C263F2';
const SECONDARY_BG_COLOR = '#E6E6FA';

const mockNutritionData = {
  userName: 'Kai',
  goal: 'Limit Sugary, Salty, & Processed Foods',
  complianceScore: 78, 
  weeklyTargetCompliance: 90,
  waterLiters: 1.5,
  dailyTargetLiters: 2.5,
  progressPercentage: 78,
  nextAction: {
    title: 'Balanced Lunch Prep',
    tip: 'Integrate lean protein and a fiber-rich vegetable from your plan.',
    focus: 'Diet Diversity',
  },
  milestones: [
    { name: '7-day Sugar-Free streak', achieved: false, target: '2025-10-24' },
    { name: 'Hit 2.5L Water 5 times', achieved: true, target: '2025-10-12' },
    { name: 'Cook 3 home-meals this week', achieved: false, target: '2025-10-31' },
  ],
  weeklyMetrics: [
    { icon: <Droplet className="size-5 text-blue-400" />, label: 'Water Intake', value: '1.5 / 2.5 L', trend: 'Up 10%' },
    { icon: <Apple className="size-5 text-green-400" />, label: 'Fruits/Veggies', value: '5/7 Days', trend: 'Steady' },
    { icon: <Utensils className="size-5 text-red-400" />, label: 'Processed Meals', value: '4 Times', trend: 'Down 1 Time' },
    { icon: <BarChart3 className="size-5 text-yellow-400" />, label: 'Meal Tracking', value: '6/7 Days', trend: 'On Track' },
  ],
};

const Card = ({ children, className = '' }) => (
  <div className={`p-6 rounded-2xl shadow-xl transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const ProgressBar = ({ percentage }) => (
  <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
    <div
      className="h-2.5 rounded-full transition-all duration-700 ease-out"
      style={{
        width: `${percentage}%`,
        background: `linear-gradient(90deg, ${PRIMARY_COLOR} 0%, #63F2C2 100%)`, // Secondary accent color for gradient
      }}
    />
  </div>
);

const MetricItem = ({ icon, label, value, trend }) => (
  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition duration-200">
    <div className="flex items-center space-x-3">
      {icon}
      <span className="text-sm font-medium text-gray-300">{label}</span>
    </div>
    <div className="text-right">
      <p className="text-lg font-bold text-white">{value}</p>
      <p className={`text-xs ${trend.includes('Up') ? 'text-green-400' : trend.includes('Down') ? 'text-red-400' : 'text-gray-400'}`}>
        {trend}
      </p>
    </div>
  </div>
);

const MilestoneItem = ({ name, achieved }) => (
  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl mb-3 border border-gray-700 hover:border-violet-500 transition duration-200">
    <div className="flex items-center space-x-3">
      {achieved ? (
        <CheckCircle className="size-5 text-green-400" />
      ) : (
        <Calendar className="size-5 text-gray-400" />
      )}
      <span className={`text-sm font-medium ${achieved ? 'text-gray-400 line-through' : 'text-white'}`}>{name}</span>
    </div>
    <div className={`px-2 py-0.5 rounded-full text-xs font-semibold ${achieved ? 'bg-green-600/30 text-green-400' : 'bg-violet-600/30 text-violet-400'}`}>
      {achieved ? 'Completed' : 'Upcoming'}
    </div>
  </div>
);


const NutritionDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 font-sans p-4 sm:p-8 md:p-12 text-white">
      {/* Header - Consistent Margin */}
      <header className="flex justify-between items-center mt-16 mb-10 md:mt-16 md:mb-12">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Nutrition Hub for <span style={{ color: PRIMARY_COLOR }}>{mockNutritionData.userName}</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">Fueling your body for optimal energy and health.</p>
        </div>
        <div className="hidden sm:block">
          <button
            style={{ backgroundColor: PRIMARY_COLOR, color: 'white' }}
            className="px-6 py-2.5 rounded-xl font-bold transition duration-300 shadow-lg hover:shadow-violet-500/50 active:scale-95 text-sm"
          >
            Log Meal
          </button>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Summary & Current Plan (Col Span 2 on Desktop) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. Goal Progress Card (Luxurious Focus) */}
          <Card className="bg-gray-800 p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <Target className="size-8" style={{ color: PRIMARY_COLOR }} />
                <h2 className="text-xl font-bold text-white">Diet Quality Score</h2>
              </div>
              <p className="text-4xl font-extrabold" style={{ color: PRIMARY_COLOR }}>
                {mockNutritionData.complianceScore}%
              </p>
            </div>
            
            <p className="text-sm text-gray-400 mt-2 mb-6">
              **{mockNutritionData.goal}** | Compliance is high, aiming for {mockNutritionData.weeklyTargetCompliance}% target.
            </p>
            
            <ProgressBar percentage={mockNutritionData.progressPercentage} />
            
            <div className="flex justify-between mt-4 text-sm text-gray-400">
              <span>0%</span>
              <span>{mockNutritionData.weeklyTargetCompliance}% Target</span>
            </div>
          </Card>

          {/* 2. Current Plan / Next Action Card (Gen-Z Focus) */}
          <Card className="bg-gray-800 border-2 border-violet-500/50">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Salad className="size-5 mr-2" style={{ color: '#63F2C2' }} />
              Your Next Nutrition Move
            </h2>
            <div
              className="p-6 rounded-xl flex flex-col sm:flex-row justify-between items-center"
              style={{ backgroundColor: SECONDARY_BG_COLOR, color: '#1f2937' }}
            >
              <div className="text-center sm:text-left space-y-1 mb-4 sm:mb-0">
                <p className="text-xs font-semibold uppercase opacity-80" style={{ color: PRIMARY_COLOR }}>
                  AI Meal Recommendation
                </p>
                <p className="text-2xl font-extrabold">{mockNutritionData.nextAction.title}</p>
                <div className="flex space-x-4 text-sm font-medium">
                  <span className="flex items-center">
                    <Utensils className="size-4 mr-1 opacity-70" />
                    {mockNutritionData.nextAction.focus}
                  </span>
                  <span className="flex items-center">
                    <Heart className="size-4 mr-1 opacity-70" />
                    {mockNutritionData.nextAction.tip}
                  </span>
                </div>
              </div>
              <button
                style={{ backgroundColor: PRIMARY_COLOR }}
                className="flex items-center px-6 py-3 rounded-full font-bold text-white transition duration-300 hover:bg-opacity-90 active:scale-95 text-sm"
              >
                View Recipe
                <ChevronRight className="size-5 ml-1" />
              </button>
            </div>
          </Card>

          {/* 3. Key Metrics Card */}
          <Card className="bg-gray-800">
            <h2 className="text-xl font-bold mb-6">
              Weekly Nutrition Breakdown
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockNutritionData.weeklyMetrics.map((metric, index) => (
                <MetricItem key={index} {...metric} />
              ))}
            </div>
          </Card>
        </div>
        
        {/* Right Column: Milestones & Habit Focus (Col Span 1 on Desktop) */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* 4. Hydration Status (Premium/Bold) */}
          <Card className="bg-gray-800 text-center p-8">
            <div className="text-5xl font-extrabold mb-1" style={{ color: '#63F2C2' }}>
              {mockNutritionData.waterLiters}L
            </div>
            <p className="text-lg font-medium text-white mb-4">
              Daily Hydration Status
            </p>
            <p className="text-sm text-gray-400">
              {mockNutritionData.waterLiters < mockNutritionData.dailyTargetLiters ? 
              `Still need ${mockNutritionData.dailyTargetLiters - mockNutritionData.waterLiters}L to hit your goal.` : 
              `Goal achieved! Excellent hydration.`}
            </p>
            <div className="h-0.5 bg-gray-700 w-1/3 mx-auto mt-4" />
          </Card>

          {/* 5. Roadmap & Milestones */}
          <Card className="bg-gray-800">
            <h2 className="text-xl font-bold mb-4">
              Dietary Roadmap
            </h2>
            <div className="space-y-3">
              {mockNutritionData.milestones.map((milestone, index) => (
                <MilestoneItem key={index} {...milestone} />
              ))}
              <button className="w-full mt-4 text-sm font-medium hover:text-gray-300 transition duration-200" style={{ color: PRIMARY_COLOR }}>
                View Full Plan <ChevronRight className="size-4 inline ml-1" />
              </button>
            </div>
          </Card>
          
          {/* 6. Habit Focus Section */}
          <Card className="bg-gray-800">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Zap className="size-5 mr-2" style={{ color: PRIMARY_COLOR }} />
              Current Habit Focus
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              {"This week, let's focus on **Eating Regular Meals**."}
            </p>
            <div className="p-4 rounded-xl border border-gray-700" style={{ backgroundColor: SECONDARY_BG_COLOR, color: '#1f2937' }}>
                <p className="font-semibold">Tip: Set an alarm for breakfast!</p>
                <p className="text-sm opacity-80 mt-1">Completing breakfast helps avoid late-day snacking.</p>
            </div>
          </Card>
          
        </div>
      </div>
      
      {/* Footer / Nav Placeholder for Mobile */}
      <footer className="fixed bottom-0 left-0 right-0 lg:hidden bg-gray-800 border-t border-gray-700 p-4 flex justify-around text-xs text-gray-400">
          <div className="text-center">
              <Utensils className="size-5 mx-auto mb-1" style={{ color: PRIMARY_COLOR }} />
              <span style={{ color: PRIMARY_COLOR }}>Nutrition</span>
          </div>
          <div className="text-center">
              <Target className="size-5 mx-auto mb-1" />
              <span>Goals</span>
          </div>
          <div className="text-center">
              <Calendar className="size-5 mx-auto mb-1" />
              <span>Calendar</span>
          </div>
          <div className="text-center">
              <ChevronRight className="size-5 mx-auto mb-1" />
              <span>More</span>
          </div>
      </footer>
    </div>
  );
};

export default NutritionDashboard;
