/**
 * Notification Center Component
 * Manage and view all system notifications
 */

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import NotificationService, {
  Notification,
  NotificationPriority,
  NotificationType,
} from '@/services/NotificationService';
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Shield,
  Activity,
  Settings,
  X,
} from 'lucide-react';

const priorityIcons = {
  low: <Activity className="w-4 h-4" />,
  medium: <AlertTriangle className="w-4 h-4 text-yellow-600" />,
  high: <AlertTriangle className="w-4 h-4 text-orange-600" />,
  critical: <Shield className="w-4 h-4 text-red-600" />,
};

const typeColors = {
  compliance: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  performance: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  security: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  engagement: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  system: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
};

interface NotificationItemProps {
  notification: Notification;
  onAcknowledge: (id: string) => void;
}

function NotificationItem({ notification, onAcknowledge }: NotificationItemProps) {
  return (
    <Card className={notification.acknowledged ? 'opacity-60' : ''}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="mt-1">
              {priorityIcons[notification.priority]}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">{notification.title}</h4>
                <Badge className={typeColors[notification.type]}>
                  {notification.type}
                </Badge>
                <Badge variant={
                  notification.priority === 'critical' ? 'destructive' :
                  notification.priority === 'high' ? 'default' :
                  'secondary'
                }>
                  {notification.priority}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{notification.message}</p>
              {notification.data && Object.keys(notification.data).length > 0 && (
                <div className="text-xs bg-muted p-2 rounded">
                  {Object.entries(notification.data).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-medium">{key}:</span> {String(value)}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{new Date(notification.timestamp).toLocaleString()}</span>
                {notification.acknowledged && (
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Acknowledged by {notification.acknowledgedBy}
                  </span>
                )}
              </div>
            </div>
          </div>
          {!notification.acknowledged && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAcknowledge(notification.id)}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Acknowledge
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('unread');
  const [typeFilter, setTypeFilter] = useState<NotificationType | 'all'>('all');
  const notificationService = NotificationService.getInstance();

  const loadNotifications = () => {
    const filter_options = typeFilter === 'all' ? {} : { types: [typeFilter] };
    const allNotifications = notificationService.getNotifications(filter_options);

    if (filter === 'unread') {
      setNotifications(allNotifications.filter(n => !n.acknowledged));
    } else {
      setNotifications(allNotifications);
    }
  };

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 5000);
    return () => clearInterval(interval);
  }, [filter, typeFilter]);

  const handleAcknowledge = (id: string) => {
    notificationService.acknowledge(id, 'current-user');
    loadNotifications();
  };

  const acknowledgeAll = () => {
    notifications
      .filter(n => !n.acknowledged)
      .forEach(n => notificationService.acknowledge(n.id, 'current-user'));
    loadNotifications();
  };

  const unreadCount = notificationService.getUnacknowledgedCount();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bell className="w-8 h-8" />
            Notification Center
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount}</Badge>
            )}
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage alerts and notifications
          </p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={acknowledgeAll}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Acknowledge All
          </Button>
        )}
      </div>

      <Tabs defaultValue="unread" onValueChange={(v) => setFilter(v as 'all' | 'unread')}>
        <TabsList>
          <TabsTrigger value="unread">
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <div className="flex gap-2 mt-4">
          <Button
            variant={typeFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter('all')}
          >
            All
          </Button>
          <Button
            variant={typeFilter === 'compliance' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter('compliance')}
          >
            Compliance
          </Button>
          <Button
            variant={typeFilter === 'performance' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter('performance')}
          >
            Performance
          </Button>
          <Button
            variant={typeFilter === 'security' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter('security')}
          >
            Security
          </Button>
          <Button
            variant={typeFilter === 'engagement' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter('engagement')}
          >
            Engagement
          </Button>
        </div>

        <TabsContent value="unread" className="space-y-4 mt-4">
          {notifications.length === 0 ? (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                No unread notifications. You're all caught up!
              </AlertDescription>
            </Alert>
          ) : (
            notifications.map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onAcknowledge={handleAcknowledge}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4 mt-4">
          {notifications.length === 0 ? (
            <Alert>
              <AlertDescription>
                No notifications found
              </AlertDescription>
            </Alert>
          ) : (
            notifications.map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onAcknowledge={handleAcknowledge}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
