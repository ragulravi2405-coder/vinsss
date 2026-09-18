import React, { useState, useEffect } from 'react';
import { X, Upload, FolderOpen, Check, Image as ImageIcon } from 'lucide-react';

export interface ImageEditPayload {
  id: string;
  title: string;
  category?: string;
  description?: string;
  imagePath: string;
  date?: string;
  subtitle?: string;
  chiefGuest?: string;
}

interface EditImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ImageEditPayload | null;
  onSave: (updatedData: ImageEditPayload) => void;
  categories?: string[];
  type?: 'gallery' | 'event' | 'slide' | 'media';
  onPickExisting?: (callback: (path: string) => void) => void;
}

import { uploadMediaApi } from '../../services/api';

export const EditImageModal: React.FC<EditImageModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave,
  categories = ['Cultural Dance', 'Ceremony', 'Campus', 'Awards', 'Workshop', 'Seminar', 'Sports', 'General'],
  type = 'gallery',
  onPickExisting
}) => {
  const [formData, setFormData] = useState<ImageEditPayload>({
    id: '',
    title: '',
    category: 'Campus',
    description: '',
    imagePath: '',
    subtitle: '',
    date: '',
    chiefGuest: ''
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        title: initialData.title || '',
        category: initialData.category || 'Campus',
        description: initialData.description || '',
        imagePath: initialData.imagePath || '',
        subtitle: initialData.subtitle || '',
        date: initialData.date || '',
        chiefGuest: initialData.chiefGuest || ''
      });
    }
  }, [initialData]);

  if (!isOpen || !initialData) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }
    try {
      setIsUploading(true);
      const res = await uploadMediaApi(file);
      if (res.success && res.url) {
        setFormData((prev) => ({ ...prev, imagePath: res.url }));
      } else if (!res.success && res.message) {
        alert(res.message);
      }
    } catch (err: any) {
      console.error('Failed to upload image:', err);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Title / Name is required.');
      return;
    }
    if (!formData.imagePath.trim()) {
      alert('Image file / path is required.');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A2540]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full border-2 border-[#0A2540]/20 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0A2540] text-white flex items-center justify-between border-b border-white/15">
          <div className="flex items-center gap-2.5">
            <ImageIcon className="w-5 h-5 text-[#FF6B00]" />
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">
                Edit Image Details &amp; Description
              </h3>
              <p className="text-[11px] text-white/80">
                Update name, description text, category, or replace photo.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* Image Preview & Replacement Section */}
          <div className="space-y-2 bg-white p-3.5 rounded-2xl border-2 border-[#0A2540]/15">
            <label className="block text-xs font-bold text-[#0A2540]">
              Image Photo &amp; Replacement
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-32 h-24 rounded-xl overflow-hidden bg-gray-100 border-2 border-[#0A2540]/20 shrink-0">
                <img
                  src={formData.imagePath || '/images/logo/vins-logo.jpg'}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 w-full space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-[#0A2540] hover:text-white border-2 border-[#0A2540]/20 rounded-xl text-xs font-bold text-[#0A2540] cursor-pointer shadow-xs transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  {onPickExisting && (
                    <button
                      type="button"
                      onClick={() => onPickExisting((path) => setFormData((prev) => ({ ...prev, imagePath: path })))}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-[#0A2540] hover:text-white border-2 border-[#0A2540]/20 rounded-xl text-xs font-bold text-[#0A2540] cursor-pointer shadow-xs transition-colors"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>Pick Asset</span>
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  value={formData.imagePath}
                  onChange={(e) => setFormData({ ...formData, imagePath: e.target.value })}
                  placeholder="Or enter image URL / path..."
                  className="w-full bg-white border-2 border-[#0A2540]/20 rounded-xl px-3 py-2 text-xs text-[#0A2540] focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>
          </div>

          {/* Name / Title */}
          <div>
            <label className="block text-xs font-bold text-[#0A2540] mb-1">
              Image Name / Title <span className="text-[#FF6B00]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Annual Day Dance Fest or Robotics Lab Demo"
              className="w-full bg-white border-2 border-[#0A2540]/20 rounded-2xl px-3.5 py-2.5 text-xs text-[#0A2540] placeholder-slate-400 font-bold focus:outline-none focus:border-[#FF6B00]"
            />
          </div>

          {/* Category & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#0A2540] mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-white border-2 border-[#0A2540]/20 rounded-2xl px-3.5 py-2 text-xs font-bold text-[#0A2540] focus:outline-none focus:border-[#FF6B00]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {type === 'event' ? (
              <div>
                <label className="block text-xs font-bold text-[#0A2540] mb-1">
                  Event Date
                </label>
                <input
                  type="text"
                  value={formData.date || ''}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="e.g. April 12, 2026"
                  className="w-full bg-white border-2 border-[#0A2540]/20 rounded-2xl px-3.5 py-2 text-xs font-bold text-[#0A2540] focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            ) : type === 'slide' ? (
              <div>
                <label className="block text-xs font-bold text-[#0A2540] mb-1">
                  Slide Subtitle
                </label>
                <input
                  type="text"
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Green Hill Campus"
                  className="w-full bg-white border-2 border-[#0A2540]/20 rounded-2xl px-3.5 py-2 text-xs font-bold text-[#0A2540] focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-[#0A2540] mb-1">
                  Subtitle / Tag (Optional)
                </label>
                <input
                  type="text"
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Annual Fest 2026"
                  className="w-full bg-white border-2 border-[#0A2540]/20 rounded-2xl px-3.5 py-2 text-xs font-bold text-[#0A2540] focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            )}
          </div>

          {type === 'event' && (
            <div>
              <label className="block text-xs font-bold text-[#0A2540] mb-1">
                Chief Guest / Dignitary (Optional)
              </label>
              <input
                type="text"
                value={formData.chiefGuest || ''}
                onChange={(e) => setFormData({ ...formData, chiefGuest: e.target.value })}
                placeholder="e.g. Dr. R. Velraj, Anna University"
                className="w-full bg-white border-2 border-[#0A2540]/20 rounded-2xl px-3.5 py-2 text-xs font-bold text-[#0A2540] focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          )}

          {/* Description / Caption */}
          <div>
            <label className="block text-xs font-bold text-[#0A2540] mb-1">
              Description / Caption
            </label>
            <textarea
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter detailed description, student achievements, or caption for this photo..."
              className="w-full bg-white border-2 border-[#0A2540]/20 rounded-2xl p-3.5 text-xs text-[#0A2540] placeholder-slate-400 font-medium focus:outline-none focus:border-[#FF6B00]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t-2 border-[#0A2540]/15">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border-2 border-[#0A2540]/30 text-xs font-bold text-[#0A2540] hover:bg-[#0A2540]/10 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#FF6B00] hover:bg-[#E05E00] text-white text-xs font-bold rounded-full transition-all shadow-md flex items-center gap-1.5 cursor-pointer border border-white/20"
            >
              <Check className="w-4 h-4 text-white" />
              <span>Save Changes</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
