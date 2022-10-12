import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Loader, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/sevices/shazamCore";

const AroundYou = () => {
	const [country, setCountry] = useState("");
	const [loading, setLoading] = useState(true);
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const { data, isFetching, error } = useGetSongsByCountryQuery(country);
	console.log(country);

	useEffect(() => {
		//at_0FWCGUPHV3mjvs01a1p97uucrYTLk
		axios
			.get(
				`https://geo.ipify.org/api/v2/country?apiKey=at_0FWCGUPHV3mjvs01a1p97uucrYTLk`
			)
			.then((res) => setCountry(res?.data?.location?.country))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, [country]);

	if (isFetching && loading)
		return <Loader title='Cargando canciones en tu zona' />;

	if (error && country !== "") return <Error />;

	return (
		<div className='flex flex-col'>
			<h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>
				Cerca tuyo 
        <br />
				 <span className='font-black'>{country}</span>
			</h2>
			<div className='flex flex-wrap sm:justify-start justify-center gap-8'>
				{data?.map((song, i) => (
					<SongCard
						key={song.key}
						song={song}
						isPlaying={isPlaying}
						activeSong={activeSong}
						data={data}
						i={i}
					/>
				))}
			</div>
		</div>
	);
};

export default AroundYou;
