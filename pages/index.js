import { useState, useMemo } from 'react';
import Link from 'next/link';
import heroes from '../data/heroes.json';

const STAGES = ['All Stages', 'Scale', 'Growth', 'Established', 'Launch', 'Transition'];

const STAGE_COLORS = {
  Scale: 'stage-scale',
  Growth: 'stage-growth',
  Established: 'stage-established',
  Launch: 'stage-launch',
  Transition: 'stage-transition',
};

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedStage, setSelectedStage] = useState('All Stages');

  const filteredHeroes = useMemo(() => {
    return heroes.filter((hero) => {
      const matchesSearch =
        hero.name.toLowerCase().includes(search.toLowerCase()) ||
        hero.businessName.toLowerCase().includes(search.toLowerCase()) ||
        hero.niche.toLowerCase().includes(search.toLowerCase());

      const matchesStage =
        selectedStage === 'All Stages' || hero.stage === selectedStage;

      return matchesSearch && matchesStage;
    });
  }, [search, selectedStage]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-kajabi-teal rounded-md flex items-center justify-center">
                <span className="text-white text-sm font-bold">K</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-kajabi-teal">Hero Open House</h1>
                <p className="text-xs text-gray-500">September 10, 2026</p>
              </div>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('hero-auth-sept10');
                window.location.href = '/';
              }}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by name, business, or niche..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-kajabi-teal"
            />
          </div>

          {/* Stage Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {STAGES.map((stage) => (
              <button
                key={stage}
                onClick={() => setSelectedStage(stage)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedStage === stage
                    ? stage === 'All Stages'
                      ? 'bg-kajabi-gold text-white'
                      : `bg-kajabi-teal text-white`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
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
              <Link key={hero.id} href={`/hero/${hero.id}`}>
                <a className="card p-6 cursor-pointer">
                  {/* Photo Circle */}
                  <div className="flex justify-center mb-4">
                    <div className="hero-circle bg-gray-200 flex items-center justify-center overflow-hidden">
                      {hero.photo ? (
                        <img
                          src={hero.photo}
                          alt={hero.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">No photo</span>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <h2 className="text-xl font-bold text-center mb-1">{hero.name}</h2>

                  {/* Business Name */}
                  <p className="text-sm text-gray-600 text-center mb-2">{hero.businessName}</p>

                  {/* Website */}
                  {hero.website && (
                    <p className="text-xs text-kajabi-gold text-center mb-4 hover:underline">
                      {hero.website}
                    </p>
                  )}

                  {/* Niche */}
                  <p className="text-xs text-gray-500 text-center mb-4 uppercase tracking-wide">
                    {hero.niche}
                  </p>

                  {/* Stage Badge */}
                  <div className="flex justify-center mb-4">
                    <span
                      className={`stage-badge ${
                        STAGE_COLORS[hero.stage] || 'bg-gray-400 text-white'
                      }`}
                    >
                      {hero.stage}
                    </span>
                  </div>

                  {/* Vitals Row */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Tenure</p>
                        <p className="font-semibold text-sm">{hero.vitals.tenure}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">MRR</p>
                        <p className="font-semibold text-sm">${hero.vitals.mrr}</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <p className="text-xs text-gray-500 text-center mt-4">
                    Tap to see insights
                  </p>
                </a>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
