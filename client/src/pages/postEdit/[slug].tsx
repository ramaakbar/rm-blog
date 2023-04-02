import { useState } from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import {
  Categories,
  PostType,
  categoriesSchema,
} from "@/features/posts/schemas";
import { axios } from "@/utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

import Button from "@/components/button";
import { FieldWrapper, Input } from "@/components/forms";
import Layout from "@/components/layout";
import Tiptap from "@/components/tiptap";

export const postUpdateDtoSchema = z.object({
  title: z.string(),
  body: z.string(),
  thumbnail: z.custom<FileList>().optional(),
  categoryId: z.string(),
});

export type PostUpdateDto = z.infer<typeof postUpdateDtoSchema>;

export default function PostEdit() {
  const router = useRouter();
  const { slug } = router.query;

  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const data = await axios.get<PostType>(`/posts/${slug}`);
      return data.data;
    },
    staleTime: Infinity,
    enabled: !!slug,
  });

  const { data: categories, isLoading: categoryIsLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const data = await axios.get("/categories");
      return categoriesSchema.parse(data);
    },
    staleTime: Infinity,
    enabled: !!slug,
  });

  return (
    <Layout>
      {post && <PostEditForm post={post} categories={categories} />}
    </Layout>
  );
}

const PostEditForm = ({
  post,
  categories,
}: {
  post: PostType;
  categories?: Categories;
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostUpdateDto>({
    values: {
      title: post.title,
      body: post.body,
      categoryId: String(post.category.id),
    },
    resolver: zodResolver(postUpdateDtoSchema),
    reValidateMode: "onSubmit",
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: FormData) =>
      axios.patch(`/posts/${post.id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      Router.push("/postList");
      toast.success("update Success");
    },
  });

  const onSubmit = (data: PostUpdateDto) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("body", data.body);
    formData.append("categoryId", data.categoryId);
    if (data.thumbnail && data.thumbnail?.length > 0) {
      formData.append("thumbnail", data.thumbnail[0]);
    }

    mutate(formData);
  };
  const [preview, setPreview] = useState(post.thumbnail);

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <FieldWrapper label="Title" error={errors.title}>
        <Input
          type="text"
          id="title"
          autoFocus
          required
          placeholder="title"
          register={register("title")}
        />
      </FieldWrapper>

      <FieldWrapper label="Category" error={errors.categoryId}>
        <select
          {...register("categoryId")}
          className={twMerge(
            "block w-full rounded-md border border-line bg-input py-2 px-3 text-sm leading-6 text-input-content placeholder-input-content-2",
            "focus:ring-2 focus:outline-none focus:ring-line-focus",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          <option value="">Choose category</option>
          {categories?.data.map((category) => (
            <option key={category.id} value={category.id}>
              {category.id}-{category.name}
            </option>
          ))}
        </select>
      </FieldWrapper>

      <FieldWrapper label="Thumbnail" error={errors.thumbnail}>
        <Image
          src={post.thumbnail}
          alt={""}
          width={300}
          height={200}
          className="w-full aspect-video"
        />

        <Input
          type="file"
          id="thumbnail"
          accept="image/*"
          register={register("thumbnail")}
        />
      </FieldWrapper>

      <FieldWrapper label="Body" error={errors.body}>
        <Controller
          name="body"
          control={control}
          render={({ field }) => (
            <Tiptap content={field.value} onChange={field.onChange} />
          )}
        />
      </FieldWrapper>
      <Button type="submit" isLoading={isLoading}>
        Update
      </Button>
    </form>
  );
};
