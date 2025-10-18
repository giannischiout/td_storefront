
import { MedusaService } from "@medusajs/framework/utils";
import BookingRule from "./models/booking-rule";
import BookingSlot from "./models/booking-slot";


class BookingModuleService extends MedusaService({
	BookingRule,
	BookingSlot,
}) {}

export default BookingModuleService;
