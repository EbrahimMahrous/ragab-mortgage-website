import Hero from "./components/Hero";
import Calculator from "./components/Calculator";
import Location from "./components/Location";
import ContactForm from "./components/ContactForm";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export default function Home() {
  return (
    <div>
      <Hero />
      <Calculator />
      <Location />
      <ContactForm />
      <FloatingWhatsApp />
    </div>
  );
}
