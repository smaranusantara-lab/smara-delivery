import { Button } from "@/components/ui/button";
import { Input, Textarea, Select } from "@/components/ui/input";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { PageContainer } from "@/components/layout";
import { DELIVERY_STATUSES } from "@/types";
import { APP_CONFIG } from "@/lib/config";

const swatches = [
  { label: "neutral-0", className: "bg-neutral-0 border border-neutral-200" },
  { label: "neutral-50", className: "bg-neutral-50 border border-neutral-200" },
  { label: "neutral-100", className: "bg-neutral-100" },
  { label: "neutral-300", className: "bg-neutral-300" },
  { label: "neutral-500", className: "bg-neutral-500" },
  { label: "neutral-700", className: "bg-neutral-700" },
  { label: "neutral-900", className: "bg-neutral-900" },
  { label: "primary-100", className: "bg-primary-100" },
  { label: "primary-500", className: "bg-primary-500" },
  { label: "primary-600", className: "bg-primary-600" },
  { label: "success-500", className: "bg-success-500" },
  { label: "warning-500", className: "bg-warning-500" },
  { label: "danger-500", className: "bg-danger-500" },
];

export default function Home() {
  return (
    <PageContainer maxWidth="lg">
      <header className="mb-10">
        <p className="text-sm font-medium text-primary-600">
          Milestone 0 &amp; 1 — Foundation
        </p>
        <h1 className="mt-1 text-2xl">{APP_CONFIG.name}</h1>
        <p className="mt-1 text-neutral-500">
          Project foundation is set up. This page is a style guide for
          reviewing design tokens and base components — not a product
          screen. Feature pages (Auth, Dashboard, Delivery, Driver) are
          built in later milestones.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Colors</CardTitle>
          </CardHeader>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {swatches.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1.5">
                <div className={`h-12 w-12 rounded-md ${s.className}`} />
                <span className="text-xs text-neutral-500">{s.label}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status colors</CardTitle>
          </CardHeader>
          <div className="flex flex-wrap gap-2">
            {DELIVERY_STATUSES.map((status) => (
              <StatusBadge key={status} status={status} />
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
          </CardHeader>
          <div className="space-y-2">
            <p className="text-2xl">Text 2xl — dashboard headline</p>
            <p className="text-xl">Text xl — page title</p>
            <p className="text-lg">Text lg — section header</p>
            <p className="text-base">Text base — body text</p>
            <p className="text-sm text-neutral-500">Text sm — secondary text</p>
            <p className="text-xs text-neutral-500">Text xs — meta / timestamps</p>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
          </CardHeader>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button isLoading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Form fields</CardTitle>
          </CardHeader>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input label="Customer name" placeholder="e.g. Budi Santoso" />
            <Input label="With error" placeholder="Required field" error="This field is required" />
            <Select
              label="Assign driver"
              placeholder="Select a driver"
              options={[
                { label: "Ahmad", value: "ahmad" },
                { label: "Siti", value: "siti" },
              ]}
            />
            <Textarea
              className="md:col-span-3"
              label="Notes"
              placeholder="Delivery notes..."
            />
          </div>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <div className="flex flex-wrap gap-2">
            <Badge tone="neutral">Neutral</Badge>
            <Badge tone="primary">Primary</Badge>
            <Badge tone="success">Success</Badge>
            <Badge tone="warning">Warning</Badge>
            <Badge tone="danger">Danger</Badge>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
