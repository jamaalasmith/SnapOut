import { useState } from 'react';
import { Tabs, Card, Typography, Input, Space, Tag } from 'antd';
import { SearchOutlined, FireOutlined, UserOutlined, TagOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const trendingTags = [
  { name: 'Technology', count: 1250, color: 'blue' },
  { name: 'Travel', count: 890, color: 'green' },
  { name: 'Food', count: 765, color: 'orange' },
  { name: 'Photography', count: 654, color: 'purple' },
  { name: 'Fitness', count: 543, color: 'red' },
];

export const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState('trending');

  const tabItems = [
    {
      key: 'trending',
      label: (
        <span>
          <FireOutlined />
          Trending
        </span>
      ),
      children: (
        <div className="space-y-6">
          <Card title="Trending Topics">
            <div className="space-y-3">
              {trendingTags.map((tag, index) => (
                <div key={tag.name} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-500 font-mono text-sm">#{index + 1}</span>
                    <Tag color={tag.color}>{tag.name}</Tag>
                  </div>
                  <Text type="secondary">{tag.count} posts</Text>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ),
    },
    {
      key: 'people',
      label: (
        <span>
          <UserOutlined />
          People
        </span>
      ),
      children: (
        <div className="space-y-6">
          <Card title="Suggested Users">
            <Text type="secondary">Find new people to follow based on your interests</Text>
          </Card>
        </div>
      ),
    },
    {
      key: 'tags',
      label: (
        <span>
          <TagOutlined />
          Tags
        </span>
      ),
      children: (
        <div className="space-y-6">
          <Card title="Popular Tags">
            <Text type="secondary">Discover content by browsing popular tags</Text>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Title level={2}>Explore SnapOut</Title>
        <Text type="secondary" className="text-lg">
          Discover trending content, new people, and interesting topics
        </Text>
      </div>

      <Card>
        <Space.Compact size="large" className="w-full">
          <Input
            placeholder="Search posts, people, or topics..."
            prefix={<SearchOutlined />}
            size="large"
            className="rounded-l-lg"
          />
        </Space.Compact>
      </Card>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        size="large"
      />
    </div>
  );
};