import LandingPage from '@/components/Banner';
import PopularCategory from '@/components/Category';
import CTA from '@/components/CTA';
import FeaturedCompany from '@/components/FeaturedCompany';
import FeatureJob from '@/components/FeatureJob';
import MostPopularVacancies from '@/components/PopularVacancies';
import Testimonial from '@/components/Testimonial';
import HowItWorks from '@/components/WorkProcess';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <main>
      <LandingPage />
      <MostPopularVacancies />
      <HowItWorks />
      <PopularCategory />
      <FeatureJob />
      <FeaturedCompany />
      <Testimonial />
      <CTA />
      <ToastContainer />
    </main>
  );
}
