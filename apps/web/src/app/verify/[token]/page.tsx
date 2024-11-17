'use client'

import SignIn from "@/app/sign-in/page";
import { verifyUser } from "@/lib/user";
import { useParams } from "next/navigation"
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function VerifyPage() {
    const params = useParams<{ token: string }>()
    const onVerify = async () => {
        try {
            const { result, ok } = await verifyUser(params.token)
            if (!ok) throw result.msg
            toast.success(result.msg)
        } catch (err: any) {
            toast.error(err.message ?? err)
        }
    }

    // Suppress the missing dependency warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (params.token) {
            onVerify();
        }
    }, [params.token]);
    
    return (
        <div>
            <SignIn></SignIn>
        </div>
    )
}
