import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const studentRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.string().optional())
    .query(async ({ ctx, input }) => {
      if (input && typeof input == "string") {
        const students = await ctx.prisma.student.findMany();

        const filteredStudents = students.filter((student) =>
          Object.values(student).some((value) =>
            String(value).toLowerCase().includes(input.toLowerCase())
          )
        );

        return filteredStudents;
      } else {
        return await ctx.prisma.student.findMany();
      }
    }),
});
