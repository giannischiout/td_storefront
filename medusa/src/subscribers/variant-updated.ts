import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
import { updatePayloadProductVariantsWorkflow } from "../workflows/payload-product/update-payload-product-variants"

export default async function productVariantUpdatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{
  id: string
}>) {
  await updatePayloadProductVariantsWorkflow(container)
    .run({
      input: {
        variant_ids: [data.id],
      }
    })
}

export const config: SubscriberConfig = {
  event: "product-variant.updated",
}
