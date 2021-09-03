import { ResumeData } from "../config/resumeData";
import { Icon } from "./@vyductan/icons";

type TestimonialsProps = {
  data: ResumeData["testimonials"];
};
const Testimonials = ({ data }: TestimonialsProps) => {
  if (!data) return <></>;
  const testimonials = data.testimonials.map(function (testimonials) {
    return (
      <li key={testimonials.user}>
        <blockquote>
          <p>{testimonials.text}</p>
          <cite>— {testimonials.user}</cite>
        </blockquote>
      </li>
    );
  });
  return (
    <section id="testimonials">
      <div className="container">
        <h1>
          <span>Client Testimonials</span>
          <Icon name="QuoteLeft" />
        </h1>

        <div className="detail">
          <ul>{testimonials}</ul>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
