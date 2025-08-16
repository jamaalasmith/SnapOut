import { Button, Tooltip, Dropdown } from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  CameraOutlined, 
  FileImageOutlined,
  VideoCameraOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

export const QuickActions = () => {
  const navigate = useNavigate();

  const createMenuItems = [
    {
      key: 'text-post',
      icon: <EditOutlined />,
      label: 'Text Post',
      onClick: () => navigate(ROUTES.CREATE_POST),
    },
    {
      key: 'photo-post',
      icon: <CameraOutlined />,
      label: 'Photo Post',
      onClick: () => navigate(`${ROUTES.CREATE_POST}?type=photo`),
    },
    {
      key: 'video-post',
      icon: <VideoCameraOutlined />,
      label: 'Video Post',
      onClick: () => navigate(`${ROUTES.CREATE_POST}?type=video`),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'album',
      icon: <FileImageOutlined />,
      label: 'Photo Album',
      onClick: () => navigate(`${ROUTES.CREATE_POST}?type=album`),
    },
  ];

  return (
    <div className="flex items-center space-x-2">
      {/* Primary Create Button */}
      <Tooltip title="Create new post">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          className="rounded-full shadow-lg hover:shadow-xl transition-all"
          onClick={() => navigate(ROUTES.CREATE_POST)}
        >
          <span className="hidden sm:inline ml-1">Create</span>
        </Button>
      </Tooltip>

      {/* Dropdown for more options */}
      <Dropdown
        menu={{ items: createMenuItems }}
        trigger={['click']}
        placement="bottomRight"
      >
        <Tooltip title="More creation options">
          <Button
            icon={<PlusOutlined className="rotate-45" />}
            size="large"
            className="rounded-full border-dashed"
          />
        </Tooltip>
      </Dropdown>
    </div>
  );
};