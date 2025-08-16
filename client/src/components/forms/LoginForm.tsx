import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, Input, Button, Checkbox, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants';

const { Title, Text } = Typography;

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { login, isLoading } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <Title level={2}>Welcome Back</Title>
          <Text type="secondary">Sign in to your account</Text>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              {...register('email')}
              size="large"
              placeholder="Email"
              prefix={<UserOutlined />}
              status={errors.email ? 'error' : ''}
            />
            {errors.email && (
              <Text type="danger" className="text-sm">
                {errors.email.message}
              </Text>
            )}
          </div>

          <div>
            <Input.Password
              {...register('password')}
              size="large"
              placeholder="Password"
              prefix={<LockOutlined />}
              status={errors.password ? 'error' : ''}
            />
            {errors.password && (
              <Text type="danger" className="text-sm">
                {errors.password.message}
              </Text>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Checkbox {...register('rememberMe')}>
              Remember me
            </Checkbox>
            <Link to="#" className="text-blue-600 hover:text-blue-500">
              Forgot password?
            </Link>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={isLoading}
            className="w-full"
          >
            Sign In
          </Button>
        </form>

        <div className="text-center mt-6">
          <Text type="secondary">
            Don't have an account?{' '}
            <Link to={ROUTES.REGISTER} className="text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};