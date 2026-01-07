import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { MaintenanceRequest, MaintenancePriority, MaintenanceStatus } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
    title: z.string().min(2, "Title is required"),
    description: z.string().min(5, "Description is required"),
    priority: z.enum(["low", "medium", "high", "urgent"]),
    status: z.enum(["open", "in-progress", "resolved", "cancelled"]),
    studioId: z.string().optional(),
    assignedTo: z.string().optional(),
});

interface MaintenanceDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: Partial<MaintenanceRequest>) => void;
    initialData?: MaintenanceRequest | null;
}

export function MaintenanceDialog({ open, onOpenChange, onSubmit, initialData }: MaintenanceDialogProps) {
    const { t } = useLanguage();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            priority: "medium",
            status: "open",
            studioId: "",
            assignedTo: "",
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                title: initialData.title,
                description: initialData.description,
                priority: initialData.priority,
                status: initialData.status,
                studioId: initialData.studioId || "",
                assignedTo: initialData.assignedTo || "",
            });
        } else {
            form.reset({
                title: "",
                description: "",
                priority: "medium",
                status: "open",
                studioId: "",
                assignedTo: "",
            });
        }
    }, [initialData, form, open]);

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        onSubmit(values);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? t('maintenance.edit') : t('maintenance.new')}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('maintenance.requestTitle')}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t('maintenance.requestTitle')} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('maintenance.description')}</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder={t('maintenance.description')} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="priority"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('maintenance.priority')}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t('maintenance.priority')} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="low">{t('maintenance.priority.low')}</SelectItem>
                                                <SelectItem value="medium">{t('maintenance.priority.medium')}</SelectItem>
                                                <SelectItem value="high">{t('maintenance.priority.high')}</SelectItem>
                                                <SelectItem value="urgent">{t('maintenance.priority.urgent')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('maintenance.status')}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t('maintenance.status')} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="open">{t('maintenance.status.open')}</SelectItem>
                                                <SelectItem value="in-progress">{t('maintenance.status.in-progress')}</SelectItem>
                                                <SelectItem value="resolved">{t('maintenance.status.resolved')}</SelectItem>
                                                <SelectItem value="cancelled">{t('maintenance.status.cancelled')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="assignedTo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('maintenance.assignedTo')}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t('maintenance.assignedTo')} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">{t('common.save')}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
