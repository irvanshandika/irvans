/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlock from '@tiptap/extension-code-block';
import Highlight from '@tiptap/extension-highlight';
import toast from 'react-hot-toast';
import {
  Upload,
  X,
  Bold,
  Italic,
  Code,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  ImageIcon,
} from 'lucide-react';
import Image from 'next/image';

const CATEGORIES = [
  'Web Development',
  'Mobile App',
  'UI/UX Design',
  'Backend',
  'Frontend',
  'Full Stack',
  'Machine Learning',
  'Data Science',
  'Game Development',
  'DevOps',
];

type FormValues = {
  title: string;
  description: string;
  categories: string[];
  code?: string;
  image?: FileList;
};

type ProjectFormProps = {
  onSuccess?: () => void;
  projectId?: string;
  initialData?: {
    title: string;
    description: string;
    categories: string[];
    code: string;
    imageUrl?: string;
  };
};

export default function ProjectForm({ onSuccess, projectId, initialData }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialData?.categories || []
  );
  // Mengubah state imagePreview menjadi array untuk mendukung multiple images
  const [imagePreviews, setImagePreviews] = useState<
    Array<{ id: string; url: string; file: File | null }>
  >(
    initialData?.imageUrl
      ? [{ id: crypto.randomUUID(), url: initialData.imageUrl, file: null }]
      : []
  );
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Tiptap Editor setup
  const editor = useEditor({
    extensions: [StarterKit, CodeBlock, Highlight],
    content: initialData?.description || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      form.setValue('description', html);
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
    immediatelyRender: false,
  });

  const form = useForm<FormValues>({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      categories: initialData?.categories || [],
      code: initialData?.code || '',
    },
    mode: 'onChange',
  });

  const processFile = (file: File) => {
    // Check file size (20MB limit)
    if (file.size > 20 * 1024 * 1024) {
      toast.error('Image size exceeds 20MB limit');
      return false;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed');
      return false;
    }

    // Create preview
    const reader = new FileReader();
    const imageId = crypto.randomUUID();

    reader.onload = e => {
      setImagePreviews(prev => [
        ...prev,
        {
          id: imageId,
          url: e.target?.result as string,
          file: file,
        },
      ]);
    };
    reader.readAsDataURL(file);
    return true;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Process each file
    let successCount = 0;
    Array.from(files).forEach(file => {
      if (processFile(file)) {
        successCount++;
      }
    });

    if (successCount > 0) {
      toast.success(`${successCount} image(s) added successfully`);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      // Process each dropped file
      let successCount = 0;
      Array.from(files).forEach(file => {
        if (processFile(file)) {
          successCount++;
        }
      });

      if (successCount > 0) {
        toast.success(`${successCount} image(s) added successfully`);
      }
    }
  };

  const removeImage = (id: string) => {
    setImagePreviews(prev => prev.filter(img => img.id !== id));
  };

  const handleClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);

      if (selectedCategories.length === 0) {
        toast.error('Please select at least one category');
        return;
      }

      // Add selected categories and code to form data
      data.categories = selectedCategories;
      // Pastikan data code sudah diupdate oleh editor Tiptap
      if (!data.code && editor) {
        const json = editor.getJSON();
        data.code = JSON.stringify(json);
      }

      // Handle multiple image uploads
      let imageUrls: string[] = [];

      // If we have new images to upload
      if (imagePreviews.length > 0) {
        const toastId = toast.loading('Uploading images to Cloudinary...');

        try {
          // Upload each image that has a file (new uploads)
          const uploadPromises = imagePreviews
            .filter(img => img.file) // Only upload new files
            .map(async img => {
              const formData = new FormData();
              formData.append('file', img.file as File);

              const uploadResponse = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
              });

              if (!uploadResponse.ok) {
                const errorData = await uploadResponse.json();
                throw new Error(errorData.error || 'Failed to upload image');
              }

              const uploadResult = await uploadResponse.json();
              return uploadResult.fileUrl;
            });

          // Wait for all uploads to complete
          const newImageUrls = await Promise.all(uploadPromises);

          // Add existing image URLs (from initialData that weren't changed)
          const existingImageUrls = imagePreviews
            .filter(img => !img.file) // Images without file are from initialData
            .map(img => img.url);

          // Combine all image URLs
          imageUrls = [...newImageUrls, ...existingImageUrls];

          toast.success(`${newImageUrls.length} image(s) uploaded successfully`, { id: toastId });
        } catch (uploadError: any) {
          console.error('Image upload error:', uploadError);
          toast.error(`Image upload failed: ${uploadError.message}`, { id: toastId });
          setIsSubmitting(false);
          return;
        }
      }

      // Prepare project data
      const projectData = {
        title: data.title,
        description: data.description,
        categories: selectedCategories,
        code: data.code,
        imageUrls: imageUrls.length > 0 ? imageUrls : null,
      };

      // Create or update project
      const toastId = toast.loading(projectId ? 'Updating project...' : 'Creating project...');
      const url = projectId ? `/api/projects/${projectId}` : '/api/projects';
      const method = projectId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || (projectId ? 'Failed to update project' : 'Failed to create project')
        );
      }

      toast.success(projectId ? 'Project updated successfully' : 'Project created successfully', {
        id: toastId,
      });

      // Reset form if creating new project
      if (!projectId) {
        form.reset();
        setSelectedCategories([]);
        editor?.commands.clearContent();
        setImagePreviews([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }

      // Call onSuccess callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-3xl mx-auto bg-background rounded-lg p-6 shadow-sm transition-all"
      >
        <div className="mb-4">
          <h2 className="text-2xl font-medium text-foreground mb-1">
            {projectId ? 'Edit Project' : 'Create New Project'}
          </h2>
          <p className="text-muted-foreground text-sm">
            Fill in the details below to {projectId ? 'update your' : 'create a new'} project
          </p>
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Project Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter project title"
                  {...field}
                  className="bg-muted/30 border-border focus-visible:ring-ring transition-all"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Description</FormLabel>
              <FormControl>
                <div className="border border-border rounded-lg overflow-hidden bg-muted/30 transition-all">
                  <div className="flex items-center gap-1 border-b border-border/20 p-2 bg-muted/40">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => editor?.chain().focus().toggleBold().run()}
                      className={`rounded-md transition-colors ${editor?.isActive('bold') ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50 hover:text-accent-foreground'}`}
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => editor?.chain().focus().toggleItalic().run()}
                      className={`rounded-md transition-colors ${editor?.isActive('italic') ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50 hover:text-accent-foreground'}`}
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                      className={`rounded-md transition-colors ${editor?.isActive('codeBlock') ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50 hover:text-accent-foreground'}`}
                    >
                      <Code className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => editor?.chain().focus().toggleBulletList().run()}
                      className={`rounded-md transition-colors ${editor?.isActive('bulletList') ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50 hover:text-accent-foreground'}`}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                      className={`rounded-md transition-colors ${editor?.isActive('orderedList') ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50 hover:text-accent-foreground'}`}
                    >
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                      className={`rounded-md transition-colors ${editor?.isActive('heading', { level: 1 }) ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50 hover:text-accent-foreground'}`}
                    >
                      <Heading1 className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                      className={`rounded-md transition-colors ${editor?.isActive('heading', { level: 2 }) ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50 hover:text-accent-foreground'}`}
                    >
                      <Heading2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <EditorContent
                    editor={editor}
                    className="min-h-[200px] p-4 focus:outline-none prose dark:prose-invert max-w-none"
                    onBlur={() => {
                      if (editor) {
                        const html = editor.getHTML();
                        field.onChange(html);
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <Label className="font-medium">Categories</Label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => (
              <Button
                key={category}
                type="button"
                variant={selectedCategories.includes(category) ? 'default' : 'outline'}
                onClick={() => toggleCategory(category)}
                className={
                  selectedCategories.includes(category)
                    ? 'bg-primary text-primary-foreground shadow-sm transition-all'
                    : 'border-border hover:bg-accent hover:text-accent-foreground transition-all'
                }
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Select at least one category that best describes your project
          </p>
        </div>

        <div className="space-y-3">
          <Label className="font-medium">Project Image</Label>
          <div
            ref={dropZoneRef}
            className={`border border-dashed rounded-lg p-6 transition-all ${
              isDragging ? 'border-primary bg-primary/10' : 'border-border bg-muted/30'
            } ${imagePreviews.length > 0 ? 'pb-2' : 'flex flex-col items-center justify-center min-h-[200px]'}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              multiple
            />

            {imagePreviews.length === 0 ? (
              <>
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="mb-4 rounded-full bg-accent p-4">
                    <ImageIcon className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <p className="mb-2 text-sm font-medium text-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (Max: 20MB)</p>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-4 border-border hover:bg-accent hover:text-accent-foreground transition-all"
                    onClick={handleClickUpload}
                  >
                    Select Files
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {imagePreviews.map(image => (
                    <div key={image.id} className="relative group">
                      <div className="absolute -right-2 -top-2 z-10">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeImage(image.id)}
                          className="h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 shadow-sm transition-all"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                        <Image
                          src={image.url}
                          alt="Preview"
                          className="w-full h-auto aspect-square object-cover"
                          width={150}
                          height={150}
                        />
                      </div>
                    </div>
                  ))}
                  <div
                    className="border border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-accent/50 transition-all aspect-square"
                    onClick={handleClickUpload}
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Upload high-quality images to showcase your project
          </p>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-border mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
              setSelectedCategories([]);
              editor?.commands.clearContent();
              setImagePreviews([]);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
            disabled={isSubmitting}
            className="border-border hover:bg-accent hover:text-accent-foreground transition-all"
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all"
          >
            {isSubmitting ? 'Saving...' : projectId ? 'Update Project' : 'Create Project'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
