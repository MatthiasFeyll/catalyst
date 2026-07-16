import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function Imprint() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image - same as first section */}
      <div
        className="absolute inset-0 bg-fixed
                brightness-[30%] md:brightness-[25%] grayscale-[0.85] contrast-[89%]
                bg-[length:350%] bg-[position:60%_10%]
                md:bg-[length:350%] md:bg-[position:55%_10%]
                lg:bg-[length:170%] lg:bg-[position:55%_10%]"
        style={{ backgroundImage: 'url(/images/background/mf_looking_left_full.jpg)' }}
      />
      <div className="absolute inset-0 z-0 bg-cover bg-center">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,1)_0%,transparent_60%)]"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-24">
        <Link
          href="/"
          className="inline-flex items-center text-white hover:text-primary transition-colors mb-8 group"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="mr-2 group-hover:-translate-x-1 transition-transform"
          />
          Back to Home
        </Link>

        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-primary/20">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">Imprint</h1>

          <div className="text-white space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary/80">Contact Information</h2>
              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> Matthias Feyll
                </p>
                <p>
                  <strong>Address:</strong>
                  <br />
                  Heidelberger Street 38
                  <br />
                  64285 Darmstadt
                  <br />
                  Germany
                </p>
                <p>
                  <strong>Email:</strong> matthias.feyll@gmail.com
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary/80">Disclaimer</h2>
              <div className="space-y-4 text-text/80">
                <p>
                  This website is a personal portfolio site. The content provided here is for
                  informational purposes only. Despite careful control, I assume no liability for
                  the content of external links. The operators of the linked pages are solely
                  responsible for their content.
                </p>
                <p>
                  All displayed projects and references are my own work or work I significantly
                  contributed to, as described.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary/80">Privacy Policy</h2>
              <div className="space-y-4 text-text/80">
                <p>
                  This website uses Google reCAPTCHA to ensure security in the contact form. Please
                  refer to Google&apos;s privacy policy for details on data handling.
                </p>
                <p>
                  No personal data is stored when you browse this website, except for information
                  you actively submit through the contact form.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
