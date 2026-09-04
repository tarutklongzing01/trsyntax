import type { Metadata } from 'next';
import { AuthForm } from '@/components/auth-form';
export const metadata:Metadata={title:'สมัครสมาชิก'};
export default function Register(){return <main className="auth-page"><AuthForm mode="register"/></main>}
