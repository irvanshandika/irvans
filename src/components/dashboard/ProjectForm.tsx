/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import toast from 'react-hot-toast';
import { Upload, X } from 'lucide-react';

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
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialData?.categories || []);
  const [codeValue, setCodeValue] = useState(initialData?.code || '');
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      categories: initialData?.categories || [],
      code: initialData?.code || '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (20MB limit)
    if (file.size > 20 * 1024 * 1024) {
      toast.error('Image size exceeds 20MB limit');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
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
      data.code = codeValue;
      
      // Handle image upload
      let imageUrl = initialData?.imageUrl || null;
      
      // If we have a new image file to upload
      if (imagePreview && fileInputRef.current?.files?.length && 
          (!initialData?.imageUrl || imagePreview !== initialData.imageUrl)) {
        
        const toastId = toast.loading('Uploading image to Cloudinary...');
        
        const formData = new FormData();
        formData.append('file', fileInputRef.current.files[0]);
        
        try {
          const uploadResponse = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          
          if (!uploadResponse.ok) {
            const errorData = await uploadResponse.json();
            throw new Error(errorData.error || 'Failed to upload image');
          }
          
          const uploadResult = await uploadResponse.json();
          imageUrl = uploadResult.fileUrl;
          toast.success('Image uploaded successfully', { id: toastId });
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
        code: codeValue,
        imageUrl,
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
        throw new Error(errorData.error || (projectId ? 'Failed to update project' : 'Failed to create project'));
      }
      
      toast.success(projectId ? 'Project updated successfully' : 'Project created successfully', { id: toastId });
      
      // Reset form if creating new project
      if (!projectId) {
        form.reset();
        setSelectedCategories([]);
        setCodeValue('');
        setImagePreview(null);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter project title" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter project description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <Label>Categories</Label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                type="button"
                variant={selectedCategories.includes(category) ? "default" : "outline"}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Code Editor</Label>
          <AceEditor
            mode="javascript"
            theme="monokai"
            onChange={setCodeValue}
            value={codeValue}
            name="code-editor"
            editorProps={{ $blockScrolling: true }}
            width="100%"
            height="200px"
          />
        </div>

        <div className="space-y-2">
          <Label>Project Image</Label>
          <div className="flex items-center gap-4">
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <Button type="button" variant="destructive" size="icon" onClick={removeImage}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          {imagePreview && (
            <div className="mt-2">
              <img src={imagePreview} alt="Preview" className="max-w-[200px] rounded-lg" />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
              setSelectedCategories([]);
              setCodeValue('');
              setImagePreview(null);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : projectId ? 'Update Project' : 'Create Project'}
          </Button>
        </div>
      </form>
    </Form>
  );
}