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
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const FormSchema = z
    .object({
        username: z.string().min(1, 'Username is required').max(100),
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must have more than 8 characters'),
        confirmPassword: z.string().min(1, 'Password confirmation is required'),
        name: z.string().min(1, 'Name is required').max(100),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    });

const SignUpForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            name: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: values.username,
                    email: values.email,
                    password: values.password,
                    name: values.name,
                })
            })

            if (response.ok) {
                router.push('sign-in')
                toast({
                    title: "Success",
                    description: "Your account has been created. Please sign in.",
                })
            } else {
                throw new Error('Failed to create account')
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Oops! Something went wrong!",
                variant: 'destructive'
            })
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="mx-auto md:w-[25rem] max-w-md space-y-6 p-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold text-gray-900">Create an account</h1>
                <p className="text-gray-600">Enter your details to sign up</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-sm'>
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-gray-800">Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                                            placeholder='John Doe' {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='username'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-gray-800">Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                                            placeholder='johndoe' {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='email'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-gray-800">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500"
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
                                            className="border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                                            placeholder='Enter your password'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='confirmPassword'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-gray-800">Re-enter Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                                            placeholder='Re-enter your password'
                                            type='password'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        className='w-full mt-6 bg-indigo-600 hover:bg-indigo-700'
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4"
                                            fill="none"></circle>
                                    <path fill="white" d="M4 12a8 8 0 0116 0"></path>
                                </svg>
                                Signing up...
                            </>
                        ) : (
                            'Sign up'
                        )}
                    </Button>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-300"/>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="px-2 text-gray-500">Or</span>
                    </div>
                </div>
                <GoogleSignInButton>Sign up with Google</GoogleSignInButton>
                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link className="font-medium text-indigo-600 hover:underline" href="/sign-in">
                        Sign in
                    </Link>
                </p>
            </Form>
        </div>
    );
};

export default SignUpForm;
