import { Card, Avatar, Button, Typography, Space, Image, Tag } from 'antd';
import { HeartOutlined, HeartFilled, MessageOutlined, MoreOutlined } from '@ant-design/icons';
import { formatDistanceToNow } from 'date-fns';
import { Post } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { useLikePost, useUnlikePost } from '../../hooks/usePosts';

const { Text, Paragraph } = Typography;
const { Meta } = Card;

interface PostCardProps {
  post: Post;
  onEdit?: (post: Post) => void;
  onDelete?: (postId: number) => void;
}

export const PostCard = ({ post, onEdit, onDelete }: PostCardProps) => {
  const { user } = useAuth();
  const likeMutation = useLikePost();
  const unlikeMutation = useUnlikePost();

  const isOwner = user?.id === post.user.id;
  const isLiked = false; // TODO: Implement liked state based on user's likes

  const handleLike = () => {
    if (isLiked) {
      unlikeMutation.mutate(post.id);
    } else {
      likeMutation.mutate(post.id);
    }
  };

  const actions = [
    <Button
      type="text"
      icon={isLiked ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
      onClick={handleLike}
      loading={likeMutation.isPending || unlikeMutation.isPending}
    >
      {post.likesCount}
    </Button>,
    <Button
      type="text"
      icon={<MessageOutlined />}
    >
      {post.commentsCount}
    </Button>,
  ];

  if (isOwner) {
    actions.push(
      <Button
        type="text"
        icon={<MoreOutlined />}
        onClick={() => onEdit?.(post)}
      />
    );
  }

  return (
    <Card
      className="mb-4"
      actions={actions}
    >
      <Meta
        avatar={
          <Avatar 
            src={post.user.avatarUrl} 
            size="large"
          >
            {!post.user.avatarUrl && (
              post.user.firstName?.charAt(0) || '' + post.user.lastName?.charAt(0) || ''
            )}
          </Avatar>
        }
        title={
          <div className="flex items-center justify-between">
            <div>
              <Text strong>{post.user.fullName}</Text>
              <br />
              <Text type="secondary" className="text-sm">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </Text>
            </div>
          </div>
        }
        description={
          <div className="mt-4">
            <Typography.Title level={5} className="mb-2">
              {post.title}
            </Typography.Title>
            <Paragraph className="mb-3">
              {post.content}
            </Paragraph>
            
            {post.imageUrl && (
              <Image
                src={post.imageUrl}
                alt={post.title}
                className="rounded-lg mb-3"
                style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
              />
            )}
            
            {post.tags.length > 0 && (
              <Space wrap>
                {post.tags.map((tag, index) => (
                  <Tag key={index} color="blue">
                    {tag}
                  </Tag>
                ))}
              </Space>
            )}
          </div>
        }
      />
    </Card>
  );
};