import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../slice/feature/Auth/authApiSlice"
import type { loginType } from "../../validation/authValidation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import authValidationSchema from "../../validation/authValidation.schema";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [fn, { isLoading }] = useLoginMutation();
    const navigate = useNavigate()
    const { handleSubmit, register, formState: { errors } } = useForm<loginType>(
        {
            resolver: zodResolver(authValidationSchema.loginValidationSchema),
            defaultValues: {

            }
        }
    );
    const submit = async (data: loginType) => {
        const res = await fn(data)
        if (res?.error) {
            const errorMessage = 'data' in res.error ? (res.error.data as any)?.message : (res.error as any)?.message
            toast.error(errorMessage || 'An error occurred')
            return
        }
        const token = await res.data.data.accessToken
        localStorage.setItem("accessToken", token)
        toast.success("login success")
        navigate('/')
    }
    if (isLoading) return <div className="min-h-screen grid place-items-center text-slate-600 font-medium">Loading...</div>
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-semibold text-slate-900">Welcome back</h1>
                    <p className="mt-1 text-sm text-slate-500">Login to your account</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(submit)}>
                    <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email")}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400"
                        />
                        {errors?.email && <p className="mt-1 text-xs text-rose-600">{errors?.email?.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password")}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400"
                        />
                        {errors?.password && <p className="mt-1 text-xs text-rose-600">{errors?.password?.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="mt-2 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                        Login
                    </button>
                    <p className="text-center text-sm text-slate-500">Don't have an account? <span onClick={() => navigate('/register')} className="text-slate-900 hover:underline cursor-pointer">Register</span></p>
                </form>
            </div>
        </div>
    )
}

export default Login