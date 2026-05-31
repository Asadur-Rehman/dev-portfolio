export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatarInitials?: string;
  linkedInUrl?: string;
}

// Real client/colleague testimonials go here.
// Leave empty to hide the Testimonials section entirely.
// When adding: keep quotes short (1–3 sentences) and specific — generic "great to work with"
// quotes hurt more than they help. Ideally include LinkedIn URL so they can be verified.
export const testimonials: Testimonial[] = [];
