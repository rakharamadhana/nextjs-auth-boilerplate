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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                <div className='space-y-4'>
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
                </div>
                <Button className='w-full mt-6 bg-indigo-600 hover:bg-indigo-700' type='submit'>
                    Sign in
                </Button>
            </form>
            <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-gray-300 after:ml-4 after:block after:h-px after:flex-grow after:bg-gray-300'>
                or
            </div>
            <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
            <p className='text-center text-sm text-gray-600 mt-2'>
                If you don&apos;t have an account, please&nbsp;
                <Link className='text-indigo-600 hover:underline' href='/sign-up'>
                    Sign up
                </Link>
            </p>
        </Form>
    );
};

export default SignInForm;
