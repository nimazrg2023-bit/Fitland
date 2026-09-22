import Part1 from "./components/part1";
import Part2 from "./components/part2";


export default function Home() {
    return (
        <div className="w-full flex flex-col items-center mt-3">
            <Part1 />
            <Part2 />
        </div>
    )
}