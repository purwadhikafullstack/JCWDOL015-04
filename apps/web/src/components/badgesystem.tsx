import React from 'react';

interface Assessment {
  assessment_id: string;
  assessment_data: string;
  status: string;
  score: number;
  type?: string; // Optional, for grouping
}

interface BadgeSystemProps {
  assessments: Assessment[];
}

const BadgeSystem: React.FC<BadgeSystemProps> = ({ assessments }) => {
  // Filter assessments with "passed" status
  const passedAssessments = assessments.filter(
    (assessment) => assessment.status === 'passed'
  );

  if (passedAssessments.length === 0) {
    return (
      <div className="text-center text-gray-500">
        <p>No badges earned yet. Keep working hard!</p>
      </div>
    );
  }

  // Group assessments by type
  const groupedAssessments = passedAssessments.reduce((acc, assessment) => {
    const type = assessment.type || 'General'; // Default type if none provided
    if (!acc[type]) acc[type] = [];
    acc[type].push(assessment);
    return acc;
  }, {} as Record<string, Assessment[]>);

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6 text-center text-indigo-600">Achievements</h2>
      {Object.keys(groupedAssessments).map((type) => (
        <div key={type} className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">{type} Badges</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedAssessments[type].map((assessment) => (
              <div
                key={assessment.assessment_id}
                className="flex flex-col items-center p-4 border rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    src={`/badges/${assessment.assessment_data
                      .toLowerCase()
                      .replace(/\s+/g, '-')}.png`}
                    alt={`${assessment.assessment_data} badge`}
                    className="w-24 h-24 object-cover rounded-full border-4 border-indigo-500"
                  />
                  <div className="absolute bottom-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                    Earned!
                  </div>
                </div>
                <h4 className="mt-4 text-center text-lg font-medium text-gray-800">
                  {assessment.assessment_data}
                </h4>
                <p className="text-sm text-gray-600">Score: {assessment.score}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BadgeSystem;

// INI BUAT MANGGIL STATUS
// const loadAssessments = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchAllAssessments();
//       setAssessments(data);
//     } catch (error: any) {
//       console.error('Error loading assessments:', error);
//       toast.error(error.message || 'Failed to load assessments');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadAssessments(); // Panggil loadAssessments saat komponen dirender
//   }, []);