/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (mock)
    setTimeout(() => {
      toast.success('Message Sent! Thank you for reaching out. I will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
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
                      className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-500"
                      placeholder="John Doe"
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
                      className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-500"
                      placeholder="john@example.com"
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
                      rows={5}
                      className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-500 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    aria-label="Kirim pesan kontak"
                    className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-6 text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/50 dark:shadow-blue-500/50"
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
