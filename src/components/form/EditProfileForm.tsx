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
import { useToast } from "@/hooks/use-toast";
import { useSession, getSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import {Label} from "@/components/ui/label";

// Define the validation schema
const FormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
});

const EditProfileForm = () => {
    const router = useRouter();
    const { data: session, status, update } = useSession();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            email: '',
        },
    });

    useEffect(() => {
        if (session?.user) {
            form.reset({
                name: session.user.name || '',
                email: session.user.email || '',
            });
        }
    }, [session, form]);

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        setIsSubmitting(true);
        const response = await fetch(`/api/user/${session?.user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: values.email,
                name: values.name,
            }),
        });

        if (response.ok) {
            toast({
                title: "Success",
                description: "Profile updated successfully!",
                variant: 'success',
            });

            const newSession = await getSession();
            console.log("Updated session:", newSession);
            update();
        } else {
            const errorResponse = await response.json();
            toast({
                title: "Error",
                description: errorResponse.message || "Failed to update profile.",
                variant: 'destructive',
            });
        }
        setIsSubmitting(false);
    };

    // Show loading skeleton while the session is loading
    if (status === "loading") {
        return (
            <div>
                <div className='space-y-4'>
                    <div>
                        <Label className="text-gray-800">
                            <div className="h-4 rounded-md w-1/4">Name</div>
                        </Label>
                        <div className="h-10 bg-gray-200 rounded-md"></div>
                    </div>
                    <div>
                        <Label className="text-gray-800">
                            <div className="h-4 rounded-md w-1/4">Email</div>
                        </Label>
                        <div className="h-10 bg-gray-200 rounded-md"></div>
                    </div>
                </div>
                <Button
                    className={`w-full mt-6 bg-indigo-600 hover:bg-indigo-700 ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
                    type='submit'
                    disabled
                >
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none"></circle>
                                <path fill="white" d="M4 12a8 8 0 0116 0"></path>
                        </svg>
                        Loading...
                    </span>
                </Button>
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                <div className='space-y-4'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-gray-800">Name</FormLabel>
                                <FormControl>
                                    <Input
                                        className="border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 dark:bg-primary dark:text-accent"
                                        placeholder='Enter your name'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
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
                                    <Input
                                        type='email'
                                        className="border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 dark:bg-primary dark:text-accent"
                                        placeholder='mail@example.com'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    className={`w-full mt-6 bg-indigo-600 hover:bg-indigo-700 ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
                    type='submit'
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none"></circle>
                                <path fill="white" d="M4 12a8 8 0 0116 0"></path>
                            </svg>
                            Saving...
                        </span>
                    ) : (
                        'Save Changes'
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default EditProfileForm;
