import { getContent } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default function Home() {
  const content = getContent();
  const { home } = content;

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8">
      <h1 className="text-5xl font-extrabold text-blue-900">{home.title}</h1>
      <p className="text-2xl text-gray-700">{home.subtitle}</p>
      <div className="w-full max-w-4xl mt-8">
        <img
          src={home.heroImage}
          alt="Hero"
          className="rounded-lg shadow-xl w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}
