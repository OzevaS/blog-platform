/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { EventHandler, FC, useCallback, useEffect } from 'react';
import { useFieldArray, useForm, UseFormRegister } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { articleFormSchema } from '../../forms/formSchemas';
import classNames from '../../forms/formSection.module.scss';

export type ArticleFormData = {
  title: string;
  description: string;
  body: string;
  tags: {
    value: string;
  }[];
};

const classNameFormGroup = (error: any) => `${error ? classNames['formGroup--error'] : classNames.formGroup}`;

interface ArticleFormProps {
  title: string;
  onSubmit: (data: ArticleFormData) => void;
  data?: ArticleFormData;
}

export const ArticleForm: FC<ArticleFormProps> = ({ title, onSubmit, data }) => {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors: formErrors },
  } = useForm<ArticleFormData>({
    resolver: yupResolver(articleFormSchema),
  });
  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  });

  useEffect(() => {
    if (data) {
      setValue('title', data.title);
      setValue('description', data.description);
      setValue('body', data.body);
      setValue('tags', data.tags);
    }
  }, []);

  const onAddTag: EventHandler<React.MouseEvent<HTMLButtonElement>> = (e) => {
    const tag = e.currentTarget;
    const input = tag.previousSibling as HTMLInputElement;
    const valueTag = input.value;
    if (valueTag) {
      if (!fields.find((tag) => tag.value === valueTag)) {
        append({ value: valueTag });
        input.value = '';
      }
    }
  };

  const onDeleteTag = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  const tagItems = fields.map((tag, index) => {
    return <TagItem register={register} key={tag.id} index={index} onDelete={onDeleteTag} />;
  });

  return (
    <section className={classNames.formSection} style={{ maxWidth: '938px' }}>
      <form className={classNames.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classNames.title}>{title}</h1>
        <label htmlFor="Title" className={classNameFormGroup(formErrors.title)}>
          Title
          <input {...register('title')} id="title" placeholder="Title" />
          {formErrors?.title && <p>{formErrors.title.message}</p>}
        </label>
        <label htmlFor="description" className={classNameFormGroup(formErrors.description)}>
          Short description
          <input {...register('description')} id="name" placeholder="Short description" />
          {formErrors?.description && <p>{formErrors.description.message}</p>}
        </label>
        <label htmlFor="body" className={classNameFormGroup(formErrors.body)}>
          Text
          <textarea {...register('body')} id="body" placeholder="Text" />
          {formErrors?.body && <p>{formErrors.body.message}</p>}
        </label>
        <div className={classNames.tagList}>
          Tags
          {tagItems}
          <label className={classNames.formGroup}>
            <div className={classNames.tag}>
              <input placeholder="Tag" />
              <button onClick={onAddTag} type="button" className={classNames['blue-button']}>
                Add tag
              </button>
            </div>
          </label>
        </div>
        <button type="submit" className={classNames.submit} style={{ maxWidth: '319px' }}>
          Send
        </button>
      </form>
    </section>
  );
};

interface TagItemProps {
  index: number;
  onDelete: (index: number) => void;
  register: UseFormRegister<ArticleFormData>;
}

const TagItem: FC<TagItemProps> = React.memo(({ index, onDelete, register }) => {
  return (
    <label className={classNames.formGroup}>
      <div className={classNames.tag}>
        <input {...register(`tags.${index}.value`)} readOnly />
        <button onClick={() => onDelete(index)} type="button" className={classNames['red-button']}>
          Delete
        </button>
      </div>
    </label>
  );
});

export default ArticleForm;
