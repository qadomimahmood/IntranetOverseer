import { useLanguage } from "@/contexts/LanguageContext";
import { mockRouters, mockBandwidthUsage } from "@/data/mockData";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Wifi, ArrowDown, ArrowUp, Activity, Smartphone, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function NetworkPage() {
    const { t } = useLanguage();
    const [isTesting, setIsTesting] = useState(false);
    const [progress, setProgress] = useState(0);

    const startSpeedTest = () => {
        setIsTesting(true);
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsTesting(false);
                    toast.success("Speed test completed: 950 Mbps Down / 800 Mbps Up");
                    return 100;
                }
                return prev + 5;
            });
        }, 100);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'online': return 'default'; // default in badge is usually primary color (black/dark), maybe we want green?
            case 'offline': return 'destructive';
            case 'maintenance': return 'secondary';
            default: return 'default';
        }
    };

    const getUsageColor = (status: string) => {
        switch (status) {
            case 'normal': return 'default'; // blue-ish usually
            case 'warning': return 'secondary'; // yellow-ish ideally, or gray
            case 'critical': return 'destructive'; // red
            default: return 'default';
        }
    };

    return (
        <MainLayout>
            <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t('network.title')}</h1>
                        <p className="text-muted-foreground">
                            Monitor infrastructure and connection quality
                        </p>
                    </div>
                    <Button onClick={startSpeedTest} disabled={isTesting}>
                        {isTesting ? (
                            <>
                                <Activity className="mr-2 h-4 w-4 animate-spin" />
                                Testing...
                            </>
                        ) : (
                            <>
                                <Activity className="mr-2 h-4 w-4" />
                                {t('network.startTest')}
                            </>
                        )}
                    </Button>
                </div>

                {isTesting && (
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}

                {/* Routers Status */}
                <h2 className="text-xl font-semibold mb-4">{t('network.routerStatus')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockRouters.map((router) => (
                        <Card key={router.id}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {router.location}
                                </CardTitle>
                                <Wifi className={`h-4 w-4 ${router.status === 'online' ? 'text-green-500' : 'text-red-500'}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    <Badge variant={getStatusColor(router.status) as any}>
                                        {t(`network.${router.status}`)}
                                    </Badge>
                                </div>
                                <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Smartphone className="h-3 w-3" /> {router.connectedDevices}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> {router.uptime}
                                    </div>
                                    <div>{router.ipAddress}</div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Bandwidth Usage */}
                <h2 className="text-xl font-semibold mt-8 mb-4">{t('network.bandwidthUsage')}</h2>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('common.studio')}</TableHead>
                                    <TableHead>{t('studios.subscriber')}</TableHead>
                                    <TableHead>{t('network.download')}</TableHead>
                                    <TableHead>{t('network.upload')}</TableHead>
                                    <TableHead>{t('network.totalUsage')}</TableHead>
                                    <TableHead>{t('common.status')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockBandwidthUsage.map((usage) => (
                                    <TableRow key={usage.id}>
                                        <TableCell className="font-medium">{usage.studioNumber}</TableCell>
                                        <TableCell>{usage.subscriberName}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1 text-green-600">
                                                <ArrowDown className="h-3 w-3" /> {usage.downloadGB} GB
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1 text-blue-600">
                                                <ArrowUp className="h-3 w-3" /> {usage.uploadGB} GB
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="text-sm">
                                                    {usage.totalGB} / {usage.limitGB} GB
                                                </div>
                                                <Progress value={(usage.totalGB / usage.limitGB) * 100} className="h-2" />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getUsageColor(usage.status) as any}>
                                                {usage.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
