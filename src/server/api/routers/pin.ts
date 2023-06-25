/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import {
	createTRPCRouter,
	publicProcedure,
	protectedProcedure,
} from "~/server/api/trpc";


export const pinRouter = createTRPCRouter({


	getAllPins: protectedProcedure.query(({ ctx }) => {
		return ctx.prisma.pin.findMany();
	}),

	getPinDetails: protectedProcedure.query(({ ctx, input }) => {
		return ctx.prisma.pin.findUnique({
			where: {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				id: input?.id || "", // Use optional chaining to access the input's id safely
			},
		});
	}),


	delete: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			return ctx.prisma.pin.delete({
				where: {
					id: input.id,
				},
			});
		}),
	edit: protectedProcedure
		.input(z.object({ id: z.string(), name: z.string(), address: z.string(), city: z.string(), lng: z.number(), lat: z.number(), description: z.string() }))
		.mutation(async ({ ctx, input }) => {
			return ctx.prisma.pin.update({
				where: {
					id: input.id,
				},
				data: {
					name: input.name,
					address: input.address,
					city: input.city,
					lng: input.lng,
					lat: input.lat,
					description: input.description,
					userId: ctx.session.user.id,
					//@ts-ignore
					userName: ctx.session.user.name,
				},
			});
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
					//@ts-ignore
					userName: ctx.session.user.name
				}
			})
		})
})


