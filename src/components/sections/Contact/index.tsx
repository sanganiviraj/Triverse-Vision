'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import FadeIn from '@/components/common/FadeIn';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('form-name', 'contact');
      Object.entries(data).forEach(([key, value]) => formData.append(key, value));

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact section section-blue">
      <div className="container">
        <div className="contact-grid">
          <FadeIn direction="left" duration={0.8} className="contact-info">
            <div className="section-label light">Ready to Scale?</div>
            <h2 className="section-title light">Let's Build<br /><span className="text-gradient-light">Your Brand</span></h2>
            <p className="contact-desc">We only take on a limited number of projects so we can give every client our full attention. Apply below to see if we're a great fit.</p>
            <ul className="contact-perks">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Dedicated Creative Director
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Unlimited Revision Rounds
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Weekly Strategy Sessions
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Fully Managed Publishing
              </li>
            </ul>
          </FadeIn>
          <FadeIn direction="right" duration={0.8} delay={0.2} className="contact-form-wrap">
            {isSuccess ? (
              <div className="success-message" style={{ textAlign: 'center', padding: '40px 20px', color: '#fff' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#48cae4" strokeWidth="2" width="64" height="64" style={{ margin: '0 auto 20px' }}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', fontFamily: 'var(--font-head)' }}>Application Received!</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>We'll review your details and get back to you shortly.</p>
              </div>
            ) : (
              <form className="contact-form" id="contactForm" name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" name="form-name" value="contact" />
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" placeholder="Your name" {...register('name')} />
                  {errors.name && <span className="form-error">{errors.name.message}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" placeholder="you@email.com" {...register('email')} />
                  {errors.email && <span className="form-error">{errors.email.message}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Mobile Number</label>
                  <input type="tel" id="phone" placeholder="+91 00000 00000" {...register('phone')} />
                  {errors.phone && <span className="form-error">{errors.phone.message}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="message">Tell us about your goals</label>
                  <textarea id="message" rows={4} placeholder="What do you want to achieve?" {...register('message')}></textarea>
                  {errors.message && <span className="form-error">{errors.message.message}</span>}
                </div>
                <button type="submit" className="btn btn-submit" id="submitBtn" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1 }}>
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
                  {!isSubmitting && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
