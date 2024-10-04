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
        });

        if (response.ok) {
            router.push('sign-in');
        } else {
            toast({
                title: "Error",
                description: "Oops! Something went wrong!",
                variant: 'destructive'
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-sm'>
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-800">Name</FormLabel>
                                    <FormControl>
                                        <Input className="border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500" placeholder='John Doe' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='username'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-800">Username</FormLabel>
                                    <FormControl>
                                        <Input className="border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500" placeholder='johndoe' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-800">Email</FormLabel>
                                    <FormControl>
                                        <Input className="border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500" placeholder='mail@example.com' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='confirmPassword'
                            render={({ field }) => (
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className='w-full mt-6 bg-indigo-600 hover:bg-indigo-700' type='submit'>
                        Sign up
                    </Button>
                </form>
                <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-gray-300 after:ml-4 after:block after:h-px after:flex-grow after:bg-gray-300'>
                    or
                </div>
                <GoogleSignInButton>Sign up with Google</GoogleSignInButton>
                <p className='text-center text-sm text-gray-600 mt-2'>
                    If you already have an account, please&nbsp;
                    <Link className='text-indigo-600 hover:underline' href='/sign-in'>
                        Sign in
                    </Link>
                </p>
            </Form>
        </div>
    );
};

export default SignUpForm;
