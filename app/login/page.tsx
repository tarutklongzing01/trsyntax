import type { Metadata } from 'next';
import { AuthForm } from '@/components/auth-form';
export const metadata:Metadata={title:'เข้าสู่ระบบ'};
export default function Login(){return <main className="auth-page"><AuthForm mode="login"/></main>}
