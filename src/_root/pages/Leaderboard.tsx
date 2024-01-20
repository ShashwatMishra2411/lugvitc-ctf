/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { URL_ORIGIN } from "../../constants";
import { useGlitch } from "react-powerglitch";
import Typewriter from "typewriter-effect";
import eventLogo from "../../assets/images/passwordctf-logo.png";

interface LeaderboardResponse {
	team_name: string;
	score: number;
}

const Leaderboard = () => {
	const glitch = useGlitch();
	const [leaderboardData, setLeaderboardData] = useState<LeaderboardResponse[]>();
	const [isPageVisible, setIsPageVisible] = useState(true);
	const [intervalId, setIntervalId] = useState<number>(0);

	const fetchData = () => {
		axios
			.get<LeaderboardResponse[]>(`${URL_ORIGIN}/leaderboard`)
			.then((response) => response.data)
			.then((data) => setLeaderboardData(data))
			.catch((error) => console.error("Error fetching data:", error));
	};

	useEffect(() => {
		if (isPageVisible) {
			if (document.visibilityState === "visible") {
				const id = setInterval(() => {
					fetchData();
					if (!isPageVisible) clearInterval(id);
				}, 1500);
				console.log(id);
				setIntervalId(id);
			} else {
				if (intervalId) {
					clearInterval(intervalId);
					setIntervalId(0);
				}
			}
		}
		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [isPageVisible]);

	useEffect(() => {
		const handleVisibilityChange = () => {
			setIsPageVisible(false);
			if (document.visibilityState === "visible") {
				// Page is visible, start the interval
				const id = setInterval(fetchData, 1500);
				setIntervalId(id);
			} else {
				// Page is not visible, clear the interval
				if (intervalId) {
					clearInterval(intervalId);
					setIntervalId(0);
				}
			}
		};
		// Add event listener for visibility change
		document.addEventListener("visibilitychange", handleVisibilityChange);

		// Cleanup: Remove event listener and clear interval when the component unmounts
		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);

			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [intervalId]);

	return (
		<div className="relative z-0 min-h-screen min-w-full bg-midnight-blue">
			<div
				ref={glitch.ref}
				className="fixed left-0 top-0 -z-20 h-96 w-full animate-leader-anime rounded-l bg-opacity-0 bg-gradient-to-b from-transparent to-[#03f40f20] blur-lg"
			></div>
			<div className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-10 sm:gap-20 bg-leaderboard bg-cover bg-fixed bg-no-repeat p-10 pt-20 sm:p-20">
				<div className="flex gap-1 self-start font-source-code-pro text-sm text-[#08FF08] md:text-2xl lg:text-4xl">
					<span className="text-red-700">
						lugvitc@ctf:<span className="font-bold text-sky-blue">~</span>${" "}
					</span>
					<span>sudo get-hackerboard</span>
					<Typewriter
						options={{
							strings: [""],
							// autoStart: true,
							loop: false,
							cursor: "|", // Set the cursor to an empty string initially
							delay: 50,
						}}
						onInit={(typewriter) => {
							typewriter.typeString("").start();
						}}
					/>
				</div>
				{leaderboardData && <div className="top3 relative flex h-full w-full items-center justify-center gap-2 sm:gap-10 font-DM-Mono font-extrabold text-lg sm:text-2xl uppercase">
					<div className="flex h-full w-full flex-col items-center justify-center hover:drop-shadow-circle transition-all duration-200 hover:scale-125">
						<div className="relative rounded-full border-4 border-fluorescent-green bg-black h-24 w-24 sm:h-40 sm:w-40">
							<div className="h-full w-full before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-full before:bg-silver before:mix-blend-color">
								<img
									src={eventLogo}
									alt=""
									className=" h-full w-full object-contain"
								/>
							</div>
						</div>
						<div className=" py-2 text-fluorescent-green rounded-lg ">{leaderboardData[1].team_name}</div>
					</div>
					<div className="flex h-full w-full flex-col items-center justify-center hover:drop-shadow-circle transition-all duration-200 hover:scale-125">
						<div className="relative rounded-full border-4 border-fluorescent-green bg-black h-32 w-32 sm:h-48 sm:w-48">
							<div className="h-full w-full before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-full before:bg-gold before:mix-blend-color">
								<img
									src={eventLogo}
									alt=""
									className="h-full w-full object-contain"
								/>
							</div>
						</div>
						<div className=" py-2 text-fluorescent-green rounded-lg ">{leaderboardData[0].team_name}</div>
					</div>
					<div className="flex h-full w-full flex-col items-center justify-center hover:drop-shadow-circle transition-all duration-200 hover:scale-125">
						<div className="relative rounded-full border-4 border-fluorescent-green bg-black h-24 w-24 sm:h-40 sm:w-40">
							<div className="h-full w-full before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-full before:bg-bronze before:mix-blend-color">
								<img
									src={eventLogo}
									alt=""
									className="h-full w-full object-contain"
								/>
							</div>
						</div>
						<div className=" py-2 text-fluorescent-green rounded-lg ">{leaderboardData[2].team_name}</div>
					</div>
				</div>}
				<div className="h-full w-full overflow-auto rounded-xl p-6 pt-0 ">
					<div className="flex h-full w-full flex-col items-center border-4 border-fluorescent-green text-fluorescent-green">
						<div className="h-full w-full bg-green-900">
							<div className="phelix-boomgartner m-6 mt-2 flex h-full items-center justify-center text-3xl uppercase drop-shadow-black sm:text-5xl md:text-6xl lg:text-8xl">
								HackerBoard
							</div>
							<div className="flex w-full font-source-code-pro font-bold uppercase drop-shadow-black sm:text-2xl lg:text-4xl">
								<div className="w-full basis-1/5 border-2 border-l-0 border-fluorescent-green py-4 text-center">
									[Ranking]
								</div>
								<div className="w-full basis-3/5 border-2 border-fluorescent-green py-4 text-center">
									[Team]
								</div>
								<div className="w-full basis-1/5 border-2 border-r-0 border-fluorescent-green py-4 text-center">
									[Points]
								</div>
							</div>
						</div>
						<div className="flex h-full w-full flex-col bg-black bg-opacity-50 font-source-code-pro">
							{leaderboardData && leaderboardData.map((team, index) => (
								<div
									className="flex w-full drop-shadow-3xl sm:text-3xl"
									key={index}
								>
									<div className="w-full basis-1/5 border-2 border-l-0 border-fluorescent-green border-opacity-50 py-3 text-center">
										{index + 1}
									</div>
									<div className="w-full basis-3/5 border-2 border-fluorescent-green border-opacity-50 py-3 text-center">
										{team.team_name}
									</div>
									<div className="w-full basis-1/5 border-2 border-r-0 border-fluorescent-green border-opacity-50 py-3 text-center">
										{team.score}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Leaderboard;
