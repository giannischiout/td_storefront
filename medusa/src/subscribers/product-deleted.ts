import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework";
import { deletePayloadProductsWorkflow } from "../workflows/payload-product/delete-payload-products";

export default async function productDeletedHandler({
	event: { data },
	container,
}: SubscriberArgs<{
	id: string;
}>) {
	await deletePayloadProductsWorkflow(container).run({
		input: {
			product_ids: [data.id],
		},
	});
}

export const config: SubscriberConfig = {
	event: "product.deleted",
};
