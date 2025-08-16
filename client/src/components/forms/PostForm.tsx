import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button, Card, Typography, Switch, Space, Upload, message } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import { useCreatePost, useUpdatePost } from '../../hooks/usePosts';
import { Post } from '../../types';
import { useState } from 'react';

const { TextArea } = Input;
const { Title } = Typography;

const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(500, 'Title must be less than 500 characters'),
  content: z.string().min(1, 'Content is required'),
  imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  isPublished: z.boolean(),
  tagIds: z.array(z.number()),
});

type PostFormData = z.infer<typeof postSchema>;

interface PostFormProps {
  post?: Post;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const PostForm = ({ post, onSuccess, onCancel }: PostFormProps) => {
  const createMutation = useCreatePost();
  const updateMutation = useUpdatePost();
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || '');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      imageUrl: post?.imageUrl || '',
      isPublished: post?.isPublished ?? true,
      tagIds: [], // TODO: Implement tag selection
    },
  });

  const isPublished = watch('isPublished');
  const isLoading = createMutation.isPending || updateMutation.isPending;

  const onSubmit = async (data: PostFormData) => {
    try {
      if (post) {
        await updateMutation.mutateAsync({ id: post.id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      onSuccess?.();
    } catch (error) {
      // Error handling is done in the hooks
    }
  };

  const handleImageUpload = (file: File) => {
    // TODO: Implement actual image upload to your storage service
    // For now, we'll just use a placeholder
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImageUrl(result);
      setValue('imageUrl', result);
    };
    reader.readAsDataURL(file);
    return false; // Prevent default upload behavior
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <Title level={3}>{post ? 'Edit Post' : 'Create New Post'}</Title>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            {...register('title')}
            size="large"
            placeholder="Post title"
            status={errors.title ? 'error' : ''}
          />
          {errors.title && (
            <Typography.Text type="danger" className="text-sm">
              {errors.title.message}
            </Typography.Text>
          )}
        </div>

        <div>
          <TextArea
            {...register('content')}
            rows={6}
            placeholder="What's on your mind?"
            status={errors.content ? 'error' : ''}
          />
          {errors.content && (
            <Typography.Text type="danger" className="text-sm">
              {errors.content.message}
            </Typography.Text>
          )}
        </div>

        <div>
          <Upload
            listType="picture-card"
            beforeUpload={handleImageUpload}
            showUploadList={false}
            accept="image/*"
          >
            {imageUrl ? (
              <img src={imageUrl} alt="Post" style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
            ) : (
              <div>
                <PictureOutlined />
                <div>Add Image</div>
              </div>
            )}
          </Upload>
          {imageUrl && (
            <Button 
              type="link" 
              size="small" 
              onClick={() => {
                setImageUrl('');
                setValue('imageUrl', '');
              }}
            >
              Remove Image
            </Button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Space>
            <Typography.Text>Publish immediately:</Typography.Text>
            <Switch
              checked={isPublished}
              onChange={(checked) => setValue('isPublished', checked)}
            />
          </Space>
        </div>

        <div className="flex justify-end space-x-2">
          {onCancel && (
            <Button onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
          )}
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            {post ? 'Update Post' : 'Create Post'}
          </Button>
        </div>
      </form>
    </Card>
  );
};