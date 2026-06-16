import { useState } from 'react';
import { SectionWrapper, SectionHeading, Button } from './ui';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    title: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Work email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid work email';
    }
    
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      // Log submission for demonstration purposes
      console.log('Demo Request Submitted:', formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for field when user typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <SectionWrapper id="contact" bg="white">
      <SectionHeading
        badge="Get Started"
        title="The AI-Native Workforce Needs a Passport"
        subtitle="Enterprises will need a way to know who is ready, at what autonomy level, in which work context. Start with Praxis."
        center={true}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-8">
        {/* Left Column - Core Copy */}
        <div className="lg:col-span-5 flex flex-col justify-center h-full">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-navy-900 leading-tight">
              Licensing humans for the age of digital labor.
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              The future of work will not be defined by who knows AI. It will be defined by who can safely operate with AI.
            </p>
            <p className="text-lg text-slate-600 font-medium leading-relaxed">
              Praxis licenses humans for the age of digital labor.
            </p>

            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-900 text-sm">Simulation-Based Readiness Evidence</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Verifiable proof of workflow judgment and risk containment.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-900 text-sm">Verified AI Work Passport Credentials</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Portable certificates mapping humans to autonomy levels L0-L5.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-900 text-sm">Enterprise Deployment Intelligence</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Dashboards pointing employers to deployable talent without risk.</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Button href="#passport" variant="secondary" size="md">
                Explore the AI Work Passport
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Demo Request Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-100/50">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-navy-900">Request Received</h3>
                  <p className="text-slate-600 max-w-md mx-auto">
                    Thank you, {formData.name}. One of our workforce architects will contact you shortly to schedule a customized demo of the Praxis platform.
                  </p>
                </div>
                <div className="pt-4">
                  <button 
                    onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', company: '', title: '', message: '' }); }}
                    className="text-sm font-semibold text-electric-600 hover:text-electric-700 underline"
                  >
                    Submit another request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold text-navy-900 border-b border-slate-100 pb-4 mb-4">
                  Request a Workforce Readiness Audit
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-navy-900 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Jenkins"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:ring-electric-100'} focus:border-electric-500 focus:ring-4 focus:outline-none transition-all text-navy-900 placeholder:text-slate-400`}
                    />
                    {errors.name && <p className="text-xs font-medium text-red-500 mt-1.5">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-navy-900 mb-2">
                      Work Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. sarah@company.com"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:ring-electric-100'} focus:border-electric-500 focus:ring-4 focus:outline-none transition-all text-navy-900 placeholder:text-slate-400`}
                    />
                    {errors.email && <p className="text-xs font-medium text-red-500 mt-1.5">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-navy-900 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Enterprise Global"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.company ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:ring-electric-100'} focus:border-electric-500 focus:ring-4 focus:outline-none transition-all text-navy-900 placeholder:text-slate-400`}
                    />
                    {errors.company && <p className="text-xs font-medium text-red-500 mt-1.5">{errors.company}</p>}
                  </div>

                  <div>
                    <label htmlFor="title" className="block text-sm font-semibold text-navy-900 mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. VP of Workforce Planning"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.title ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:ring-electric-100'} focus:border-slate-200 focus:border-electric-500 focus:ring-4 focus:outline-none transition-all text-navy-900 placeholder:text-slate-400`}
                    />
                    {errors.title && <p className="text-xs font-medium text-red-500 mt-1.5">{errors.title}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-navy-900 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your team's AI initiatives and safety goals..."
                    className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:ring-electric-100'} focus:border-electric-500 focus:ring-4 focus:outline-none transition-all text-navy-900 placeholder:text-slate-400 resize-none`}
                  />
                  {errors.message && <p className="text-xs font-medium text-red-500 mt-1.5">{errors.message}</p>}
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="primary" size="lg" className="w-full justify-center">
                    Request a Demo
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
