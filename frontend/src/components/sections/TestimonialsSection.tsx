import TestimonialCard from '@/components/ui/TestimonialCard';
import { TESTIMONIALS } from '@/data/testimonials';

export default function TestimonialsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Hear more from the community.</h2>
      </div>

      <div className="space-y-12">
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard
            key={testimonial.author}
            quote={testimonial.quote}
            author={testimonial.author}
            title={testimonial.title}
            avatarUrl={testimonial.avatarUrl}
          />
        ))}
      </div>
    </section>
  );
}