import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
    const token = useSelector((state) => state.auth.token);
    let userId = '';
    let username = '';
    let email = '';

    if (token) {
        try {
            const decoded = jwtDecode(token);
            console.log('Decoded token:', decoded);

            const { username: decodedUsername, email: decodedEmail } = decoded;

            if (decodedUsername) {
                username = decodedUsername;
                userId = decodedUsername;
            }

            email = decodedEmail || ''; // Gán email nếu có
        } catch (error) {
            console.error("Token không hợp lệ hoặc không thể giải mã:", error);
        }
    } else {
        console.log("Token không tồn tại trong Redux store");
    }

    return { userId, username, email };
};

export default useAuth;
