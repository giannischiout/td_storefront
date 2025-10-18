import { model } from "@medusajs/framework/utils"
import BookingSlot from "./booking-slot";


const BookingRule = model.define("booking_rule", {
	id: model.id().primaryKey(),
	recurrence: model.enum(["daily", "weekly", "custom"]).default("daily"),
	days_of_week: model.array().nullable(),
	custom_dates: model.array().nullable(),
	excluded_dates: model.array().nullable(),
	booking_slot: model.hasOne(() => BookingSlot, {
		mappedBy: "booking_rule",
	}),
})

export default BookingRule
