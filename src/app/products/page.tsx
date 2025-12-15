import { getContent } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default function Products() {
  const content = getContent();
  const { products } = content;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">{products.title}</h1>
        <p className="text-xl text-gray-600 mt-2">{products.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {products.items.map((product, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                <span className="text-blue-600 font-bold">{product.price}</span>
              </div>
              <p className="text-gray-600">{product.description}</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
