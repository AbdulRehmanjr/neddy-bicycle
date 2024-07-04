import { PayPalButton } from "~/app/_components/PayPalButton";
import { Card, CardContent, CardDescription, CardHeader } from "~/components/ui/card";

export default function BookingPaymentPage() {
  return (
    <section className="col-span-12 grid place-content-center min-h-[calc(100vh_-_70px)]">
       <h1 className={`text-center text-3xl md:text-5xl font-ibm text-yellow mb-6 md:mb-16`}>
        Book now
      </h1>
      <Card>
        <CardHeader>
            <CardDescription className="font-libre">Secure your payment quickly and easily by clicking the PayPal button below.</CardDescription>
        </CardHeader>
        <CardContent>
          <PayPalButton />
        </CardContent>
      </Card>
    </section>
  );
}
