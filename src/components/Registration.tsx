import React, { useState } from 'react';
import { Send, User, Mail, BookOpen, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { registerStudent, trackEvent } from '../services/firebaseService';
import { useSound } from '../hooks/useSound';

const Registration = () => {
  const { playClickSound, playSuccessSound } = useSound();
  const [formData, setFormData] = useState({
    childName: '',
    childAge: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    selectedClass: '',
    preferredSchedule: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const classes = [
    { id: 'scratch', name: 'Scratch Programming', age: '7-12 tahun', price: 'Rp 450.000' },
    { id: 'minecraft', name: 'Minecraft Coding', age: '8-14 tahun', price: 'Rp 550.000' },
    { id: 'python', name: 'Python for Kids', age: '10-16 tahun', price: 'Rp 650.000' },
    { id: 'web', name: 'Web Development', age: '12-16 tahun', price: 'Rp 750.000' }
  ];

  const schedules = [
    'Senin & Rabu (16:00-17:30)',
    'Selasa & Kamis (16:00-17:30)',
    'Sabtu (09:00-10:30)',
    'Sabtu (13:00-14:30)',
    'Minggu (09:00-10:30)'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.childName.trim()) {
      newErrors.childName = 'Nama anak harus diisi';
    }

    if (!formData.childAge || formData.childAge < 7 || formData.childAge > 16) {
      newErrors.childAge = 'Usia anak harus antara 7-16 tahun';
    }

    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Nama orang tua harus diisi';
    }

    if (!formData.parentEmail.trim()) {
      newErrors.parentEmail = 'Email orang tua harus diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)) {
      newErrors.parentEmail = 'Format email tidak valid';
    }

    if (!formData.parentPhone.trim()) {
      newErrors.parentPhone = 'Nomor telepon harus diisi';
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.parentPhone)) {
      newErrors.parentPhone = 'Format nomor telepon tidak valid';
    }

    if (!formData.selectedClass) {
      newErrors.selectedClass = 'Pilih kelas yang diinginkan';
    }

    if (!formData.preferredSchedule) {
      newErrors.preferredSchedule = 'Pilih jadwal yang diinginkan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Submit to Firebase
      const result = await registerStudent(formData);
      
      // Track registration event
      await trackEvent('registration_submitted', {
        selectedClass: formData.selectedClass,
        childAge: formData.childAge
      });

      if (result.success) {
        setIsSuccess(true);
        playSuccessSound(); // Play success sound
        setFormData({
          childName: '',
          childAge: '',
          parentName: '',
          parentEmail: '',
          parentPhone: '',
          selectedClass: '',
          preferredSchedule: '',
          message: ''
        });
      } else {
        throw new Error(result.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: error.message || 'Terjadi kesalahan. Silakan coba lagi nanti.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (isSuccess) {
    return (
      <section id="registration" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-3xl p-12 shadow-xl">
              <div className="mb-8">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Pendaftaran Berhasil!
                </h2>
                <p className="text-lg text-gray-600">
                  Terima kasih telah mendaftar di KidCoder Club! Tim kami akan segera menghubungi Anda untuk konfirmasi dan informasi lebih lanjut.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6 mb-8">
                <h3 className="font-bold text-gray-800 mb-4">Langkah Selanjutnya:</h3>
                <ul className="text-left space-y-2 text-gray-700">
                  <li>✅ Kami akan menghubungi Anda dalam 1x24 jam</li>
                  <li>✅ Konfirmasi jadwal dan pembayaran</li>
                  <li>✅ Link akses kelas akan dikirim via email</li>
                  <li>✅ Siapkan komputer/laptop untuk memulai belajar</li>
                </ul>
              </div>

              <button
                onClick={() => setIsSuccess(false)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Daftar Kelas Lain
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="registration" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-purple-100 rounded-full px-4 py-2 mb-4">
            <Send className="w-4 h-4 text-purple-600 mr-2" />
            <span className="text-purple-600 font-medium">Pendaftaran</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Yuk Daftar
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Sekarang!
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan anak yang telah merasakan serunya belajar coding bersama kami
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Form Pendaftaran</h3>
            
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700">{errors.general}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Child Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <User className="w-5 h-5 mr-2 text-purple-600" />
                  Informasi Anak
                </h4>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Anak *
                    </label>
                    <input
                      type="text"
                      name="childName"
                      value={formData.childName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-colors duration-300 ${
                        errors.childName ? 'border-red-300' : 'border-gray-200 focus:border-purple-500'
                      }`}
                      placeholder="Masukkan nama anak"
                    />
                    {errors.childName && (
                      <span className="text-red-500 text-sm mt-1">{errors.childName}</span>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Usia Anak *
                    </label>
                    <input
                      type="number"
                      name="childAge"
                      value={formData.childAge}
                      onChange={handleChange}
                      min="7"
                      max="16"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-colors duration-300 ${
                        errors.childAge ? 'border-red-300' : 'border-gray-200 focus:border-purple-500'
                      }`}
                      placeholder="Contoh: 10"
                    />
                    {errors.childAge && (
                      <span className="text-red-500 text-sm mt-1">{errors.childAge}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Parent Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-purple-600" />
                  Informasi Orang Tua
                </h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Orang Tua *
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-colors duration-300 ${
                      errors.parentName ? 'border-red-300' : 'border-gray-200 focus:border-purple-500'
                    }`}
                    placeholder="Masukkan nama orang tua"
                  />
                  {errors.parentName && (
                    <span className="text-red-500 text-sm mt-1">{errors.parentName}</span>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Orang Tua *
                    </label>
                    <input
                      type="email"
                      name="parentEmail"
                      value={formData.parentEmail}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-colors duration-300 ${
                        errors.parentEmail ? 'border-red-300' : 'border-gray-200 focus:border-purple-500'
                      }`}
                      placeholder="contoh@email.com"
                    />
                    {errors.parentEmail && (
                      <span className="text-red-500 text-sm mt-1">{errors.parentEmail}</span>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor Telepon *
                    </label>
                    <input
                      type="tel"
                      name="parentPhone"
                      value={formData.parentPhone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-colors duration-300 ${
                        errors.parentPhone ? 'border-red-300' : 'border-gray-200 focus:border-purple-500'
                      }`}
                      placeholder="08xxxxxxxxx"
                    />
                    {errors.parentPhone && (
                      <span className="text-red-500 text-sm mt-1">{errors.parentPhone}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Class Selection */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
                  Pilihan Kelas
                </h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kelas yang Diinginkan *
                  </label>
                  <select
                    name="selectedClass"
                    value={formData.selectedClass}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-colors duration-300 ${
                      errors.selectedClass ? 'border-red-300' : 'border-gray-200 focus:border-purple-500'
                    }`}
                  >
                    <option value="">Pilih kelas</option>
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name} ({cls.age}) - {cls.price}
                      </option>
                    ))}
                  </select>
                  {errors.selectedClass && (
                    <span className="text-red-500 text-sm mt-1">{errors.selectedClass}</span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jadwal yang Diinginkan *
                  </label>
                  <select
                    name="preferredSchedule"
                    value={formData.preferredSchedule}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-colors duration-300 ${
                      errors.preferredSchedule ? 'border-red-300' : 'border-gray-200 focus:border-purple-500'
                    }`}
                  >
                    <option value="">Pilih jadwal</option>
                    {schedules.map(schedule => (
                      <option key={schedule} value={schedule}>
                        {schedule}
                      </option>
                    ))}
                  </select>
                  {errors.preferredSchedule && (
                    <span className="text-red-500 text-sm mt-1">{errors.preferredSchedule}</span>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pesan Tambahan (Opsional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 transition-colors duration-300"
                  placeholder="Pesan atau pertanyaan tambahan..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={playClickSound}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Mengirim...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    Daftar Sekarang
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Kontak Kami</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-purple-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-800">Telepon</div>
                    <div className="text-gray-600">0812-3456-7890</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-purple-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-800">Email</div>
                    <div className="text-gray-600">info@kidcoderclub.com</div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">FAQ</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Kapan kelas dimulai?</h4>
                  <p className="text-gray-600 text-sm">Kelas dimulai setiap minggu setelah pembayaran dikonfirmasi.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Apakah ada trial class?</h4>
                  <p className="text-gray-600 text-sm">Ya, kami menyediakan trial class gratis untuk semua siswa baru.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Peralatan apa yang dibutuhkan?</h4>
                  <p className="text-gray-600 text-sm">Hanya laptop/komputer dengan koneksi internet yang stabil.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;