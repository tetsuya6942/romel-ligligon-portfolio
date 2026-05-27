import AboutSection from '../components/AboutSection';
import PageTransition from '../components/PageTransition';

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="pt-24">
        <AboutSection />
      </div>
    </PageTransition>
  );
}
