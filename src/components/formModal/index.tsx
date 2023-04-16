import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
// import { proxy ,useSnapshot} from 'valtio'
import { api } from '~/utils/api';
import { useForm } from 'react-hook-form';
import React from 'react';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
export function MyModal() {

  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

const [featuredImageAsDataUrl, setFeaturedImageAsDataUrl] = React.useState<string | null>(null);
    const createPost = api.post.createPost.useMutation({
        onSuccess: () => {
            void console.log('successfully created');
        },
    });

    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm();


    const handleChangeFeaturedImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];

        if (file.size > 1.5 * 1000000) {
          return toast.error("images size should not be greater than 1MB");
        }
        const fileReader = new FileReader();
        URL.createObjectURL(file)
        fileReader.readAsDataURL(file);

        fileReader.onloadend = () => {
          if (fileReader.result) {
            const featuredImageAsDataUrl = fileReader.result as string;
            setFeaturedImageAsDataUrl(featuredImageAsDataUrl);
          }

        };
      }
    };
  return (
    <>
      <div className="absolute top-0 mt-10 pt-10 pr-10 right-0">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Write Post
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className='flex flex-col'>
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#4aa3ec] p-6 text-left align-middle shadow-xl transition-all">
                  {/* <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    asdfdasfsdfa
                  </Dialog.Title> */}
                  <form 
                  className='flex flex-col gap-2 w-full rounded-2xl '
                  onSubmit={handleSubmit((data) => {
            return createPost.mutate({
              description: data.description,
              title: data.title,
              text: data.text,
              featuredImageAsDataUrl: featuredImageAsDataUrl as string,
            },
            {
              onSuccess: () => {
                toast.success('successfully created')
                reset()
              },
            })
          })}
          >
          <input
            className='dark:bg-gray-100 rounded-md p-2 text-black'
            type="text"
            placeholder="title"
            {...register('title', { required: true })}
          />
          {errors.title && <span>This field is required</span>}
          <input
          className='dark:bg-gray-100 rounded-md p-2 text-black'
            type="text"
            placeholder="description"
            {...register('description', { required: true })}
          />
          {errors.description && <span>This field is required</span>}
          <textarea
            // type="text"
            className='dark:bg-gray-100 rounded-md p-2 text-black'
            rows={10}
            placeholder="text"
            {...register('text', { required: true })}
          />
          {errors.text && <span>This field is required</span>}
          <input {...register('featuredImageAsDataUrl', { required: true })} type="file" onChange={handleChangeFeaturedImage}
                        multiple={false}/>
          {errors.featuredImageAsDataUrl && <span>This field is required</span>}
          <button type="submit"

          >Submit</button>
          <button type="reset"
          onClick={() => {reset()}}
          >Reset</button>
          </form>
                </Dialog.Panel>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
