import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function WidgetCard({ icon: Icon, title, action, children }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        </div>
        {action}
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  );
}