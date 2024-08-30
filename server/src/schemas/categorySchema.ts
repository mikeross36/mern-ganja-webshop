import { object, string, TypeOf, array } from "zod";

const payload = {
  body: object({
    name: string({ required_error: "Category name is required" }),
    origin: string({ required_error: "Category origin is required" }),
    description: string({ required_error: "Description is reqired" }).max(
      100,
      "Description must not be longer then 100 chars"
    ),
    cbdToThcRatio: string({ required_error: "Cbd Thc ratio is required" }),
    effectsOfUse: string({ required_error: "Effects of use is required" }),
    periodOfUse: string({ required_error: "Period of use is required" }),
    coverImage: string({ required_error: "Cover image is required" }),
    ganjas: array(string()),
  }),
};

const params = {
  params: object({
    categoryId: string({ required_error: "Category id is required" }),
  }),
};

export const createCategorySchema = object({ ...payload });
export const getCategorySchema = object({ ...params });
export const updateCategorySchema = object({ ...params, ...payload });
export const deleteCategorySchema = object({ ...params });

export type CreateCategoryInput = TypeOf<typeof createCategorySchema>["body"];
export type GetCategoryInput = TypeOf<typeof getCategorySchema>["params"];
export type UpdateCategoryInput = TypeOf<typeof updateCategorySchema>;
export type DeleteCategoryInput = TypeOf<typeof deleteCategorySchema>["params"];
