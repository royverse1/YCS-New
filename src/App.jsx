/* src/App.jsx */
import './App.css';
import SmoothScroll from './components/SmoothScroll';
import HeroSprout from './components/HeroSprout';
import Mantra from './components/Mantra';
import AcademyJourney from './components/AcademyJourney';
import FounderNote from './components/FounderNote';
import CourseFan from './components/CourseFan';
import Stats from './components/Stats';
import VibratingStrings from './components/VibratingStrings';
import FAQ from './components/Faq'; // Added
import Discounts from './components/Discounts'; 
import Testimonials from './components/Testimonials';
import Admissions from './components/Admissions';
import ContactFooter from './components/ContactFooter';

export default function App() {
  return (
    <SmoothScroll>
      <main>
        <HeroSprout />
        <Mantra />
        <AcademyJourney />
        <FounderNote />
        <CourseFan />
        <Stats />
        <VibratingStrings />
        
        {/* Phase 3.5: Clarity before Incentives */}
        <FAQ /> 
        <Discounts /> 
        
        <Testimonials />
        <Admissions />
        <ContactFooter />
      </main>
    </SmoothScroll>
  );
}