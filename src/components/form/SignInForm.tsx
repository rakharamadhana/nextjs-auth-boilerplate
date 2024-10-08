'use client';

import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import GoogleSignInButton from '../GoogleSignInButton';
import {signIn, useSession} from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";


const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must have more than 8 characters'),
});

const SignInForm = () => {
    const router = useRouter();
    const { toast } = useToast()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const signInData = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false
        });

        if (signInData?.error) {
            // Display the error message returned from the authorize function
            toast({
                title: "Error",
                description: signInData.error, // Use the error message provided by your custom logic
                variant: 'destructive',
            });
        } else {
            toast({
                title: "Success",
                description: "Login success!",
                variant: 'success',
            });

            router.refresh();
            router.push('/admin');
        }
    };

    return (
        <div className="mx-auto md:w-[25rem] max-w-md space-y-6 p-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
                <p className="text-gray-600">Enter your details to sign in</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-gray-800">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border border-gray-300 dark:bg-zinc-50 dark:focus:ring-indigo-300 dark:focus:ring-offset-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                                            placeholder='mail@example.com' {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-gray-800">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            className="border border-gray-300 dark:bg-zinc-50 dark:focus:ring-indigo-300 dark:focus:ring-offset-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                                            placeholder='Enter your password'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className='w-full mt-6 bg-indigo-600 hover:bg-indigo-700 dark:focus:ring-indigo-300 dark:focus:ring-offset-indigo-300' type='submit'>
                        Sign in
                    </Button>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-300"/>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="px-2 bg-slate-200 text-gray-500">Or continue with</span>
                    </div>
                </div>
                <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
                <p className="text-center text-sm text-gray-600">
                    Don&apos;t have an account?{' '}
                    <Link className="font-medium text-indigo-600 hover:underline" href="/sign-up">
                        Sign up
                    </Link>
                </p>
            </Form>
        </div>
    );
};

export default SignInForm;
