/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Send, LogIn, UserPlus } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Contact = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill name and email when user is logged in
  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        name: session.user.name || '',
        email: session.user.email || '',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        name: '',
        email: '',
      }));
    }
  }, [session]);

  const handleChange = (e: any) => {
    // Only prevent editing name and email fields when logged in
    if (session?.user && (e.target.name === 'name' || e.target.name === 'email')) {
      return;
    }
    
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Check if user is logged in
    if (!session?.user) {
      toast.error('Anda harus login terlebih dahulu untuk mengirim pesan');
      return;
    }

    if (!formData.subject.trim()) {
      toast.error('Subject tidak boleh kosong');
      return;
    }

    if (!formData.message.trim()) {
      toast.error('Pesan tidak boleh kosong');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Pesan berhasil dikirim! Terima kasih telah menghubungi saya.');
        setFormData((prev) => ({ ...prev, subject: '', message: '' }));
      } else {
        toast.error(data.message || 'Gagal mengirim pesan');
      }
    } catch (error) {
      console.error('Error submitting message:', error);
      toast.error('Terjadi kesalahan saat mengirim pesan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginClick = () => {
    router.push('/auth/login');
  };

  const handleRegisterClick = () => {
    router.push('/auth/register');
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email',
      value: 'contact@irvans.my.id',
      link: 'mailto:contact@irvans.my.id',
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Phone',
      value: '+625845561655',
      link: 'https://wa.me/625845561655',
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Location',
      value: 'Indonesia',
      link: null,
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-cyan-500 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="bg-slate-100/70 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="shrink-0 text-blue-600 dark:text-blue-400">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                        {info.title}
                      </h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          aria-label={`Contact via ${info.title}`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-slate-700 dark:text-slate-400">{info.value}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <Card className="bg-slate-100/70 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!!session?.user || status === 'loading'}
                      className={`bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-500 ${
                        session?.user ? 'cursor-not-allowed opacity-70' : ''
                      }`}
                      placeholder={session?.user ? formData.name : 'Login untuk mengirim pesan'}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!!session?.user || status === 'loading'}
                      className={`bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-500 ${
                        session?.user ? 'cursor-not-allowed opacity-70' : ''
                      }`}
                      placeholder={session?.user ? formData.email : 'Login untuk mengirim pesan'}
                    />
                  </div>
                  
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={status === 'loading' || !session?.user}
                      className={`bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-500 ${
                        !session?.user ? 'cursor-not-allowed opacity-70' : ''
                      }`}
                      placeholder={
                        session?.user
                          ? 'Tell me about your subject...'
                          : 'Please log in first to send a message'
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      disabled={status === 'loading' || !session?.user}
                      rows={5}
                      className={`bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-500 resize-none ${
                        !session?.user ? 'cursor-not-allowed opacity-70' : ''
                      }`}
                      placeholder={
                        session?.user
                          ? 'Tell me about your project...'
                          : 'Please log in first to send a message'
                      }
                    />
                  </div>

                  {/* Conditional Buttons */}
                  {!session?.user && status !== 'loading' ? (
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        onClick={handleLoginClick}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-6 text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/50 dark:shadow-blue-500/50"
                        aria-label="Login untuk mengirim pesan"
                      >
                        <LogIn className="h-5 w-5 mr-2" />
                        Login
                      </Button>
                      <Button
                        type="button"
                        onClick={handleRegisterClick}
                        className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white py-6 text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-green-600/50 dark:shadow-green-500/50"
                        aria-label="Register untuk membuat akun"
                      >
                        <UserPlus className="h-5 w-5 mr-2" />
                        Register
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting || status === 'loading'}
                      aria-label="Kirim pesan kontak"
                      className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-6 text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/50 dark:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
