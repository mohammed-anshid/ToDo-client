import { userApi } from "../../utils/api";

export const Athentication = async () => {
    try {
        const { data } = await userApi.post('/auth');
        return data;
    } catch (error) {
        return error
    }
}