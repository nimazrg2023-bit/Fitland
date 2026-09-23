import Part1 from "./components/part1";
import Part2 from "./components/part2";
import Part3 from "./components/part3";
import Part4 from "./components/part4";
import Part5 from "./components/part5";
import Part6 from "./components/part6";
import Part7 from "./components/part7";


export default function Home() {
    return (
        <div className="w-full flex flex-col items-center mt-3">
            <Part1 />
            <Part2 />
            <Part3 />
            <Part4 />
            <Part5 />
            <Part6 />
            <Part7 />
        </div>
    )
}