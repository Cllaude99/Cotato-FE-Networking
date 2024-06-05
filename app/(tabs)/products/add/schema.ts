import { z } from 'zod';

export const productSchema = z.object({
  id: z.coerce.number().optional(),
  photo: z.string({
    required_error: '썸네일을 업로드 해주세요!',
  }),
  title: z.string({
    required_error: '제목을 입력해주세요!',
  }),
  description: z.string({
    required_error: '글 내용을 작성해주세요!',
  }),
});

export type ProductFormType = z.infer<typeof productSchema>;
