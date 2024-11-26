'use client';

import SignIn from "@/app/sign-in/page";
import { verifyUser } from "@/lib/user";
import { useParams } from "next/navigation";
import { useEffect, useCallback } from "react";
import { toast } from "react-toastify";

export default function VerifyPage() {
    const params = useParams<{ token: string }>();

    const onVerify = useCallback(async () => {
        try {
            const { result, ok } = await verifyUser(params.token);
            if (!ok) throw result.msg;
            toast.success(result.msg);
        } catch (err: any) {
            toast.error(err.message ?? err);
        }
    }, [params.token]);

    useEffect(() => {
        if (params.token) {
            onVerify();
        }
    }, [params.token, onVerify]);

    return (
        <div>
            <SignIn />
        </div>
    );
}
