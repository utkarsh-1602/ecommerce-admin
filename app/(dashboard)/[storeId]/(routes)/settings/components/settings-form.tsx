"use client"

import { Store } from "@prisma/client"
import { useForm } from "react-hook-form"
import { Trash } from "lucide-react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"

import Heading from '@/components/ui/heading'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface SettingFormProps {
    initialData: Store // we are passing the Store as initialData
}

// we will use zod TypeScript-first schema validation
const formSchema = z.object({
    name: z.string().min(1)
})

type SettingFormValues = z.infer<typeof formSchema>

const SettingsForm: React.FC<SettingFormProps> = ({
    initialData
}) => {


    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const form = useForm<SettingFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })


    const onSubmit = async (data: SettingFormValues) => {
        console.log(data)
    }

    return (

        // encapsulating in a fragment
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="Settings"
                    description="Manage store preferences"
                />
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setOpen(true)}
                    disabled={loading}
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Store name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Save changes
                    </Button>
                </form>
            </Form>
        </>
    )

}

export default SettingsForm