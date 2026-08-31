import React, { useState } from 'react';
import { X, Send, CheckCircle2, LoaderCircle } from 'lucide-react';
import { submitContactMessage } from '../../lib/submitInquiry';

interface YouthContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const YouthContactModal: React.FC<YouthContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await submitContactMessage({
        kind: 'contact',
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        message: formData.message
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send your message. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setError('');
    setSaving(false);
    setFormData({ name: '', email: '', phone: '', city: '', message: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-gray-200 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto text-[#111827] shadow-2xl p-6 sm:p-8 relative">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
          <div>
            <span className="text-xs font-mono font-bold text-[#05472A] uppercase tracking-widest">
              YOUTH KA PAKISTAN
            </span>
            <h3 className="font-serif text-2xl font-black text-[#111827]">
              Contact Us
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            className="text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ali Khan"
                className="w-full bg-[#F9FAFB] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#05472A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@email.com"
                className="w-full bg-[#F9FAFB] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#05472A]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+92 300 1234567"
                  className="w-full bg-[#F9FAFB] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#05472A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Lahore"
                  className="w-full bg-[#F9FAFB] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#05472A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Message *
              </label>
              <textarea
                rows={3}
                required
                minLength={8}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we help you?"
                className="w-full bg-[#F9FAFB] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#05472A]"
              ></textarea>
            </div>

            {error && <p className="text-sm text-red-700">{error}</p>}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#05472A] hover:bg-[#03311d] text-white font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-full shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {saving ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 text-[#FFD700]" />}
              {saving ? 'Sending…' : 'SUBMIT INQUIRY'}
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#05472A]/10 text-[#05472A] flex items-center justify-center mx-auto border border-[#05472A]/30">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h4 className="font-serif text-xl font-bold text-[#111827]">
              Message Sent!
            </h4>

            <p className="text-gray-600 text-xs">
              Thank you for contacting Youth ka Pakistan. We will reply to <strong>{formData.email}</strong> as soon as possible.
            </p>

            <button
              onClick={resetAndClose}
              className="bg-[#05472A] text-white font-bold text-xs uppercase px-6 py-2.5 rounded-full cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
