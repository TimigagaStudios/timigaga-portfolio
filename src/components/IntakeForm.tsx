import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

const IntakeForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    projectType: [] as string[],
    budget: '',
    description: '',
    timeline: '',
    designStyle: '',
    theme: '',
    inspiration: '',
    features: [] as string[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === 'projectType') {
      setFormData(prev => ({
        ...prev,
        projectType: checked 
          ? [...prev.projectType, value]
          : prev.projectType.filter(item => item !== value)
      }));
    } else if (name === 'features') {
      setFormData(prev => ({
        ...prev,
        features: checked
          ? [...prev.features, value]
          : prev.features.filter(item => item !== value)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    console.log('Form Submitted:', formData);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-32 glass-dark rounded-[3rem] border border-[#95EF90]/30"
      >
        <h3 className="text-5xl font-bold text-white mb-6 tracking-tighter">SUCCESS<span className="text-[#95EF90]">.</span></h3>
        <p className="text-gray-400 max-w-md mx-auto mb-10 text-sm leading-relaxed font-normal">
          Your vision has been transmitted. Our lead strategist will review your requirements and reach out within 24 hours.
        </p>
        <Button onClick={() => setIsSuccess(false)} variant="aura" size="md" className="px-10 py-4 text-[10px] uppercase font-bold tracking-widest">
          SUBMIT ANOTHER PROJECT
        </Button>
      </motion.div>
    );
  }

  const inputClasses = "w-full px-4 py-3 md:py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#95EF90] focus:ring-1 focus:ring-[#95EF90] outline-none transition-all placeholder:text-gray-600 font-body text-sm md:text-base";
  const labelClasses = "block text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-3 font-heading";

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-8 md:space-y-12 glass-dark p-6 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-white/5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        <div>
          <label className={labelClasses}>Full Name</label>
          <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={inputClasses} placeholder="Your Name" />
        </div>
        <div>
          <label className={labelClasses}>Email Address</label>
          <input required type="email" name="email" value={formData.email} onChange={handleChange} className={inputClasses} placeholder="email@company.com" />
        </div>
        <div>
          <label className={labelClasses}>Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClasses} placeholder="+1 (000) 000-0000" />
        </div>
        <div>
          <label className={labelClasses}>Company / Studio</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} className={inputClasses} placeholder="Company Name" />
        </div>
        <div>
          <label className={labelClasses}>Location / Country</label>
          <input type="text" name="country" value={formData.country} onChange={handleChange} className={inputClasses} placeholder="Where are you based?" />
        </div>
        <div>
          <label className={labelClasses}>Estimated Budget</label>
          <select name="budget" value={formData.budget} onChange={handleChange} className={inputClasses}>
            <option value="">Select Range</option>
            <option value="<5k">$1,000 - $5,000</option>
            <option value="5k-10k">$5,000 - $10,000</option>
            <option value="10k-25k">$10,000 - $25,000</option>
            <option value="25k+">$25,000+</option>
          </select>
        </div>
        <div>
          <label className={labelClasses}>Desired Timeline</label>
          <select name="timeline" value={formData.timeline} onChange={handleChange} className={inputClasses}>
            <option value="">Select Timeline</option>
            <option value="urgent">Urgent (&lt; 2 weeks)</option>
            <option value="1month">~ 1 Month</option>
            <option value="3months">2-3 Months</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
        <div>
          <label className={labelClasses}>Preferred Style</label>
          <input type="text" name="designStyle" value={formData.designStyle} onChange={handleChange} className={inputClasses} placeholder="e.g. Cinematic, Minimal, Bold" />
        </div>
      </div>

      <div>
        <label className={labelClasses}>Project Type</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['Web Design', 'App Dev', 'Branding', 'UI/UX Design', 'AI Solutions', 'Cinematography'].map((type) => (
            <label key={type} className={`flex items-center justify-between cursor-pointer p-4 rounded-xl border transition-all duration-300 ${formData.projectType.includes(type) ? 'bg-[#95EF90] border-[#95EF90] text-black' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'}`}>
              <span className="text-xs font-bold uppercase tracking-widest">{type}</span>
              <input 
                type="checkbox" 
                name="projectType" 
                value={type} 
                checked={formData.projectType.includes(type)} 
                onChange={handleCheckboxChange} 
                className="hidden" 
              />
              {formData.projectType.includes(type) && <div className="w-2 h-2 bg-black rounded-full"></div>}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClasses}>Project Description</label>
        <textarea 
          required 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          rows={6} 
          className={`${inputClasses} resize-none`} 
          placeholder="Describe your vision, goals and any specific requirements..."
        ></textarea>
      </div>

      <div className="flex justify-center pt-8">
        <Button 
          type="submit" 
          variant="aura" 
          size="lg" 
          disabled={isSubmitting}
          className="w-full md:w-auto min-w-[300px] uppercase tracking-[0.3em] font-black text-sm py-6"
        >
          {isSubmitting ? 'TRANSMITTING...' : 'START THE JOURNEY'}
        </Button>
      </div>
    </motion.form>
  );
};

export default IntakeForm;
