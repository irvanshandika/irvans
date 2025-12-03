'use client';
import React, { useState, useEffect } from 'react';
import {
  Mail,
  MapPin,
  Phone,
  Send,
  LogIn,
  UserPlus,
  MessageSquare,
  Clock,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Only prevent editing name and email fields when logged in
    if (session?.user && (e.target.name === 'name' || e.target.name === 'email')) {
      return;
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      icon: Mail,
      title: 'Email',
      value: 'contact@irvans.my.id',
      link: 'mailto:contact@irvans.my.id',
      description: 'Send me an email anytime',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+62 584 556 1655',
      link: 'https://wa.me/625845561655',
      description: 'Available Mon-Fri, 9AM-5PM',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Indonesia',
      link: null,
      description: 'Open to remote work',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/30',
    },
  ];

  const features = [
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'I typically respond within 24 hours',
    },
    {
      icon: MessageSquare,
      title: 'Direct Communication',
      description: 'Get in touch directly with me',
    },
    {
      icon: CheckCircle2,
      title: 'Professional Service',
      description: 'Quality work and timely delivery',
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 dark:bg-purple-800/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 mb-6">
            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Let&apos;s Work Together
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Get In Touch
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
            Drop me a message and let&apos;s create something amazing together!
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="shrink-0 h-12 w-12 rounded-xl bg-linear-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="sticky top-24">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Contact Information
              </h3>
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="mb-4 bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 hover:-translate-y-1 group overflow-hidden"
                >
                  <CardContent className="p-6 relative">
                    {/* Gradient Background */}
                    <div
                      className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${info.color} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`}
                    />

                    <div className="flex items-start gap-4 relative z-10">
                      <div
                        className={`shrink-0 h-14 w-14 rounded-xl ${info.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <info.icon className={`h-7 w-7 bg-linear-to-br ${info.color} bg-clip-text text-transparent`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                          {info.title}
                        </h4>
                        {info.link ? (
                          <a
                            href={info.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors block truncate"
                            aria-label={`Contact via ${info.title}`}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-lg font-semibold text-slate-900 dark:text-white">
                            {info.value}
                          </p>
                        )}
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 shadow-xl">
              <CardContent className="p-8 lg:p-10">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Send Me a Message
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Fill out the form below and I&apos;ll get back to you as soon as possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                      >
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!!session?.user || status === 'loading'}
                        className={`h-12 bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 ${
                          session?.user ? 'cursor-not-allowed opacity-70' : ''
                        }`}
                        placeholder={session?.user ? formData.name : 'Login to send message'}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                      >
                        Your Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!!session?.user || status === 'loading'}
                        className={`h-12 bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 ${
                          session?.user ? 'cursor-not-allowed opacity-70' : ''
                        }`}
                        placeholder={session?.user ? formData.email : 'Login to send message'}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
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
                      className={`h-12 bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 ${
                        !session?.user ? 'cursor-not-allowed opacity-70' : ''
                      }`}
                      placeholder={
                        session?.user
                          ? 'What would you like to discuss?'
                          : 'Please log in first to send a message'
                      }
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
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
                      rows={6}
                      className={`bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 resize-none ${
                        !session?.user ? 'cursor-not-allowed opacity-70' : ''
                      }`}
                      placeholder={
                        session?.user
                          ? 'Tell me about your project or idea...'
                          : 'Please log in first to send a message'
                      }
                    />
                  </div>

                  {/* Submit Buttons */}
                  {!session?.user && status !== 'loading' ? (
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        type="button"
                        onClick={handleLoginClick}
                        className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 hover:scale-105"
                        aria-label="Login to send message"
                      >
                        <LogIn className="h-5 w-5 mr-2" />
                        Login to Send
                      </Button>
                      <Button
                        type="button"
                        onClick={handleRegisterClick}
                        variant="outline"
                        className="flex-1 h-12 border-2 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-all duration-300 hover:scale-105"
                        aria-label="Register to create account"
                      >
                        <UserPlus className="h-5 w-5 mr-2" />
                        Register
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting || status === 'loading'}
                      aria-label="Send contact message"
                      className="w-full h-12 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
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
