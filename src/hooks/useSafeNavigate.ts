import { useNavigate, useLocation } from "react-router-dom";

const useSafeNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (to: string, options?: { replace?: boolean }) => {
    if (location.pathname !== to) {
      navigate(to, options);
    }
  };
};

export default useSafeNavigate;
