import Link from 'next/link';

const CTA = () => {
  return (
    <div className="bg-slate-50 py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Become a Candidate */}
          <div className="p-8 bg-white rounded-lg shadow-lg flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Become a Candidate
              </h2>
              <p className="text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                cursus a dolor convallis efficitur.
              </p>
            </div>
            <Link href="/register-candidate">
              <button className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-all">
                Register Now →
              </button>
            </Link>
          </div>

          {/* Become an Employer */}
          <div className="p-8 bg-[#0A65CC] rounded-lg shadow-lg flex flex-col justify-between text-white">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Become an Employer</h2>
              <p className="mb-6">
                Cras in massa pellentesque, mollis ligula non, luctus dui. Morbi
                sed efficitur dolor. Pelque augue risus, aliqu.
              </p>
            </div>
            <Link href="/register-employer">
              <button className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-all">
                Register Now →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;