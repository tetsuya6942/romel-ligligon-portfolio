import SkillsSection from '../components/SkillsSection';
import PageTransition from '../components/PageTransition';

export default function SkillsPage() {
  return (
    <PageTransition>
      <div className="pt-24">
        <SkillsSection />
      </div>
    </PageTransition>
  );
}
