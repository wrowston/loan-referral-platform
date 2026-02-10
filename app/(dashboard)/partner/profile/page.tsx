import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function PartnerProfilePage() {
  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label>Company</Label>
            <Input placeholder="Acme Realty" />
          </div>
          <div className="grid gap-2">
            <Label>Phone</Label>
            <Input placeholder="(555) 555-5555" />
          </div>
          <Button type="button">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  );
}
