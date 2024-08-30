import { number, object, string, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({ required_error: "Ganja's name is reqired" }),
    category: string({ required_error: "Category is required" }),
    thca: string({ required_error: "Thca is required" }),
    thc: string({ required_error: "Thc is required" }),
    cbda: string({ required_error: "Cbda is required" }),
    cbd: string({ required_error: "Cbd is required" }),
    summary: string({ required_error: "Summary is reqiured" }).max(
      200,
      "Summary cannot be longer then 200 chars"
    ),
    price: number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    }).positive({ message: "Price must be greater then 0" }),
    coverImage: string({ required_error: "Cover image is required" }),
  }),
};

const params = {
  params: object({
    ganjaId: string({ required_error: "Ganja's id is required" }),
  }),
};

export const createGanjaSchema = object({ ...payload });
export const getGanjaSchema = object({ ...params });
export const updateGanjaSchema = object({ ...params, ...payload });
export const deleteGanjaSchema = object({ ...params });

export type CreateGanjaInput = TypeOf<typeof createGanjaSchema>["body"];
export type FindGanjaInput = TypeOf<typeof getGanjaSchema>["params"];
export type UpdateGanjaInput = TypeOf<typeof updateGanjaSchema>;
export type DeleteGanjaInput = TypeOf<typeof deleteGanjaSchema>["params"];
