import type { MedusaNextFunction, MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { authenticate, defineMiddlewares, validateAndTransformBody } from "@medusajs/framework/http";

import { ConfigModule } from "@medusajs/framework";
import { parseCorsOrigins } from "@medusajs/framework/utils";
import cors from "cors";
import { PostVendorCreateSchema } from "./admin/vendors/route";

export default defineMiddlewares({
	routes: [
		{
			matcher: "/static*",
			middlewares: [
				(req: MedusaRequest, res: MedusaResponse, next: MedusaNextFunction) => {
					console.log("CORS middleware for static files");
					const configModule: ConfigModule = req.scope.resolve("configModule");

					return cors({
						origin: parseCorsOrigins(configModule.projectConfig.http.storeCors),
						credentials: true,
					})(req, res, next);
				},
			],
		},

		{
			matcher: "/vendors",
			method: ["POST"],
			middlewares: [
				authenticate("vendor", ["session", "bearer"], {
					allowUnregistered: true,
				}),
				validateAndTransformBody(PostVendorCreateSchema),
			],
		},
		{
			matcher: "/vendors/*",
			middlewares: [authenticate("vendor", ["session", "bearer"])],
		},
	],
});
