'use client'

import {TemplateDefault} from "@/components/templateDefault/Template";
import React, {useState} from "react";
import {Input} from "@/components/input/Input";
import {Button} from "@/components/button/Button";
import {LinkButton} from "@/components/linkButton/LinkButton";

export default function Page() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <TemplateDefault loading={isLoading}>
            <section className="flex flex-col items-center justify-center">
                <h2 className=" text-3xl font-extrabold mt-4 mb-10 tracking-tight text-gray-900">
                    New image
                </h2>
                <form action="" className="flex flex-col items-center justify-center gap-4">
                    <div className="flex flex-col items-center justify-center">
                        <label className="text-gray-600">Image name:</label>
                        <Input placeholder="Image name" textColor="gray" borderColor="gray" type="text" value=""/>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <label className="text-gray-600">Tags:</label>
                        <Input placeholder="Tags" textColor="gray" borderColor="gray" type="text" value=""/>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <label className="text-gray-600">Image:</label>
                        <div
                            className="mt-2 flex items-center justify-center rounded-lg border border-dashed border-gray-900 px-20 py-20">
                            <div className="text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor"
                                     aria-hidden="true">
                                    <path fillRule="evenodd"
                                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                          clipRule="evenodd"/>
                                </svg>
                                <div className="mt-4 flex text-ms loading-6 text-gray-600 flex-col items-center">
                                    <label
                                        className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
                                        <span>Upload a file</span>
                                        <input type="file" className="sr-only"/>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-6">
                        <Button bgColor={"blue"} textColor={"white"} type={"submit"}>
                            Save
                        </Button>
                        <LinkButton href="/gallery" bgColor="yellow" textColor="white">
                            Cancel
                        </LinkButton>
                    </div>
                </form>
            </section>
        </TemplateDefault>
    )
}