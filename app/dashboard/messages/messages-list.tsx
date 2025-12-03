'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Trash2,
  Mail,
  MailOpen,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Search,
  Star,
} from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Checkbox } from '@/src/components/ui/checkbox';
import { toast } from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';
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

export default function MessagesList() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessages, setSelectedMessages] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 25;

  // Fetch messages
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/messages');
      const data = await response.json();

      if (data.success) {
        setMessages(data.data);
      } else {
        toast.error('Gagal memuat pesan');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Terjadi kesalahan saat memuat pesan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(filteredMessages.map((msg) => msg.id));
      setSelectedMessages(allIds);
    } else {
      setSelectedMessages(new Set());
    }
  };

  // Handle select single message
  const handleSelectMessage = (messageId: string, checked: boolean) => {
    const newSelected = new Set(selectedMessages);
    if (checked) {
      newSelected.add(messageId);
    } else {
      newSelected.delete(messageId);
    }
    setSelectedMessages(newSelected);
  };

  // Handle delete selected messages
  const handleDeleteSelected = async () => {
    if (selectedMessages.size === 0) {
      toast.error('Pilih pesan yang ingin dihapus');
      return;
    }

    if (!confirm(`Hapus ${selectedMessages.size} pesan?`)) {
      return;
    }

    try {
      const deletePromises = Array.from(selectedMessages).map((id) =>
        fetch(`/api/messages/${id}`, { method: 'DELETE' })
      );

      await Promise.all(deletePromises);

      toast.success(`${selectedMessages.size} pesan berhasil dihapus`);
      setSelectedMessages(new Set());
      fetchMessages();
    } catch (error) {
      console.error('Error deleting messages:', error);
      toast.error('Gagal menghapus pesan');
    }
  };

  // Filter messages based on search query
  const filteredMessages = messages.filter(
    (msg) =>
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);
  const startIndex = (currentPage - 1) * messagesPerPage;
  const endIndex = startIndex + messagesPerPage;
  const currentMessages = filteredMessages.slice(startIndex, endIndex);

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: idLocale,
      });
    } catch {
      return dateString;
    }
  };

  // Truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
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

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              Messages
            </h1>
            <Button
              onClick={fetchMessages}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Cari pesan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white dark:bg-slate-900"
            />
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-4 py-2 flex items-center gap-2 border-t border-slate-200 dark:border-slate-700">
          <Checkbox
            checked={
              selectedMessages.size > 0 &&
              selectedMessages.size === filteredMessages.length
            }
            onCheckedChange={handleSelectAll}
          />
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDeleteSelected}
              disabled={selectedMessages.size === 0}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" disabled className="gap-2">
              <MailOpen className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" disabled className="gap-2">
              <Star className="h-4 w-4" />
            </Button>
          </div>

          <div className="ml-auto flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <span>
              {startIndex + 1}-{Math.min(endIndex, filteredMessages.length)} dari{' '}
              {filteredMessages.length}
            </span>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
          </div>
        ) : currentMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500 dark:text-slate-400">
            <Mail className="h-16 w-16 mb-4 opacity-50" />
            <p className="text-lg font-medium">
              {searchQuery ? 'Tidak ada pesan yang cocok' : 'Tidak ada pesan'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {currentMessages.map((message) => (
              <div
                key={message.id}
                className={`flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors ${
                  selectedMessages.has(message.id)
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : ''
                }`}
                onClick={(e) => {
                  // Don't navigate if clicking checkbox
                  if ((e.target as HTMLElement).closest('[role="checkbox"]')) {
                    return;
                  }
                  router.push(`/dashboard/messages/${message.id}`);
                }}
              >
                {/* Checkbox */}
                <div onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedMessages.has(message.id)}
                    onCheckedChange={(checked) =>
                      handleSelectMessage(message.id, checked as boolean)
                    }
                  />
                </div>

                {/* Star (disabled for now) */}
                <button className="text-slate-300 dark:text-slate-600 hover:text-yellow-500 transition-colors">
                  <Star className="h-4 w-4" />
                </button>

                {/* Avatar */}
                <div className="shrink-0">
                  {message.user.image ? (
                    <Image
                      src={message.user.image}
                      alt={message.user.name || 'User'}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
                      {getInitials(message.user.name)}
                    </div>
                  )}
                </div>

                {/* Message Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {message.user.name || 'Unknown User'}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {message.user.email}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {truncateText(message.subject, 50)}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      - {truncateText(message.content, 80)}
                    </span>
                  </div>
                </div>

                {/* Date */}
                <div className="shrink-0 text-xs text-slate-500 dark:text-slate-400">
                  {formatDate(message.createdAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
