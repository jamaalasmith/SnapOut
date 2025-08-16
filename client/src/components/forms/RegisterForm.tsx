import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants';

const { Title, Text } = Typography;

const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
    .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .regex(/(?=.*\d)/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const { register: registerUser, isLoading } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    const { confirmPassword, ...registerData } = data;
    registerUser(registerData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <Title level={2}>Create Account</Title>
          <Text type="secondary">Join our community today</Text>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                {...register('firstName')}
                size="large"
                placeholder="First Name"
                prefix={<UserOutlined />}
                status={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && (
                <Text type="danger" className="text-sm">
                  {errors.firstName.message}
                </Text>
              )}
            </div>

            <div>
              <Input
                {...register('lastName')}
                size="large"
                placeholder="Last Name"
                prefix={<UserOutlined />}
                status={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && (
                <Text type="danger" className="text-sm">
                  {errors.lastName.message}
                </Text>
              )}
            </div>
          </div>

          <div>
            <Input
              {...register('email')}
              size="large"
              placeholder="Email"
              prefix={<MailOutlined />}
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

          <div>
            <Input.Password
              {...register('confirmPassword')}
              size="large"
              placeholder="Confirm Password"
              prefix={<LockOutlined />}
              status={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && (
              <Text type="danger" className="text-sm">
                {errors.confirmPassword.message}
              </Text>
            )}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={isLoading}
            className="w-full"
          >
            Create Account
          </Button>
        </form>

        <div className="text-center mt-6">
          <Text type="secondary">
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className="text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};