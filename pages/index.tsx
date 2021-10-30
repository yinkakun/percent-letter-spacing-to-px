import type { NextPage } from "next";
import Head from "next/head";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";

type Inputs = {
    fontSizeInPx: number;
    lineHeightInPercent: number;
};

const converLineHeightInPercentToPx = (
    lineHeightInPercent: number = 0,
    fontSizeInPx: number = 0
): string => {
    return ((lineHeightInPercent / 100) * fontSizeInPx).toFixed(1);
};

const MAX_INPUT_LENGTH = 5;

const Home: NextPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>({
        mode: "all",
        shouldUseNativeValidation: false,
    });

    const lineHeightInPercent = watch("lineHeightInPercent");
    const fontSizeInPx = watch("fontSizeInPx");
    const [isCopied, setIsCopied] = useState(false);
    const [lineHeightInPx, setLineHeightInPx] = useState("0");
    const [_value, copy] = useCopyToClipboard();

    useEffect(() => {
        const lineHeightInPx = converLineHeightInPercentToPx(
            lineHeightInPercent,
            fontSizeInPx
        );

        setLineHeightInPx(lineHeightInPx);
    }, [lineHeightInPercent, fontSizeInPx]);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const lineHeightInPx = converLineHeightInPercentToPx(
            data.lineHeightInPercent,
            data.fontSizeInPx
        );
        setLineHeightInPx(lineHeightInPx);
        copy(`${lineHeightInPx}px`);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    return (
        <div>
            <Head>
                <title> Convert Line heights in Percentage value to px.</title>
                <meta
                    name="description"
                    content=" Convert Line heights in Percentage value to px."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="container flex items-center h-full px-6 py-8 mx-auto">
                <div className="mx-auto border mockup-window h-full lg:max-h-96 bg-base-200 border-base=300 w-full max-w-5xl overflow-y-auto py-10">
                    <div className="flex flex-col items-center px-12 mt-24">
                        <h1 className="text-center mb-14 text-opacity-90">
                            Convert Line heights in Percentage value to px.
                        </h1>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col items-center gap-8 mt-6 md:items-stretch lg:flex-row"
                        >
                            <div className="relative form-control">
                                <label className="absolute label -top-8">
                                    <span className="text-xs label-text text-opacity-80">
                                        Line height in percent
                                    </span>
                                </label>
                                <label className="relative input-group-md">
                                    <input
                                        {...register("lineHeightInPercent")}
                                        className="pr-10 input input-bordered"
                                        autoComplete="off"
                                        type="number"
                                        maxLength={MAX_INPUT_LENGTH}
                                        onInput={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            (e.target.value =
                                                e.target.value.slice(
                                                    0,
                                                    MAX_INPUT_LENGTH
                                                ))
                                        }
                                    />
                                    <span className="absolute top-0 right-0 flex items-center justify-center h-full px-4 border rounded-l-none rounded-r-lg bg-base-300">
                                        %
                                    </span>
                                </label>
                            </div>

                            <div className="relative form-control">
                                <label className="absolute label -top-8">
                                    <span className="text-xs label-text text-opacity-80">
                                        Font size in px
                                    </span>
                                </label>
                                <label className="relative input-group-md">
                                    <input
                                        {...register("fontSizeInPx")}
                                        className="pr-10 input input-bordered"
                                        autoComplete="off"
                                        type="number"
                                        maxLength={MAX_INPUT_LENGTH}
                                        onInput={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            (e.target.value =
                                                e.target.value.slice(
                                                    0,
                                                    MAX_INPUT_LENGTH
                                                ))
                                        }
                                    />
                                    <span className="absolute top-0 right-0 flex items-center justify-center h-full px-4 border rounded-l-none rounded-r-lg bg-base-300">
                                        px
                                    </span>
                                </label>
                            </div>

                            <div className="px-2 py-2 text-xl ">=</div>

                            <div className="flex items-center justify-between p-2 bg-white border rounded-lg">
                                <span className="w-40 ml-4 overflow-hidden overflow-ellipsis">
                                    <span>{lineHeightInPx}</span>
                                    <span className="mr-4">px</span>
                                </span>
                                <button
                                    type="submit"
                                    className={`w-20 text-white rounded-lg btn btn-primary btn-sm transition-all ${
                                        isCopied ? "btn-success" : ""
                                    }`}
                                >
                                    {isCopied ? "Copied" : "Copy"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
