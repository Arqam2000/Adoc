import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className="bg-blue-500 p-1 rounded text-white text-base mb-2 cursor-pointer px-2">
      <ArrowBackIcon />
      Back
    </button>
  )
}

export default BackButton
