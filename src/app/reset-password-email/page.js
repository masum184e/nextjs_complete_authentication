import EmailForm from "@/components/resetPassword/EmailForm";
import { cookies } from "next/headers";

const page = () => {
    const cookieStore = cookies();
    const authorizationToken = cookieStore.get(process.env.COOKIE_KEY)?.value || null;

    return (
        <EmailForm authorizationToken={authorizationToken} />

    )
}

export default page