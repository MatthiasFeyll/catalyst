'use client';
import { useResponsive } from '@/provider/ResponsiveProvider';
import { Dialog } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

export const ContactSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error'>('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const { isMobile } = useResponsive();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.grecaptcha) {
      window.grecaptcha.ready(() => {
        setRecaptchaReady(true);
      });
    }
  }, []);

  const processSubmission = async (formData: FormData) => {
    if (!recaptchaReady) {
      console.error('reCAPTCHA not loaded');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, {
        action: 'SUBMIT_FORM',
      });

      if (!token) {
        console.error('Invalid reCAPTCHA token');
        setSubmitStatus('error');
        setIsOpen(true);
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken: token }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Submission failed:', errorData);
        throw new Error('Submission failed');
      }

      setSubmitStatus('success');
      setIsOpen(true);
      reset();
    } catch (error) {
      console.error('Form submission failed:', error);
      setSubmitStatus('error');
      setIsOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="h-screen lg:ms-[10vw] lg:w-4/5 px-4 pt-5 flex justify-between flex-col">
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
        onLoad={() => {
          window.grecaptcha.ready(() => {
            setRecaptchaReady(true);
          });
        }}
        onError={() => console.error('reCAPTCHA script failed to load')}
      />
      <div className="pt-[12vh] lg:pt-[25vh]">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between h-full space-y-4">
          <div className="pb-4 w-full md:w-3/4">
            <h2 className="text-5xl font-semibold text-text">Contact</h2>
            <p className="ps-1 text-primary text-xl">Feel free to write me a message</p>
          </div>

          <form
            onSubmit={handleSubmit(processSubmission)}
            className="space-y-2 md:space-y-6 w-full md:w-3/4"
          >
            <div>
              <label htmlFor="name" className="block text.md font-medium text-orange-500">
                Name
              </label>
              <input
                {...register('name')}
                className="mt-1 block p-3 bg-dark border-dark focus:border-orange-500 focus:ring-orange-500 shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                placeholder="John Doe"
              />
              {errors.name && <p className="text-orange-500 text.md mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text.md font-medium text-orange-500">
                Email
              </label>
              <input
                type="email"
                {...register('email')}
                className="mt-1 block p-3 bg-dark border-dark focus:border-orange-500 focus:ring-orange-500 shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                placeholder="john.doe@example.com"
              />
              {errors.email && (
                <p className="text-orange-500 text.md mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text.md font-medium text-orange-500">
                Message
              </label>
              <textarea
                {...register('message')}
                rows={isMobile ? 6 : 4}
                className="mt-1 block p-3 bg-dark border-dark focus:border-orange-500 focus:ring-orange-500 shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your message"
              />
              {errors.message && (
                <p className="text-orange-500 text.md mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="!mt-16 w-full bg-primary border-primary text-[1.1em] text-white py-3 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 z-10 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Panel className="fixed inset-0 bg-black opacity-30" />

            <div className="relative bg-dark rounded-lg p-8 max-w-sm mx-auto border border-orange-500">
              <Dialog.Title className="text-lg font-medium text-orange-500">
                {submitStatus === 'success' ? 'Message Sent!' : 'Error'}
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-white">
                {submitStatus === 'success'
                  ? 'Thank you for your message. I will get back to you soon!'
                  : 'There was an error sending your message. Please try again later.'}
              </Dialog.Description>

              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Close
              </button>
            </div>
          </div>
        </Dialog>
      </div>
      <div className="text-gray-800 w-full p-5">
        <p className="text-xs text-center">
          This site is protected by reCAPTCHA and the{' '}
          <a className="underline" href="https://policies.google.com/privacy">
            Google Privacy Policy
          </a>{' '}
          and{' '}
          <a className="underline" href="https://policies.google.com/terms">
            Terms of Service
          </a>{' '}
          apply. |{' '}
          <Link href="/imprint" className="underline hover:text-primary">
            Imprint
          </Link>
        </p>
      </div>
    </section>
  );
};
