import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MaintenanceRequest } from "@/types";
import { mockMaintenanceRequests } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MaintenanceDialog } from "@/components/maintenance/MaintenanceDialog";
import { MainLayout } from "@/components/layout/MainLayout";
import { toast } from "sonner";
import { format } from "date-fns";

export default function MaintenancePage() {
    const { t } = useLanguage();
    const [requests, setRequests] = useState<MaintenanceRequest[]>(mockMaintenanceRequests);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingRequest, setEditingRequest] = useState<MaintenanceRequest | null>(null);

    const filteredRequests = requests.filter(req =>
        req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.studioId?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreate = (data: Partial<MaintenanceRequest>) => {
        const newRequest: MaintenanceRequest = {
            id: `mr${Math.random().toString(36).substr(2, 9)}`,
            title: data.title!,
            description: data.description!,
            priority: data.priority as any,
            status: data.status as any,
            reportedBy: "Current User", // In a real app getting from auth context
            reportedAt: new Date().toISOString(),
            assignedTo: data.assignedTo,
            studioId: data.studioId
        };
        setRequests([newRequest, ...requests]);
        toast.success(t('msg.saved'));
    };

    const handleUpdate = (data: Partial<MaintenanceRequest>) => {
        if (!editingRequest) return;
        const updatedRequests = requests.map(req =>
            req.id === editingRequest.id ? { ...req, ...data } : req
        );
        setRequests(updatedRequests);
        setEditingRequest(null);
        toast.success(t('msg.saved'));
    };

    const openNewDialog = () => {
        setEditingRequest(null);
        setIsDialogOpen(true);
    };

    const openEditDialog = (req: MaintenanceRequest) => {
        setEditingRequest(req);
        setIsDialogOpen(true);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open': return 'default';
            case 'in-progress': return 'secondary';
            case 'resolved': return 'outline'; // or a green custom one
            case 'cancelled': return 'destructive';
            default: return 'default';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'low': return 'secondary';
            case 'medium': return 'default';
            case 'high': return 'destructive'; // orange-ish ideally
            case 'urgent': return 'destructive';
            default: return 'default';
        }
    };

    return (
        <MainLayout>
            <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t('maintenance.title')}</h1>
                        <p className="text-muted-foreground">
                            Manage building maintenance and repairs
                        </p>
                    </div>
                    <Button onClick={openNewDialog}>
                        <Plus className="mr-2 h-4 w-4" />
                        {t('maintenance.new')}
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder={t('common.search')}
                                    className="pl-8"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button variant="outline">
                                <Filter className="mr-2 h-4 w-4" />
                                {t('common.filter')}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('maintenance.requestTitle')}</TableHead>
                                    <TableHead>{t('maintenance.priority')}</TableHead>
                                    <TableHead>{t('maintenance.status')}</TableHead>
                                    <TableHead>{t('maintenance.reportedBy')}</TableHead>
                                    <TableHead className="text-right">{t('maintenance.reportedAt')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredRequests.map((req) => (
                                    <TableRow key={req.id} className="cursor-pointer hover:bg-muted/50" onClick={() => openEditDialog(req)}>
                                        <TableCell className="font-medium">
                                            <div>{req.title}</div>
                                            <div className="text-sm text-muted-foreground truncate max-w-[300px]">{req.description}</div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getPriorityColor(req.priority) as any}>
                                                {t(`maintenance.priority.${req.priority}`)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusColor(req.status) as any}>
                                                {t(`maintenance.status.${req.status}`)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{req.reportedBy}</TableCell>
                                        <TableCell className="text-right">
                                            {format(new Date(req.reportedAt), 'MMM d, yyyy')}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {filteredRequests.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                            {t('common.noData')}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <MaintenanceDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    onSubmit={editingRequest ? handleUpdate : handleCreate}
                    initialData={editingRequest}
                />
            </div>
        </MainLayout>
    );
}
