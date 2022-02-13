import { toast } from 'react-toastify';

const showToast = (alertType, message) => {
  toast[alertType](message)
}

export default showToast