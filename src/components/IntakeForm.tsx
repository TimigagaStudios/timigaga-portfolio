import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import { supabase } from '@/lib/supabase';

type IntakeFormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  project_category: string;
  budget: string;
  message: string;
  timeline: string;
  style_preference: string;
  theme: string;
};

const IntakeForm = () => {
  const [formData, setFormData] = useState<IntakeFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    project_category: '',
    budget: '',
    message: '',
    timeline: '',
    style_preference: '',
    theme: '',
  });

  const [referenceFiles, setReferenceFiles] = useState<File[]>([]);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setReferenceFiles((prev) => [...prev, ...files]);
  };

  const removeReferenceFile = (indexToRemove: number) => {
    setReferenceFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const uploadReferenceImages = async () => {
    if (referenceFiles.length === 0) return [];

    setIsUploadingImages(true);

    try {
      const uploadedUrls: string[] = [];

      for (const file of referenceFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        const { error } = await supabase.storage
          .from('client-references')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (error) {
          throw new Error(error.message);
        }

        const { data } = supabase.storage
          .from('client-references')
          .getPublicUrl(filePath);

        if (data?.publicUrl) {
          uploadedUrls.push(data.publicUrl);
        }
      }

      return uploadedUrls;
    } finally {
      setIsUploadingImages(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const uploadedImageUrls = await uploadReferenceImages();

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          project_category: formData.project_category,
          budget: formData.budget,
          style_preference: formData.style_preference,
          theme: formData.theme,
          reference_images: uploadedImageUrls,
          message: `
Location / Country: ${formData.country || 'N/A'}
Timeline: ${formData.timeline || 'N/A'}

Project Brief:
${formData.message}
          `.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'Submission failed');
      }

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        country: '',
        project_category: '',
        budget: '',
        message: '',
        timeline: '',
        style_preference: '',
        theme: '',
      });
      setReferenceFiles([]);
    } catch (error) {
      console.error(error);
      setSubmitError('Something went wrong while submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20 md:py-24 glass-dark rounded-[2rem] md:rounded-[2.5rem] border border-[#95EF90]/20"
      >
        <h3 className="text-3xl md:text-5xl font-semibold text-white mb-5 tracking-tight">
          Request received<span className="text-[#95EF90]">.</span>
        </h3>

        <p className="text-white/60 max-w-md mx-auto mb-8 text-sm md:text-base leading-8">
          Your project request has been submitted successfully. Timigaga Studios
          will review it and get back to you as soon as possible.
        </p>

        <Button
          onClick={() => setIsSuccess(false)}
          variant="aura"
          size="md"
          className="px-8 text-[11px] uppercase tracking-[0.18em] font-semibold"
        >
          Submit Another Request
        </Button>
      </motion.div>
    );
  }

  const inputClasses =
    'w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3.5 text-white outline-none transition-all placeholder:text-white/25 focus:border-[#95EF90] focus:ring-1 focus:ring-[#95EF90] text-sm md:text-base';

  const labelClasses =
    'block text-[11px] uppercase tracking-[0.22em] text-white/40 mb-3';

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-8 md:space-y-10 glass-dark p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-white/6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
        <div>
          <label className={labelClasses}>Full Name</label>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Your name"
          />
        </div>

        <div>
          <label className={labelClasses}>Email Address</label>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
            placeholder="email@company.com"
          />
        </div>

        <div>
          <label className={labelClasses}>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputClasses}
            placeholder="+234..."
          />
        </div>

        <div>
          <label className={labelClasses}>Company / Brand</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Company or brand name"
          />
        </div>

        <div>
          <label className={labelClasses}>Location / Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Where are you based?"
          />
        </div>

        <div>
          <label className={labelClasses}>Project Category</label>
          <select
            required
            name="project_category"
            value={formData.project_category}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Select category</option>
            <option value="Web Design">Web Design</option>
            <option value="Web Development">Web Development</option>
            <option value="Brand Identity">Brand Identity</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="AI Workflow System">AI Workflow System</option>
            <option value="Photography">Photography</option>
            <option value="Cinematography">Cinematography</option>
            <option value="Social Media Management">Social Media Management</option>
          </select>
        </div>

        <div>
          <label className={labelClasses}>Budget</label>
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className={inputClasses}
            placeholder="e.g. ₦150,000, $300, Flexible, Need quote"
          />
        </div>

        <div>
          <label className={labelClasses}>Desired Timeline</label>
          <select
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Select timeline</option>
            <option value="Urgent (under 2 weeks)">Urgent (under 2 weeks)</option>
            <option value="About 1 month">About 1 month</option>
            <option value="2 to 3 months">2 to 3 months</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className={labelClasses}>Preferred Style</label>
          <input
            type="text"
            name="style_preference"
            value={formData.style_preference}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Minimal, bold, cinematic, modern, luxury..."
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClasses}>Preferred Theme</label>
          <select
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">Select theme preference</option>
            <option value="Dark">Dark</option>
            <option value="Light">Light</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className={labelClasses}>Reference Images (Optional)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-[#95EF90] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black hover:file:opacity-90"
          />

          {referenceFiles.length > 0 && (
            <div className="mt-4 space-y-3">
              {referenceFiles.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between rounded-xl border border-white/8 bg-white/5 px-4 py-3"
                >
                  <p className="text-sm text-white/65 truncate pr-4">{file.name}</p>
                  <button
                    type="button"
                    onClick={() => removeReferenceFile(index)}
                    className="text-xs uppercase tracking-[0.18em] text-red-300 hover:text-red-200 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <label className={labelClasses}>Project Description</label>
          <textarea
            required
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={7}
            className={`${inputClasses} resize-none`}
            placeholder="Describe your project goals, vision, audience, features, and any important details..."
          />
        </div>
      </div>

      {submitError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {submitError}
        </div>
      )}

      <div className="pt-2">
        <Button
          type="submit"
          variant="aura"
          size="md"
          disabled={isSubmitting || isUploadingImages}
          className="text-[11px] uppercase tracking-[0.18em] font-semibold px-8"
        >
          {isUploadingImages
            ? 'Uploading images...'
            : isSubmitting
            ? 'Submitting...'
            : 'Start the Journey'}
        </Button>
      </div>
    </motion.form>
  );
};

export default IntakeForm;