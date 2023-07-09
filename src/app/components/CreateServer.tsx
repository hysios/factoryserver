import { ChangeEvent, EventHandler, Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import useSWR from 'swr';
import { SnapshotResponse } from '@/types/snapshot';
import dayjs from 'dayjs';
import { TemplatesResponse } from '@/types/template';
import { ImagesResponse } from '@/types/image';

type CreateServerProps = {
    open: boolean;
    setOpen?: (open: boolean) => void;
}


export default function CreateServer({ open, setOpen }: CreateServerProps) {
    console.log('open', open)
    const handleClose = () => {
        setOpen && setOpen(false)
    }
    const [templateId, setTemplateId] = useState<any>(undefined);
    const [snapshotId, setSnapshotId] = useState<any>(undefined);
    const [imageId, setImageId] = useState<any>(undefined);

    // const { data, error, isLoading } = useSWR<SnapshotResponse, any>('/api/snapshots', (url) => fetch(url).then((res) => res.json()))
    const { data: images, error, isLoading } = useSWR<ImagesResponse, any>('/api/images', (url) => fetch(url).then((res) => res.json()))
    const {
        data: templates
    } = useSWR<TemplatesResponse, any>('/api/templates', (url) => fetch(url).then((res) => res.json()));

    console.log('images', images)
    const {
        Images: {
            Image = []
        } = {}
    } = images || {};

    const {
        LaunchTemplateSets: {
            LaunchTemplateSet = []
        } = {}
    } = templates || {};

    useEffect(() => {
        console.log(Image.length)
        if (!!Image.length) {
            console.log('imageId', Image[0].ImageId)
            setImageId(Image[0].ImageId)
        }
    }, [images, Image])

    useEffect(() => {
        if (!!LaunchTemplateSet.length) {
            console.log('templateId', LaunchTemplateSet[0].LaunchTemplateId)
            setTemplateId(LaunchTemplateSet[0].LaunchTemplateId)
        }
    }, [templates, LaunchTemplateSet])

    const handleCreateInstance = () => {
        return fetch('/api/servers', {
            method: 'POST', body: JSON.stringify({
                templateId: templateId,
                // snapshotId: snapshotId,
                imageId: imageId,
            })
        })
    }


    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    // console.log('snapshots', data)
    console.log('templates', templates);

    const handleChangeTemplate = (e: ChangeEvent<HTMLSelectElement>) => {
        setTemplateId(e.target.value)
    }

    const handleChangeSnapshot = (e: ChangeEvent<HTMLSelectElement>) => {
        setSnapshotId(e.target.value)
    }

    const handleChangeImage = (e: ChangeEvent<HTMLSelectElement>) => {
        setImageId(e.target.value)
    }

    // if (!!~LaunchTemplateSet.length) {
    // }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            创建服务器配置
                                        </Dialog.Title>
                                        <div className="mt-2 text-left space-y-6">
                                            {/* <h2 className="text-base font-semibold leading-7 text-gray-900">磁盘快照</h2>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                                This information will be displayed publicly so be careful what you share.
                                            </p> */}
                                            {/* 
                                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                <div className="sm:col-span-4">
                                                    <label htmlFor="snapshot" className="block text-sm font-medium leading-6 text-gray-900">
                                                        磁盘快照
                                                    </label>
                                                    <div className="mt-2">
                                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
                                                            <input
                                                                type="text"
                                                                name="username"
                                                                id="username"
                                                                autoComplete="username"
                                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                                placeholder="janesmith"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}

                                            <div className="sm:col-span-3">
                                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                    磁盘镜像
                                                </label>
                                                <div className="mt-2">
                                                    <select
                                                        id="image"
                                                        name="image"
                                                        onChange={handleChangeImage}
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                    >
                                                        {Image.map((image) => (
                                                            <option key={image.ImageId} value={image.ImageId}>{image.ImageName + ' ' + dayjs(image.CreationTime).format("YYYY-MM-DD")}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                    服务器模板
                                                </label>
                                                <div className="mt-2">
                                                    <select
                                                        id="template_id"
                                                        name="template_id"
                                                        onChange={handleChangeTemplate}
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                    >
                                                        {LaunchTemplateSet.map((template) => (
                                                            <option key={template.LaunchTemplateId} value={template.LaunchTemplateId}>{template.LaunchTemplateName}</option>
                                                        ))}
                                                        {/* <option>United States</option>
                                                        <option>Canada</option>
                                                        <option>Mexico</option> */}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  sm:col-start-2"
                                            onClick={() => handleCreateInstance().then(() => handleClose())}
                                        >
                                            创建
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                            onClick={handleClose}
                                        >
                                            取消
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root >
    )
}
