import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
import { deletePayloadProductVariantsWorkflow } from "../workflows/payload-product/delete-payload-product-variants"

export default async function productVariantDeletedHandler({
  event: { data },
  container,
}: SubscriberArgs<{
  id: string
}>) {
  await deletePayloadProductVariantsWorkflow(container)
    .run({
      input: {
        variant_ids: [data.id],
      }
    })
}

export const config: SubscriberConfig = {
  event: "product-variant.deleted",
}
