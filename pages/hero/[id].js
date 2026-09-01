import Link from 'next/link';
import heroes from '../../data/heroes.json';

const STAGE_COLORS = {
  Scale: 'stage-scale',
  Growth: 'stage-growth',
  Established: 'stage-established',
  Launch: 'stage-launch',
  Transition: 'stage-transition',
};

export async function getStaticPaths() {
  return {
    paths: heroes.map((hero) => ({
      params: { id: String(hero.id) },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const hero = heroes.find((h) => h.id === parseInt(params.id));
  return {
    props: { hero },
  };
}

export default function HeroDetail({ hero }) {
  if (!hero) {
    return <div>Hero not found</div>;
  }

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/">
            <a className="text-sm text-kajabi-teal font-medium hover:underline">← Back to Heroes</a>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Card Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          {/* Photo */}
          <div className="flex justify-center mb-6">
            <div className="hero-circle bg-gray-200 flex items-center justify-center overflow-hidden">
              {hero.photo ? (
                <img
                  src={hero.photo}
                  alt={hero.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400">No photo</span>
              )}
            </div>
          </div>

          {/* Hero Info */}
          <h1 className="text-3xl font-bold text-center mb-2">{hero.name}</h1>
          <p className="text-lg text-gray-600 text-center mb-1">{hero.businessName}</p>
          <p className="text-sm text-gray-500 text-center mb-4">{hero.niche}</p>

          {hero.website && (
            <p className="text-sm text-kajabi-gold text-center mb-6 hover:underline">
              {hero.website}
            </p>
          )}

          {/* Stage Badge */}
          <div className="flex justify-center mb-6">
            <span
              className={`stage-badge ${
                STAGE_COLORS[hero.stage] || 'bg-gray-400 text-white'
              }`}
            >
              {hero.stage}
            </span>
          </div>
        </div>

        {/* Vitals Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">MRR</p>
            <p className="text-2xl font-bold text-kajabi-teal">${hero.vitals.mrr}</p>
            <p className="text-xs text-gray-500 mt-1">ARR: ${hero.vitals.arr}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Tenure</p>
            <p className="text-2xl font-bold text-kajabi-teal">{hero.vitals.tenure}</p>
            <p className="text-xs text-gray-500 mt-1">{hero.vitals.signupDate}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Contacts</p>
            <p className="text-2xl font-bold text-kajabi-teal">{hero.vitals.contacts.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">+{hero.vitals.contactsAdded12mo.toLocaleString()} last 12mo</p>
          </div>
        </div>

        {/* GMV Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold mb-6">GMV & Growth</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">All-Time GMV</p>
              <p className="text-2xl font-bold">
                {hero.gmv.allTime ? formatCurrency(hero.gmv.allTime) : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Trailing 12mo</p>
              <p className="text-2xl font-bold">
                {hero.gmv.trailing12mo ? formatCurrency(hero.gmv.trailing12mo) : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">YoY Growth</p>
              <p className={`text-2xl font-bold ${
                hero.gmv.yoY && hero.gmv.yoY.includes('+') ? 'text-green-600' : hero.gmv.yoY === 'N/A' ? 'text-gray-600' : 'text-red-600'
              }`}>
                {hero.gmv.yoY}
              </p>
            </div>
          </div>
          {hero.gmv.note && (
            <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded border-l-4 border-kajabi-gold">
              {hero.gmv.note}
            </p>
          )}
        </div>

        {/* Audience Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-lg font-bold mb-4">Audience</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Members</p>
                <p className="text-xl font-semibold">{hero.vitals.members.toLocaleString()}</p>
                <p className="text-xs text-gray-600">+{hero.vitals.membersAdded12mo.toLocaleString()} in last 12mo</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-lg font-bold mb-4">Platform Setup</h2>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Sites:</span> {hero.vitals.sites}</p>
              {hero.vitals.addOns.length > 0 && (
                <p><span className="font-semibold">Add-ons:</span> {hero.vitals.addOns.join(', ')}</p>
              )}
              <p><span className="font-semibold">FLI:</span> {hero.vitals.fli ? 'Active' : 'Inactive'}</p>
            </div>
          </div>
        </div>

        {/* CSM Focus */}
        <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-8 mb-8">
          <h2 className="text-lg font-bold text-blue-900 mb-3">CSM Focus</h2>
          <p className="text-sm text-blue-800">{hero.csmFocus}</p>
        </div>

        {/* Technical Support */}
        <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-8 mb-8">
          <h2 className="text-lg font-bold text-green-900 mb-3">Technical Support</h2>
          <p className="text-sm text-green-800">{hero.technicalSupport}</p>
        </div>

        {/* Risk Flags */}
        {hero.riskFlags && (
          <div className="bg-orange-50 border-l-4 border-orange-400 rounded-lg p-8 mb-8">
            <h2 className="text-lg font-bold text-orange-900 mb-3">Risk Flags</h2>
            <p className="text-sm text-orange-800">{hero.riskFlags}</p>
          </div>
        )}
      </main>
    </div>
  );
}
