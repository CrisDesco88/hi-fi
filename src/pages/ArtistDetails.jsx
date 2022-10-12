import {  useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { useGetArtistDetailsQuery } from "../redux/sevices/shazamCore";

const ArtistDetails = () => {

	const {  id: artistId } = useParams();
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const { data: artistData, isFetching: isFetchingArtistDetails, error } =
		useGetArtistDetailsQuery(artistId);

	if (isFetchingArtistDetails)
		return <Loader title='Cargando detalles del artista' />;

	if (error) return <Error />;

	return (
		<div className='flex flex-col'>
			<DetailsHeader
				artistId={artistId}
				artistData={artistData}
			/>
			<RelatedSongs
				data={Object.values(artistData?.songs)}
				artistId={artistId}
				isPlaying={isPlaying}
				activeSong={activeSong}
			/>
		</div>
	);
};

export default ArtistDetails;
