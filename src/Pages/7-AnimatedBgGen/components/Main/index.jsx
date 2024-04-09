import React, { useEffect, useState, useRef } from "react";
import Shape from "./components/Shape";
import { useGlobalContext } from "../../GlobalApp";
import Color from "./components/Color";
import Code from "./components/Code";

function index() {
    const { isThemeLight } = useGlobalContext();

    const [shapeAmount, setShapeAmount] = useState(20);

    const [shapeRange, setShapeRange] = useState(10);

    const [animationTime, setAnimationTime] = useState(1);

    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [backgroundColors, setBackgroundColors] = useState([]);

    const backgroundArr = [
        "red",
        "green",
        "blue",
        "orange",
        "yellow",
        "pink",
        "purple",
        "white",
        "gray",
        "black",
    ];

    useEffect(() => {
        setBackgroundColors((pre) => {
            return [...pre, backgroundColor];
        });
    }, [backgroundColor]);

    const [opacity, setOpacity] = useState(10);

    const codeBgColor = isThemeLight ? "white" : "blue";

    const markdownText = (name) => {
        return `
    \`\`\`javascript
    export function greet(name) {
      return \`Hello, \${name}!\`;
    }
    
    console.log(greet('${name}'));
    \`\`\`
    `;
    };

    const parentCode = () => {
        return `

    import Shape from "./Shape.jsx"

    export function Parent() {

        return <div className="parent" style={{opacity:${
            opacity / 10
        }, backgroundColor:"${codeBgColor}"}}>

        {[...Array(+${shapeAmount})].map((_, index) => {
            return (
                <Shape
                    key={index}
                    shapeRange={${shapeRange}}
                    animationTime={${animationTime}}
                    colors={[${[
                        ...backgroundColors.map(
                            (item) => item && '"' + item + '"',
                        ),
                    ]}]}

                />
            );
        })}
    </div>
    }

    export default Parent
    
        `;
    };

    const componentCode = () => {
        return `
    import {useState,useEffect} from "react"    
    import "./index.scss";

    function Shape({ shapeRange, animationTime, colors }) {
        const [leftPosition, setLeftPosition] = useState(null);
        const randomLeftPosition = Math.random() * 90;
        const [topPosition, setTopPosition] = useState(null);
        const randomTopPosition = Math.random() * 90;
        const randomShapeRange = Math.floor(Math.random() * 50);
        const randomTime = Math.floor(Math.random() * 10);
        const randomBg = Math.floor(Math.random() * colors.length);

        useEffect(() => {
            setLeftPosition(90 - randomLeftPosition);
            setTopPosition(200 - randomTopPosition);
        }, []);

    return (
        <div
            className="shape"
            style={{
                bottom: 0,
                left: \`\${leftPosition}%\`,
                background: colors[randomBg],
                borderRadius: \`\${randomShapeRange - shapeRange}%\`,
                "--second": \`\${randomTime + animationTime}s\`,
            }}
        ></div>
    );
}        
        `;
    };

    const scssCode = () => {
        return `

    .parent {
        position: absolute;
        z-index: -1;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }

    .shape {
        position : absolute ;
        width: 4rem;
        aspect-ratio: 1;
        animation: move var(--second) infinite;

        @keyframes move {
            to {
                transform: translateY(-2000%);
            }
        }
    }
    
    
        `;
    };

    const codes = [parentCode, componentCode, scssCode];

    return (
        <section className=" relative">
            <div className="absolute z-10 top-0 left-0 grid gap-8">
                <div
                    className={`Panel 
                ${
                    isThemeLight
                        ? " bg-white text-black"
                        : " bg-gray-800 text-white"
                }
            `}
                >
                    <form className="Control padding grid gap-[1vh] max-w-80 ">
                        <label
                            htmlFor="count"
                            className="flex gap-4 font-semibold text-xl"
                        >
                            Count
                            <span>( {shapeAmount} )</span>
                        </label>
                        <input
                            type="range"
                            name="count"
                            id="count"
                            onChange={(e) => setShapeAmount(e.target.value)}
                            value={shapeAmount}
                        />
                        <label
                            htmlFor="shape"
                            className="flex gap-4 font-semibold text-xl"
                        >
                            Shape
                            <span>( {shapeRange} )</span>
                        </label>
                        <input
                            type="range"
                            max={50}
                            name="shape"
                            id="shape"
                            onChange={(e) => setShapeRange(e.target.value)}
                            value={shapeRange}
                        />
                        <label
                            htmlFor="speed"
                            className="flex gap-4 font-semibold text-xl"
                        >
                            Speed
                            <span>( {animationTime} )</span>
                        </label>
                        <input
                            type="range"
                            min={1}
                            max={10}
                            name="speed"
                            id="speed"
                            onChange={(e) => setAnimationTime(e.target.value)}
                            value={animationTime}
                        />
                        <label
                            htmlFor="opacity"
                            className="flex gap-4 font-semibold text-xl"
                        >
                            Oopacity
                            <span>( {opacity / 10} )</span>
                        </label>
                        <input
                            type="range"
                            min={1}
                            max={10}
                            name="opacity"
                            id="opacity"
                            onChange={(e) => setOpacity(e.target.value)}
                            value={opacity}
                        />
                        <label
                            htmlFor="background"
                            className="grid font-semibold text-xl"
                        >
                            BackgroundColor
                            <div className="flex justify-between items-center">
                                <input
                                    type="color"
                                    name="background"
                                    id="background"
                                    onBlur={(e) =>
                                        setBackgroundColor(e.target.value)
                                    }
                                />
                                <button
                                    type="button"
                                    className={`font-medium  text-sm py-[1px] px-[4px]
                                        ${
                                            isThemeLight
                                                ? "bg-gray-200"
                                                : " bg-green-900"
                                        }
                                    `}
                                    onClick={(e) => {
                                        setBackgroundColors(backgroundArr);
                                    }}
                                >
                                    Random
                                </button>
                            </div>
                        </label>
                        <div className=" flex flex-wrap gap-1">
                            {backgroundColors.map((item, ind) => {
                                if (item) {
                                    return (
                                        <Color
                                            key={item}
                                            item={item}
                                            setBackgroundColors={
                                                setBackgroundColors
                                            }
                                        />
                                    );
                                }
                            })}
                        </div>
                    </form>
                </div>

                {codes.map((code, index) => (
                    <Code key={index} code={code} />
                ))}
            </div>

            <div
                style={{ opacity: opacity / 10 }}
                className={`absolute min-w-full min-h-[83vh] overflow-hidden transition -z-1
                ${isThemeLight ? "bg-blue-200" : "bg-blue-900"}
            `}
            >
                {[...Array(+shapeAmount)].map((_, index) => {
                    return (
                        <Shape
                            key={index}
                            shapeRange={shapeRange}
                            animationTime={animationTime}
                            backgroundColors={backgroundColors}
                        />
                    );
                })}
            </div>
        </section>
    );
}

export default index;
