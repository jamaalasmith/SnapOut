import { useState } from 'react';
import { Input, AutoComplete, Avatar, Typography } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useSearchUsers } from '../../hooks/useUsers';
import { User } from '../../types';

const { Text } = Typography;

interface SearchOption {
  value: string;
  label: JSX.Element;
  user: User;
}

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [options, setOptions] = useState<SearchOption[]>([]);
  
  const { data: users, isLoading } = useSearchUsers(searchValue);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    
    if (users) {
      const searchOptions: SearchOption[] = users.map(user => ({
        value: user.id,
        user,
        label: (
          <div className="flex items-center space-x-3 py-2">
            <Avatar 
              size="small" 
              src={user.avatarUrl}
              icon={<UserOutlined />}
            >
              {!user.avatarUrl && (
                (user.firstName?.charAt(0) || '') + (user.lastName?.charAt(0) || '')
              )}
            </Avatar>
            <div>
              <Text strong>{user.fullName}</Text>
              <br />
              <Text type="secondary" className="text-xs">
                @{user.email?.split('@')[0]}
              </Text>
            </div>
          </div>
        )
      }));
      setOptions(searchOptions);
    }
  };

  const handleSelect = (value: string) => {
    const selectedUser = options.find(option => option.value === value)?.user;
    if (selectedUser) {
      // Navigate to user profile
      window.location.href = `/profile/${selectedUser.id}`;
    }
    setSearchValue('');
    setOptions([]);
  };

  return (
    <AutoComplete
      className="w-full max-w-md"
      options={options}
      onSearch={handleSearch}
      onSelect={handleSelect}
      value={searchValue}
      notFoundContent={isLoading ? 'Searching...' : 'No users found'}
    >
      <Input
        size="large"
        placeholder="Search users..."
        prefix={<SearchOutlined />}
        className="rounded-full"
      />
    </AutoComplete>
  );
};