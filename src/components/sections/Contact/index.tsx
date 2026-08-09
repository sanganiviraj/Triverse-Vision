'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import FadeIn from '@/components/common/FadeIn';

interface PackageOption {
  id: string;
  name: string;
  reelsInfo: string;
  priceRange: string;
  badgeText?: string;
}

const PACKAGE_OPTIONS: PackageOption[] = [
  {
    id: 'only-editing',
    name: 'Only Editing Package',
    reelsInfo: '8–15 Reels',
    priceRange: '₹11,999 – ₹20,999',
    badgeText: 'Editing Only',
  },
  {
    id: 'editing-scripting',
    name: 'Editing + Scripting Package',
    reelsInfo: '8–15 Reels',
    priceRange: '₹15,999 – ₹23,999',
    badgeText: 'Most Popular',
  },
  {
    id: 'complete-management',
    name: 'Complete Social Media Management',
    reelsInfo: '8–15 Reels',
    priceRange: '₹18,999 – ₹25,999',
    badgeText: 'All-Inclusive',
  },
  {
    id: 'custom-discussion',
    name: 'Custom Strategy & Discussion',
    reelsInfo: 'Tailored Strategy',
    priceRange: 'Custom Quote',
    badgeText: 'Custom',
  },
];

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  package: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string>('editing-scripting');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
    defaultValues: {
      package: 'editing-scripting',
    },
  });

  // Listen for package selection events from Package cards
  useEffect(() => {
    const handlePackageEvent = (event: any) => {
      if (event.detail && event.detail.packageId) {
        setSelectedPackageId(event.detail.packageId);
        setValue('package', event.detail.packageId);
      }
    };

    window.addEventListener('select-package', handlePackageEvent);
    return () => {
      window.removeEventListener('select-package', handlePackageEvent);
    };
  }, [setValue]);

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectOption = (pkgId: string) => {
    setSelectedPackageId(pkgId);
    setValue('package', pkgId);
    setIsDropdownOpen(false);
  };

  const selectedPkg = PACKAGE_OPTIONS.find((p) => p.id === selectedPackageId) || PACKAGE_OPTIONS[1];

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('form-name', 'contact');
      Object.entries(data).forEach(([key, value]) => formData.append(key, value || ''));

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });
      setIsSuccess(true);
      reset();
      setSelectedPackageId('editing-scripting');
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="contact-grid">
          <FadeIn direction="left" duration={0.8} className="contact-info">
            <div className="section-label">Ready to Scale?</div>
            <h2 className="section-title">Let's Build <span className="text-gradient">Your Brand</span></h2>
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
              <div className="success-message" style={{ textAlign: 'center', padding: '40px 20px', color: '#03045e' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2" width="64" height="64" style={{ margin: '0 auto 20px' }}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', fontFamily: 'var(--font-head)' }}>Application Received!</h3>
                <p style={{ color: '#64748b' }}>We'll review your details and get back to you shortly.</p>
              </div>
            ) : (
              <form className="contact-form" id="contactForm" name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" {...register('package')} value={selectedPackageId} />
                
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

                {/* Professional Custom Select Dropdown UI */}
                <div className="form-group">
                  <label>Select Content Package</label>
                  <div className="custom-select-container" ref={dropdownRef}>
                    <button
                      type="button"
                      className={`custom-select-trigger ${isDropdownOpen ? 'open' : ''}`}
                      onClick={() => setIsDropdownOpen((prev) => !prev)}
                    >
                      <div className="trigger-left">
                        <span className="trigger-pkg-name">{selectedPkg.name}</span>
                        <span className="trigger-pkg-sub">• {selectedPkg.reelsInfo}</span>
                      </div>
                      <div className="trigger-right">
                        <span className="trigger-price-badge">{selectedPkg.priceRange}</span>
                        <svg
                          className={`trigger-arrow ${isDropdownOpen ? 'rotate' : ''}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          width="16"
                          height="16"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </button>

                    {isDropdownOpen && (
                      <div className="custom-select-menu">
                        {PACKAGE_OPTIONS.map((option) => {
                          const isSelected = option.id === selectedPackageId;
                          return (
                            <div
                              key={option.id}
                              className={`custom-select-option ${isSelected ? 'selected' : ''}`}
                              onClick={() => handleSelectOption(option.id)}
                            >
                              <div className="option-info">
                                <span className="option-name">{option.name}</span>
                                <span className="option-sub">{option.reelsInfo}</span>
                              </div>

                              <div className="option-price-wrap">
                                <span className="option-price-pill">{option.priceRange}</span>
                                {isSelected && (
                                  <svg
                                    className="option-check"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    width="16"
                                    height="16"
                                  >
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
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

      {/* Embedded CSS for Custom Dropdown Styling */}
      <style>{`
        .custom-select-container {
          position: relative;
          width: 100%;
        }

        .custom-select-trigger {
          width: 100%;
          background: #f7fbff;
          border: 1px solid rgba(2, 62, 138, 0.18);
          border-radius: var(--r-sm, 12px);
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          cursor: pointer;
          transition: all 0.25s ease;
          text-align: left;
          outline: none;
        }

        .custom-select-trigger:hover,
        .custom-select-trigger.open {
          border-color: #00b4d8;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.15);
        }

        .trigger-left {
          display: flex;
          align-items: center;
          gap: 6px;
          overflow: hidden;
        }

        .trigger-pkg-name {
          font-weight: 600;
          font-size: 0.92rem;
          color: #03045e;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .trigger-pkg-sub {
          font-size: 0.8rem;
          color: #0077b6;
          font-weight: 500;
          white-space: nowrap;
        }

        .trigger-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .trigger-price-badge {
          font-size: 0.8rem;
          font-weight: 700;
          background: linear-gradient(135deg, #023e8a 0%, #00b4d8 100%);
          color: #ffffff;
          padding: 4px 10px;
          border-radius: 100px;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0, 119, 182, 0.2);
        }

        .trigger-arrow {
          color: #023e8a;
          transition: transform 0.3s ease;
        }

        .trigger-arrow.rotate {
          transform: rotate(180deg);
        }

        /* Menu Dropdown */
        .custom-select-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: #ffffff;
          border: 1px solid rgba(0, 180, 216, 0.25);
          border-radius: 16px;
          padding: 8px;
          box-shadow: 0 16px 40px rgba(2, 62, 138, 0.16);
          z-index: 100;
          display: flex;
          flex-direction: column;
          gap: 4px;
          animation: dropdownFade 0.2s cubic-bezier(0.2, 1, 0.3, 1);
        }

        @keyframes dropdownFade {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .custom-select-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .custom-select-option:hover {
          background: #f0f9ff;
          border-color: rgba(0, 180, 216, 0.2);
        }

        .custom-select-option.selected {
          background: #eef6fb;
          border-color: rgba(2, 62, 138, 0.2);
        }

        .option-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .option-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: #03045e;
        }

        .option-sub {
          font-size: 0.78rem;
          color: #0077b6;
        }

        .option-price-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .option-price-pill {
          font-size: 0.8rem;
          font-weight: 700;
          color: #023e8a;
          background: #caf0f8;
          padding: 4px 10px;
          border-radius: 100px;
          border: 1px solid rgba(0, 180, 216, 0.2);
        }

        .option-check {
          color: #00b4d8;
        }

        @media (max-width: 600px) {
          .trigger-pkg-sub {
            display: none;
          }
          .custom-select-trigger {
            padding: 10px 12px;
          }
          .trigger-price-badge {
            font-size: 0.75rem;
            padding: 3px 8px;
          }
          .option-price-pill {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
}
