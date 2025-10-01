import { CreatePaymentDocument } from "@pages/account-transactions/create-payment-document";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/account-transactions/create-payment-document/",
)({
  component: CreatePaymentDocument,
});
