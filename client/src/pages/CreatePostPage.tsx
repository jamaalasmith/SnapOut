import { useNavigate } from 'react-router-dom';
import { PostForm } from '../components/forms/PostForm';
import { ROUTES } from '../constants';

export const CreatePostPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate(ROUTES.HOME);
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="max-w-2xl mx-auto">
      <PostForm 
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};