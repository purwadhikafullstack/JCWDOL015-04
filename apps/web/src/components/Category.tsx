import Image from 'next/image';
import Link from 'next/link';

// Importing the icons for each category
import IconData from '../assets/category/Icon-data.png';
import IconDigitalMarketing from '../assets/category/Icon-digitalmarketing.png';
import IconFinance from '../assets/category/Icon-finance.png';
import IconHealth from '../assets/category/Icon-health.png';
import IconLink from '../assets/category/Icon-link.png';
import IconMusic from '../assets/category/Icon-music.png';
import IconGD from '../assets/category/Icon-graphic-design.png';
import IconVideo from '../assets/category/Icon-video.png';

const PopularCategory = () => {
  const categories = [
    {
      title: 'Graphics & Design',
      icon: IconGD,
      positions: '357 Open position',
    },
    {
      title: 'Code & Programing',
      icon: IconLink,
      positions: '312 Open position',
    },
    {
      title: 'Digital Marketing',
      icon: IconDigitalMarketing,
      positions: '297 Open position',
    },
    {
      title: 'Video & Animation',
      icon: IconVideo,
      positions: '247 Open position',
    },
    { title: 'Music & Audio', icon: IconMusic, positions: '204 Open position' },
    {
      title: 'Account & Finance',
      icon: IconFinance,
      positions: '167 Open position',
    },
    {
      title: 'Health & Care',
      icon: IconHealth,
      positions: '125 Open position',
    },
    {
      title: 'Data & Science',
      icon: IconData,
      positions: '57 Open position',
      highlighted: false,
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Popular Category</h2>
          <Link
            href="/view-all"
            className="text-blue-600 font-semibold flex items-center hover:text-blue-700 transition-colors"
          >
            View All
            <span className="ml-2">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className={
                'p-4 rounded-lg flex items-center space-x-4 transition-shadow duration-300 hover:shadow-xl hover:bg-slate-100'
              }
            >
              <div className="p-4 rounded-lg transition-transform transform hover:scale-105">
                <Image
                  src={category.icon}
                  alt={category.title}
                  width={80}
                  height={80}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold transition-colors duration-300 hover:text-blue-600">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-500">{category.positions}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCategory;
