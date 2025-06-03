import{Link} from 'react-router-dom';
export default function Home(){
    return(
<div className="min-h-screen bg-gradient-to-b from-orange-500 via-yellow-400 to-black text-black">
            
      <section className="text-center py-20 ">
        <h2 className="text-4xl font-semibold mb-4">Cook Smarter with AI</h2>
        <p className="text-lg text-gray-600 mb-6">
          Enter ingredients you have, and let our AI create delicious recipes!
        </p>
        <Link to="/recipes">
          <button className="px-6 py-3 bg-black text-yellow-400 rounded-xl hover:bg-yellow-400 hover:text-black transition-all">
            Generate Recipe
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6 px-8 py-16">
        <div className="bg-white  p-6 rounded-xl ">
          <h3 className="font-bold text-xl mb-2">Fast & Easy</h3>
          <p className="text-gray-600">Get instant recipes based on your inputs.</p>
        </div>
        <div className="bg-white p-6  rounded-xl ">
          <h3 className="font-bold text-xl mb-2">Zero Waste</h3>
          <p className="text-gray-600">Use what's in your fridge—nothing goes to waste.</p>
        </div>
        <div className="bg-white  p-6 rounded-xl">
          <h3 className="font-bold text-xl mb-2">Smart Suggestions</h3>
          <p className="text-gray-600">AI suggests enhancements and substitutions.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t mt-12 text-gray-500 text-sm">
        © 2025 AI Recipe Generator. All rights reserved.
      </footer>
    </div>
  );
}