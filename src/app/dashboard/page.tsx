'use client';

import { useState, useEffect } from 'react';

type ContentData = any; // Using any for simplicity in dashboard state, but ideal would be strict type

export default function Dashboard() {
  const [content, setContent] = useState<ContentData | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => setContent(data));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setMessage('Content saved successfully!');
      } else {
        setMessage('Failed to save content.');
      }
    } catch (error) {
      setMessage('Error saving content.');
    }
    setSaving(false);
  };

  const updateField = (section: string, field: string, value: string) => {
    if (!content) return;
    setContent({
      ...content,
      [section]: {
        ...content[section],
        [field]: value,
      },
    });
  };

  const updateArrayItem = (section: string, index: number, field: string, value: string) => {
    if (!content) return;
    const newItems = [...content[section].items];
    newItems[index] = { ...newItems[index], [field]: value };
    setContent({
      ...content,
      [section]: {
        ...content[section],
        items: newItems,
      },
    });
  };

  if (!content) return <div className="p-8 text-center">Loading dashboard...</div>;

  const tabs = ['home', 'brands', 'products', 'solutions', 'contact'];

  return (
    <div className="bg-white rounded-lg shadow min-h-[600px] flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar Tabs */}
      <div className="w-full md:w-64 bg-gray-100 p-4 border-r border-gray-200">
        <h2 className="text-xl font-bold mb-6 px-4">Admin Dashboard</h2>
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-2 rounded capitalize ${
                activeTab === tab ? 'bg-blue-600 text-white' : 'hover:bg-gray-200 text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold capitalize">Edit {activeTab} Page</h2>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-6 py-2 rounded text-white font-bold ${
              saving ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {message && (
          <div className={`p-4 mb-6 rounded ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}

        <div className="space-y-6">
          {/* Dynamic Form Generation based on activeTab */}
          {activeTab === 'home' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={content.home.title}
                  onChange={(e) => updateField('home', 'title', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 border p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                <input
                  type="text"
                  value={content.home.subtitle}
                  onChange={(e) => updateField('home', 'subtitle', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 border p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Hero Image URL</label>
                <input
                  type="text"
                  value={content.home.heroImage}
                  onChange={(e) => updateField('home', 'heroImage', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 border p-2"
                />
              </div>
            </>
          )}

          {activeTab === 'brands' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Page Title</label>
                <input
                  type="text"
                  value={content.brands.title}
                  onChange={(e) => updateField('brands', 'title', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 border p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={content.brands.description}
                  onChange={(e) => updateField('brands', 'description', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 border p-2"
                />
              </div>
              <h3 className="text-lg font-bold mt-6">Brands List</h3>
              {content.brands.items.map((item: any, idx: number) => (
                <div key={idx} className="border p-4 rounded bg-gray-50 space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500">Name</label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => updateArrayItem('brands', idx, 'name', e.target.value)}
                      className="w-full border p-1 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500">Logo URL</label>
                    <input
                      type="text"
                      value={item.logo}
                      onChange={(e) => updateArrayItem('brands', idx, 'logo', e.target.value)}
                      className="w-full border p-1 rounded"
                    />
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === 'products' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Page Title</label>
                <input
                  type="text"
                  value={content.products.title}
                  onChange={(e) => updateField('products', 'title', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 border p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={content.products.description}
                  onChange={(e) => updateField('products', 'description', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 border p-2"
                />
              </div>
              <h3 className="text-lg font-bold mt-6">Products List</h3>
              {content.products.items.map((item: any, idx: number) => (
                <div key={idx} className="border p-4 rounded bg-gray-50 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-500">Name</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateArrayItem('products', idx, 'name', e.target.value)}
                        className="w-full border p-1 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-500">Price</label>
                      <input
                        type="text"
                        value={item.price}
                        onChange={(e) => updateArrayItem('products', idx, 'price', e.target.value)}
                        className="w-full border p-1 rounded"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500">Image URL</label>
                    <input
                      type="text"
                      value={item.image}
                      onChange={(e) => updateArrayItem('products', idx, 'image', e.target.value)}
                      className="w-full border p-1 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500">Description</label>
                    <textarea
                      value={item.description}
                      onChange={(e) => updateArrayItem('products', idx, 'description', e.target.value)}
                      className="w-full border p-1 rounded"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </>
          )}

           {activeTab === 'solutions' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Page Title</label>
                <input
                  type="text"
                  value={content.solutions.title}
                  onChange={(e) => updateField('solutions', 'title', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 border p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={content.solutions.description}
                  onChange={(e) => updateField('solutions', 'description', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 border p-2"
                />
              </div>
              <h3 className="text-lg font-bold mt-6">Solutions List</h3>
              {content.solutions.items.map((item: any, idx: number) => (
                <div key={idx} className="border p-4 rounded bg-gray-50 space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500">Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateArrayItem('solutions', idx, 'title', e.target.value)}
                      className="w-full border p-1 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500">Description</label>
                    <textarea
                      value={item.description}
                      onChange={(e) => updateArrayItem('solutions', idx, 'description', e.target.value)}
                      className="w-full border p-1 rounded"
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === 'contact' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={content.contact.title}
                  onChange={(e) => updateField('contact', 'title', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 border p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                <input
                  type="text"
                  value={content.contact.subtitle}
                  onChange={(e) => updateField('contact', 'subtitle', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 border p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  value={content.contact.address}
                  onChange={(e) => updateField('contact', 'address', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 border p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="text"
                  value={content.contact.email}
                  onChange={(e) => updateField('contact', 'email', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 border p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  value={content.contact.phone}
                  onChange={(e) => updateField('contact', 'phone', e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-50 border p-2"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
