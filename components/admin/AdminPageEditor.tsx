
import React, { useState } from 'react';
import AdminLayout from './AdminLayout';

interface AdminPageEditorProps {
  onNavigate: (page: string) => void;
  pageName: string;
  userRole: string;
}

// --- Interfaces for About Us Page Data ---
interface ValueItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface AboutPageData {
  hero: {
    title: string;
    subtitle: string;
    bgImage: string | null;
  };
  mission: {
    title: string;
    description: string;
  };
  vision: {
    title: string;
    description: string;
  };
  values: ValueItem[];
  story: {
    heading: string;
    text: string;
    image: string | null;
  };
  cta: {
    heading: string;
    subtext: string;
    primaryBtnText: string;
    secondaryBtnText: string;
  };
}

const AdminPageEditor: React.FC<AdminPageEditorProps> = ({ onNavigate, pageName, userRole }) => {
  // Mock function to format page name for display
  const displayTitle = pageName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // --- GENERIC EDITOR STATE ---
  const handleGenericSave = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Changes saved for ${displayTitle}`);
  };

  // --- ABOUT US SPECIFIC STATE ---
  const [aboutData, setAboutData] = useState<AboutPageData>({
    hero: {
      title: 'About Sheltershub',
      subtitle: 'Connecting people with properties, agencies, and developers in one trusted platform.',
      bgImage: 'https://i.ibb.co/0RBKCXM3/Carousel-Image-3.jpg'
    },
    mission: {
      title: 'Our Mission',
      description: 'To simplify real estate discovery and empower users with transparent, accurate, and comprehensive property information.'
    },
    vision: {
      title: 'Our Vision',
      description: 'To be the leading digital hub for real estate connections worldwide, setting the standard for trust and innovation.'
    },
    values: [
      { id: 1, title: 'Trust & Transparency', description: 'We believe in honest dealings and verified listings to build a safe marketplace.', icon: 'Shield' },
      { id: 2, title: 'Innovation', description: 'Leveraging technology to provide the best user experience and smart tools.', icon: 'Lightbulb' },
      { id: 3, title: 'Customer-Centric', description: 'Your journey matters. We design every feature with your needs in mind.', icon: 'Smile' },
      { id: 4, title: 'Community', description: 'Fostering a supportive ecosystem for buyers, sellers, agents, and developers.', icon: 'Users' }
    ],
    story: {
      heading: 'Our Story',
      text: 'Sheltershub began with a simple observation: finding a home was too complicated. Listings were scattered, information was unreliable, and connecting with trustworthy agents was a challenge.\n\nFounded in 2023, we set out to build a platform that brings transparency and efficiency to the real estate market in Ghana and beyond.',
      image: 'https://i.ibb.co/NnZzSLFd/Sample-Card-Image.jpg'
    },
    cta: {
      heading: 'Want to learn more or partner with us?',
      subtext: 'Whether you are an agency looking to list properties or a developer showcasing a new project, we are here to help you grow.',
      primaryBtnText: 'Contact Us',
      secondaryBtnText: 'Explore Properties'
    }
  });

  // Handlers for About Us Form
  const handleAboutChange = (section: keyof AboutPageData, field: string, value: string) => {
    setAboutData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleDeepChange = (section: 'mission' | 'vision' | 'story' | 'cta', field: string, value: string) => {
      setAboutData(prev => ({
          ...prev,
          [section]: {
              ...prev[section],
              [field]: value
          }
      }));
  }

  const handleHeroChange = (field: string, value: string) => {
      setAboutData(prev => ({
          ...prev,
          hero: { ...prev.hero, [field]: value }
      }));
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, section: 'hero' | 'story') => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setAboutData(prev => ({
        ...prev,
        [section]: { ...prev[section], [section === 'hero' ? 'bgImage' : 'image']: url }
      }));
    }
  };

  // Values CRUD Handlers
  const handleValueChange = (id: number, field: keyof ValueItem, value: string) => {
    setAboutData(prev => ({
      ...prev,
      values: prev.values.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const addValue = () => {
    const newValue: ValueItem = { id: Date.now(), title: '', description: '', icon: 'Shield' };
    setAboutData(prev => ({ ...prev, values: [...prev.values, newValue] }));
  };

  const removeValue = (id: number) => {
    if (confirm('Are you sure you want to delete this value?')) {
      setAboutData(prev => ({ ...prev, values: prev.values.filter(item => item.id !== id) }));
    }
  };

  const handleAboutSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving About Page Data:", aboutData);
    alert("About Us page updated successfully! Check console for JSON object.");
  };

  // --- RENDER LOGIC ---

  if (pageName === 'about') {
    return (
      <AdminLayout onNavigate={onNavigate} activePage={`admin-edit-${pageName}`} title={`Edit Page: ${displayTitle}`} userRole={userRole}>
        <div className="max-w-5xl mx-auto">
          <form onSubmit={handleAboutSave} className="space-y-8">
            
            {/* Header / Actions */}
            <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-0 z-20">
               <div>
                 <h2 className="text-xl font-bold text-[#0A2B4C]">About Us Page Editor</h2>
                 <p className="text-sm text-gray-500">Manage content sections specific to the About page.</p>
               </div>
               <div className="flex gap-3">
                 <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm">Preview</button>
                 <button type="submit" className="px-6 py-2 bg-[#F9A826] text-white font-bold rounded-lg hover:bg-[#d88d15] shadow-sm text-sm">Save Changes</button>
               </div>
            </div>

            {/* 1. Hero Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-lg font-bold text-[#0A2B4C] mb-6 border-b pb-2">Hero Section</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Hero Title</label>
                    <input 
                      type="text" 
                      value={aboutData.hero.title}
                      onChange={(e) => handleHeroChange('title', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Subtitle</label>
                    <textarea 
                      rows={3}
                      value={aboutData.hero.subtitle}
                      onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" 
                    ></textarea>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Background Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex flex-col items-center justify-center relative bg-gray-50 hover:bg-white transition-colors overflow-hidden group">
                    {aboutData.hero.bgImage ? (
                      <>
                        <img src={aboutData.hero.bgImage} alt="Hero BG" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <span className="text-white font-semibold text-sm bg-black/50 px-3 py-1 rounded-full">Click to Replace</span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center text-gray-400">
                        <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span className="text-xs">Upload Background</span>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'hero')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Mission & Vision */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-lg font-bold text-[#0A2B4C] mb-6 border-b pb-2">Mission &amp; Vision</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-[#0A2B4C]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    <label className="font-semibold text-sm">Mission</label>
                  </div>
                  <input 
                      type="text" 
                      value={aboutData.mission.title}
                      onChange={(e) => handleDeepChange('mission', 'title', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826] mb-3"
                      placeholder="Title" 
                  />
                  <textarea 
                    rows={4}
                    value={aboutData.mission.description}
                    onChange={(e) => handleDeepChange('mission', 'description', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" 
                    placeholder="Mission description..."
                  ></textarea>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2 text-[#F9A826]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    <label className="font-semibold text-sm">Vision</label>
                  </div>
                  <input 
                      type="text" 
                      value={aboutData.vision.title}
                      onChange={(e) => handleDeepChange('vision', 'title', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826] mb-3"
                      placeholder="Title" 
                  />
                  <textarea 
                    rows={4}
                    value={aboutData.vision.description}
                    onChange={(e) => handleDeepChange('vision', 'description', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" 
                    placeholder="Vision description..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* 3. Core Values (CRUD List) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex justify-between items-end mb-6 border-b pb-2">
                <h3 className="text-lg font-bold text-[#0A2B4C]">Core Values</h3>
                <button type="button" onClick={addValue} className="text-sm font-semibold text-[#F9A826] hover:underline flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                  Add New Value
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aboutData.values.map((val, index) => (
                  <div key={val.id} className="relative border border-gray-200 rounded-lg p-4 bg-gray-50 group hover:shadow-sm transition-shadow">
                    <button 
                      type="button" 
                      onClick={() => removeValue(val.id)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                         <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-white rounded-full border border-gray-200">
                             <select 
                                value={val.icon} 
                                onChange={(e) => handleValueChange(val.id, 'icon', e.target.value)}
                                className="w-full h-full opacity-0 absolute cursor-pointer"
                                title="Change Icon"
                             >
                                <option value="Shield">Shield</option>
                                <option value="Lightbulb">Lightbulb</option>
                                <option value="Smile">Smile</option>
                                <option value="Users">Users</option>
                             </select>
                             {/* Visual Icon Representation */}
                             {val.icon === 'Shield' && <svg className="w-4 h-4 text-[#0A2B4C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                             {val.icon === 'Lightbulb' && <svg className="w-4 h-4 text-[#0A2B4C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
                             {val.icon === 'Smile' && <svg className="w-4 h-4 text-[#0A2B4C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                             {val.icon === 'Users' && <svg className="w-4 h-4 text-[#0A2B4C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                         </div>
                         <input 
                            type="text" 
                            value={val.title} 
                            onChange={(e) => handleValueChange(val.id, 'title', e.target.value)}
                            className="flex-1 bg-transparent border-b border-gray-300 focus:border-[#F9A826] outline-none text-sm font-bold text-[#0A2B4C] py-1"
                            placeholder="Value Title"
                         />
                      </div>
                      <textarea 
                        value={val.description}
                        onChange={(e) => handleValueChange(val.id, 'description', e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded p-2 text-xs focus:outline-none focus:border-[#F9A826]"
                        rows={2}
                        placeholder="Description..."
                      ></textarea>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Our Story */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-lg font-bold text-[#0A2B4C] mb-6 border-b pb-2">Our Story</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Heading</label>
                    <input 
                      type="text" 
                      value={aboutData.story.heading}
                      onChange={(e) => handleDeepChange('story', 'heading', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Narrative</label>
                    <textarea 
                      rows={8}
                      value={aboutData.story.text}
                      onChange={(e) => handleDeepChange('story', 'text', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F9A826]" 
                    ></textarea>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Side Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg h-60 flex flex-col items-center justify-center relative bg-gray-50 hover:bg-white transition-colors overflow-hidden group">
                    {aboutData.story.image ? (
                      <>
                        <img src={aboutData.story.image} alt="Story" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <span className="text-white font-semibold text-sm bg-black/50 px-3 py-1 rounded-full">Change Image</span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center text-gray-400">
                        <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span className="text-sm">Upload Story Image</span>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'story')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Call to Action */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-lg font-bold text-[#0A2B4C] mb-6 border-b pb-2">Bottom Call to Action</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">CTA Heading</label>
                  <input 
                    type="text" 
                    value={aboutData.cta.heading}
                    onChange={(e) => handleDeepChange('cta', 'heading', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subtext</label>
                  <textarea 
                    rows={2}
                    value={aboutData.cta.subtext}
                    onChange={(e) => handleDeepChange('cta', 'subtext', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" 
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Button Text (Orange)</label>
                        <input 
                            type="text" 
                            value={aboutData.cta.primaryBtnText}
                            onChange={(e) => handleDeepChange('cta', 'primaryBtnText', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Secondary Button Text (Border)</label>
                        <input 
                            type="text" 
                            value={aboutData.cta.secondaryBtnText}
                            onChange={(e) => handleDeepChange('cta', 'secondaryBtnText', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" 
                        />
                    </div>
                </div>
              </div>
            </div>

          </form>
        </div>
      </AdminLayout>
    );
  }

  // --- GENERIC EDITOR RENDER (Fallback) ---
  return (
    <AdminLayout onNavigate={onNavigate} activePage={`admin-edit-${pageName}`} title={`Edit Page: ${displayTitle}`} userRole={userRole}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#0A2B4C]">Page Content Editor</h2>
            <div className="text-sm text-gray-500">Last updated: 2 hours ago by Admin</div>
        </div>
        
        <p className="text-gray-500 mb-8 bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm">
            You are currently editing the content for the <strong>{displayTitle}</strong> page. 
            Changes made here will reflect on the live site after saving.
        </p>
        
        <form className="space-y-8" onSubmit={handleGenericSave}>
            {/* Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Page Title (Browser Title)</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" defaultValue={displayTitle} />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Slug / URL</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm bg-gray-100 text-gray-500" defaultValue={`/${pageName}`} disabled />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">SEO Meta Description</label>
                    <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#F9A826]" rows={3} defaultValue={`Find the best real estate deals on Sheltershub - ${displayTitle}.`}></textarea>
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* Content Editor Mock */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Main Content</label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                    {/* Toolbar */}
                    <div className="bg-gray-50 border-b border-gray-300 p-2 flex gap-2">
                        <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-gray-600"><span className="font-bold text-serif">B</span></button>
                        <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-gray-600"><span className="italic font-serif">I</span></button>
                        <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-gray-600"><span className="underline font-serif">U</span></button>
                        <div className="w-px h-6 bg-gray-300 mx-1"></div>
                        <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-gray-600 text-xs font-bold">H1</button>
                        <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-gray-600 text-xs font-bold">H2</button>
                        <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-gray-600 text-xs font-bold">H3</button>
                        <div className="w-px h-6 bg-gray-300 mx-1"></div>
                        <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-gray-600 flex items-center text-xs gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            Image
                        </button>
                    </div>
                    {/* Editable Area */}
                    <div className="p-4 h-96 overflow-y-auto bg-white text-gray-800 text-sm leading-relaxed" contentEditable suppressContentEditableWarning>
                        <h1 className="text-2xl font-bold mb-4">{displayTitle}</h1>
                        <p className="mb-4">This is a placeholder for the rich text editor content. Administrators and Editors can modify the text, images, and layout of this page here.</p>
                        <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <ul>
                            <li>Feature list item 1</li>
                            <li>Feature list item 2</li>
                            <li>Feature list item 3</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                <button type="button" className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="px-8 py-2.5 bg-[#F9A826] text-white font-bold rounded-lg hover:bg-[#d88d15] shadow-md transition-colors">Save & Publish</button>
            </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminPageEditor;
