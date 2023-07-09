'use client'
import { DescribeInstancesResponse, Instance } from "@/types/instance";
import useSWR from "swr";
import { ClipboardIcon, XMarkIcon } from '@heroicons/react/24/outline'
import useClipboard from "react-use-clipboard";
import { useState } from "react";
import CreateServer from "./components/CreateServer";
import dayjs from "dayjs";
import StopServer from "./components/StopServer";

const people = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Michael Foster',
    email: 'michael.foster@example.com',
    role: 'Co-Founder / CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Dries Vincent',
    email: 'dries.vincent@example.com',
    role: 'Business Relations',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: null,
  },
  {
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    role: 'Front-end Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    role: 'Designer',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    role: 'Director of Product',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: null,
  },
]


const CopyButton = ({ text }: any) => {
  const [isCopied, setCopied] = useClipboard(text, {
    // `isCopied` will go back to `false` after 1000ms.
    successDuration: 1000,
  });
  console.log(isCopied);
  if (isCopied) {
    return <span className="text-green-500">Copied!</span>;
  } else {
    return <ClipboardIcon className="inline-block w-5 h-5" onClick={setCopied} />
  }
}

type InstanceStateProp = {
  instance: Instance,
}

const InstanceState = ({ instance }: InstanceStateProp) => {
  switch (instance.Status) {
    case 'Running':
      return <div className="mt-1 flex items-center gap-x-1.5">
        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </div>

        <p className="text-xs leading-5 text-gray-500">在线</p>
      </div>
    case 'Stopped':
      return <div className="mt-1 flex items-center gap-x-1.5">
        <div className="flex-none rounded-full bg-red-500/20 p-1">
          <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
        </div>

        <p className="text-xs leading-5 text-gray-500">停止</p>
      </div>
    default:
      return <div className="mt-1 flex items-center gap-x-1.5">
        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </div>

        <p className="text-xs leading-5 text-gray-500">停止</p>
      </div>
  }

}

export default function Home() {
  const [openCreate, setOpenCreate] = useState(false);
  const [stopServer, setStopServer] = useState(false);
  const [currentInstanceId, setCurrentInstanceId] = useState<any>(undefined)

  const { data, error, isLoading } = useSWR<DescribeInstancesResponse, any>('/api/servers', (url) => fetch(url).then((res) => res.json()))
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  const { Instances: { Instance } } = data!;

  const handleStopServer = (instance: Instance) => {
    setCurrentInstanceId(instance.InstanceId);
    setStopServer(true);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6 w-full">
          <div className="w-full">
            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-2">
                <h3 className="text-base font-semibold leading-6 text-gray-900">服务器列表</h3>
              </div>
              <div className="ml-4 mt-2 flex-shrink-0">
                <button
                  type="button"
                  className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => setOpenCreate(true)}
                >
                  创建游戏服务器
                </button>
                <CreateServer open={openCreate} setOpen={setOpenCreate} />
              </div>
            </div>
            <ul role="list" className="divide-y divide-gray-100">
              {Instance.map((instance) => (
                <li key={instance.InstanceId} className="flex justify-between gap-x-6 py-5">
                  <div className="flex gap-x-4">
                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={"//img2.storyblok.com/fit-in/0x200/filters:format(png)/f/110098/268x268/d1ebbafe03/logo.png"} alt="" />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{instance.InstanceId} <span className="text-md inline-block p-1 rounded bg-gray-100">{instance.PublicIpAddress.IpAddress}</span>
                        {/* <ClipboardIcon className="inline-block w-6 h-6" /> */}
                        <CopyButton text={instance.PublicIpAddress.IpAddress[0]} /></p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">{instance.InstanceName} {dayjs(instance.StartTime).format("YYYY-MM-DD HH:mm:ss")}</p>

                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <div className="inline-block align-middle">

                    </div>
                    <p className="text-sm leading-6 text-gray-900">{instance.InstanceChargeType} </p>

                    {/* {person.lastSeen ? (
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                      </p>
                    ) : (
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-xs leading-5 text-gray-500">Online</p>
                      </div> }
                    {/* )} */}
                    <InstanceState instance={instance} />
                    <p className="leading-6 ">
                      <button
                        type="button"
                        className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => handleStopServer(instance)}
                      >
                        <XMarkIcon className="h-3 w-3" />
                      </button>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <StopServer instanceId={currentInstanceId} open={stopServer} setOpen={setStopServer} />
          </div>
        </div>
      </div>
    </main >
  )
}
