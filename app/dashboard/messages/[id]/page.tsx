'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import {
  ArrowLeft,
  Trash2,
  Reply,
  Forward,
  MoreVertical,
  Mail,
  RefreshCw,
  Printer,
  Archive,
} from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

interface Message {
  id: string;
  subject: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
}

export default function MessageDetail() {
  const router = useRouter();
  const params = useParams();
  const messageId = params?.id as string;

  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch message
  const fetchMessage = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/messages/${messageId}`);
      const data = await response.json();

      if (data.success) {
        setMessage(data.data);
      } else {
        toast.error('Gagal memuat pesan');
        router.push('/dashboard/messages');
      }
    } catch (error) {
      console.error('Error fetching message:', error);
      toast.error('Terjadi kesalahan saat memuat pesan');
      router.push('/dashboard/messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (messageId) {
      fetchMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageId]);

  // Handle delete
  const handleDelete = async () => {
    if (!confirm('Hapus pesan ini?')) {
      return;
    }

    try {
      const response = await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Pesan berhasil dihapus');
        router.push('/dashboard/messages');
      } else {
        toast.error('Gagal menghapus pesan');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Terjadi kesalahan saat menghapus pesan');
    }
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "EEEE, d MMMM yyyy 'pukul' HH:mm", {
        locale: idLocale,
      });
    } catch {
      return dateString;
    }
  };

  // Get initials from name
  const getInitials = (name: string | null) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-white dark:bg-slate-900">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
      </div>
    );
  }

  if (!message) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white dark:bg-slate-900">
        <Mail className="h-16 w-16 mb-4 text-slate-300 dark:text-slate-600" />
        <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
          Pesan tidak ditemukan
        </p>
        <Button onClick={() => router.push('/dashboard/messages')} className="mt-4">
          Kembali ke Inbox
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/dashboard/messages')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" disabled className="gap-2">
              <Archive className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handlePrint} className="gap-2">
              <Printer className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" disabled className="gap-2">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Message Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Subject */}
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
            {message.subject}
          </h1>

          {/* Message Card */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
            {/* Sender Info */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="shrink-0">
                  {message.user.image ? (
                    <Image
                      src={message.user.image}
                      alt={message.user.name || 'User'}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                      {getInitials(message.user.name)}
                    </div>
                  )}
                </div>

                {/* Sender Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {message.user.name || 'Unknown User'}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {message.user.email}
                      </p>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {formatDate(message.createdAt)}
                    </span>
                  </div>

                  {/* To field */}
                  <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-medium">kepada: </span>
                    <span>saya</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Body */}
            <div className="p-6">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 leading-relaxed">
                  {message.content}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 pb-6 flex gap-2">
              <Button variant="outline" className="gap-2" disabled>
                <Reply className="h-4 w-4" />
                Balas
              </Button>
              <Button variant="outline" className="gap-2" disabled>
                <Forward className="h-4 w-4" />
                Teruskan
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .max-w-4xl,
          .max-w-4xl * {
            visibility: visible;
          }
          .max-w-4xl {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
