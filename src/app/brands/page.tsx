import { getContent } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default function Brands() {
  const content = getContent();
  const { brands } = content;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">{brands.title}</h1>
        <p className="text-xl text-gray-600 mt-2">{brands.description}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
        {brands.items.map((brand, index) => (
          <div key={index} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img src={brand.logo} alt={brand.name} className="w-32 h-32 object-contain mb-4" />
            <h3 className="text-lg font-semibold">{brand.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
