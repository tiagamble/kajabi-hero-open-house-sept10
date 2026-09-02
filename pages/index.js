import { useState, useMemo } from 'react';
import heroes from '../data/heroes.json';

const STAGES = ['All Stages', 'Scale', 'Growth', 'Established', 'Launch', 'Transition'];

const STAGE_COLORS = {
  Scale: 'stage-scale',
  Growth: 'stage-growth',
  Established: 'stage-established',
  Launch: 'stage-launch',
  Transition: 'stage-transition',
};

function HeroCard({ hero }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="flip-card h-96 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div className="flip-card-front card p-6 flex flex-col items-center justify-center">
          {/* Photo Circle(s) */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="hero-circle bg-gray-200 flex items-center justify-center overflow-hidden">
              {hero.photo ? (
                <img src={hero.photo} alt={hero.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-sm">No photo</span>
              )}
            </div>
            {hero.plusOne && (
              <div className="hero-circle-small bg-gray-200 flex items-center justify-center overflow-hidden">
                {hero.plusOne.photo ? (
                  <img src={hero.plusOne.photo} alt={hero.plusOne.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <span className="text-gray-400 text-xs font-bold">+1</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <h2 className="text-lg font-bold text-center mb-1">{hero.name}</h2>
          <p className="text-sm text-gray-600 text-center mb-2">{hero.businessName}</p>
          {hero.website && <p className="text-xs text-kajabi-gold text-center mb-3 hover:underline">{hero.website}</p>}
          <p className="text-xs text-gray-500 text-center mb-3 uppercase tracking-wide">{hero.niche}</p>

          <div className="flex justify-center mb-4">
            <span className={`stage-badge ${STAGE_COLORS[hero.stage] || 'bg-gray-400 text-white'}`}>
              {hero.stage}
            </span>
          </div>

          <div className="flex gap-6 text-center text-xs">
            <div>
              <p className="text-gray-500 uppercase tracking-wide">Tenure</p>
              <p className="font-semibold">{hero.vitals.tenure}</p>
            </div>
            <div>
              <p className="text-gray-500 uppercase tracking-wide">MRR</p>
              <p className="font-semibold">${hero.vitals.mrr}</p>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center mt-4">Click to flip</p>

          
            href={hero.googleDocLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-3 inline-block px-4 py-2 bg-kajabi-sage text-white text-xs font-bold rounded-md hover:bg-opacity-90 transition-all"
          >
            Full Profile
          </a>
        </div>

        {/* Back */}
        <div className="flip-card-back card p-6 flex flex-col justify-start overflow-y-auto">
          <h3 className="text-sm font-bold text-kajabi-teal mb-3">CSM Focus</h3>
          <p className="text-xs text-gray-700 mb-4 line-clamp-3">{hero.csmFocus}</p>

          <h3 className="text-sm font-bold text-kajabi-teal mb-2">Technical Support</h3>
          <p className="text-xs text-gray-700 mb-4 line-clamp-3">{hero.technicalSupport}</p>

          {hero.riskFlags && (
            <>
              <h3 className="text-sm font-bold text-kajabi-teal mb-2">Risk Flags</h3>
              <p className="text-xs text-gray-700 line-clamp-3">{hero.riskFlags}</p>
            </>
          )}

          <p className="text-xs text-gray-400 text-center mt-auto">Click to flip back</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedStage, setSelectedStage] = useState('All Stages');

  const filteredHeroes = useMemo(() => {
    return heroes.filter((hero) => {
      const matchesSearch =
        hero.name.toLowerCase().includes(search.toLowerCase()) ||
        hero.businessName.toLowerCase().includes(search.toLowerCase()) ||
        hero.niche.toLowerCase().includes(search.toLowerCase());

      const matchesStage = selectedStage === 'All Stages' || hero.stage === selectedStage;

      return matchesSearch && matchesStage;
    });
  }, [search, selectedStage]);

  return (
    <div className="min-h-screen bg-kajabi-beige">
      <header className="border-b border-gray-300 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 border-b border-gray-200 text-xs">
            <span className="text-gray-500">kajabi</span>
            <span className="text-gray-500">September 10, 2026</span>
            <button
              onClick={() => {
                localStorage.removeItem('hero-auth-sept10');
                window.location.href = '/';
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>

          <div className="py-4 mb-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 bg-black flex items-center justify-center rounded-sm flex-shrink-0">
                <span className="text-white text-xs font-bold">K</span>
              </div>
              <h1 className="text-2xl font-bold text-black">Hero Open House</h1>
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by name, business, or niche..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-kajabi-teal"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {STAGES.map((stage) => (
                <button
                  key={stage}
                  onClick={() => setSelectedStage(stage)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedStage === stage
                      ? stage === 'All Stages'
                        ? 'bg-kajabi-gold text-white'
                        : `bg-kajabi-sage text-white`
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-gray-600 mb-6">
          {filteredHeroes.length} of {heroes.length} heroes
        </p>

        {filteredHeroes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No heroes match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHeroes.map((hero) => (
              <HeroCard key={hero.id} hero={hero} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
