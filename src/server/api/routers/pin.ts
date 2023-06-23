import { z } from "zod";
import {
	createTRPCRouter,
	publicProcedure,
	protectedProcedure,
} from "~/server/api/trpc";

export const pinRouter = createTRPCRouter({

	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.pin.findMany();
	}),

	create: protectedProcedure
		.input(z.object({ name: z.string(), address: z.string(), city: z.string(), lng: z.number(), lat: z.number(), description: z.string() }))
		.mutation(({ ctx, input }) => {
			return ctx.prisma.pin.create({
				data: {
					name: input.name,
					address: input.address,
					city: input.city,
					lng: input.lng,
					lat: input.lat,
					description: input.description,
					userId: ctx.session.user.id,
				}
			})
		})
})
