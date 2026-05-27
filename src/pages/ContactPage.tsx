import ContactFormSection from '../components/ContactFormSection';
import PageTransition from '../components/PageTransition';

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="min-h-screen px-6 md:px-12 lg:px-24 pt-16 pb-20 max-w-7xl mx-auto select-none">
        <ContactFormSection />
      </div>
    </PageTransition>
  );
}
