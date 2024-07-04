import { PayPalButton } from "~/app/_components/PayPalButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export default function BookingPaymentPage() {
  return (
    <section className="col-span-12 grid place-content-center min-h-[calc(100vh_-_70px)]">
      <Card>
        <CardHeader>
            <CardTitle className="text-general font-gelasio">Order payment</CardTitle>
            <CardDescription className="font-jost">Secure your payment quickly and easily by clicking the PayPal button below.</CardDescription>
        </CardHeader>
        <CardContent>
          <PayPalButton />
        </CardContent>
      </Card>
    </section>
  );
}
