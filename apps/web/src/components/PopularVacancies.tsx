import Link from 'next/link';

const MostPopularVacancies = () => {
  return (
    <div className="bg-white flex flex-col justify-center py-8">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
          Most Popular Vacancies
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left text-base sm:text-lg md:text-xl">
          {/* Jobs List */}
          {[
            { title: "Anesthesiologists", positions: "45,904 Open Positions" },
            { title: "Maxillofacial Surgeons", positions: "74,875 Open Positions" },
            { title: "Financial Manager", positions: "61,391 Open Positions" },
            { title: "Surgeons", positions: "50,364 Open Positions" },
            { title: "Software Developer", positions: "43,359 Open Positions" },
            { title: "Management Analysis", positions: "93,046 Open Positions" },
            { title: "Obstetricians-Gynecologists", positions: "4,339 Open Positions" },
            { title: "Psychiatrists", positions: "18,599 Open Positions" },
            { title: "IT Manager", positions: "50,963 Open Positions" },
            { title: "Orthodontists", positions: "20,079 Open Positions" },
            { title: "Data Scientist", positions: "28,200 Open Positions", link: true },
            { title: "Operations Research Analysis", positions: "16,627 Open Positions" },
          ].map((job, index) => (
            <div key={index}>
              <h2 className="font-semibold hover:text-blue-500 cursor-pointer">
                {job.link ? <Link href="#">{job.title}</Link> : job.title}
              </h2>
              <p className="text-gray-500 text-sm">{job.positions}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MostPopularVacancies;
