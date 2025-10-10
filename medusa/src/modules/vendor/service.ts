import { MedusaService } from "@medusajs/framework/utils";
import Vendor from "./models/vendor";
import VendorAdmin from "./models/vendor-admin";

class VendorModuleService extends MedusaService({
	Vendor,
	VendorAdmin,
}) {}

export default VendorModuleService;
