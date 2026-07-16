import { ScrollButton } from '@/components/ui/ScrollButton';

export default function HomeSection() {
  return (
    <section className="min-h-screen h-screen text-text flex items-center justify-center md:justify-start pb-10 md:ms-[10vw]">
      <div className="md:pl-1">
        <h1 className="p-0 m-0 text-5xl md:text-7xl font-bold">
          <span className="text-primary">Matthias</span> Feyll
        </h1>
        <p className="text-lg md:text-2xl mb-8 text-text/85">Professional Frontend Developer</p>
      </div>
      <ScrollButton />
    </section>
  );
}
