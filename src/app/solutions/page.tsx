import { getContent } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default function Solutions() {
  const content = getContent();
  const { solutions } = content;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">{solutions.title}</h1>
        <p className="text-xl text-gray-600 mt-2">{solutions.description}</p>
      </div>

      <div className="space-y-6 mt-12 max-w-4xl mx-auto">
        {solutions.items.map((solution, index) => (
          <div key={index} className="flex flex-col md:flex-row bg-white p-8 rounded-lg shadow-lg border-l-4 border-blue-500">
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{solution.title}</h3>
              <p className="text-gray-700 text-lg">{solution.description}</p>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 flex items-center">
              <button className="text-blue-600 font-semibold hover:underline">Learn More &rarr;</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
