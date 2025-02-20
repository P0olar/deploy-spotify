import React from 'react'
import Player from '../components/Player'
import { Link, useParams } from 'react-router-dom'
import { songsArray } from '../assets/database/songs'
import { artistArray } from '../assets/database/artists'

const Song = () => {
    const { id } = useParams();
    const SongObj = songsArray.find((currentSongObj) => currentSongObj._id === id);

    if (!SongObj) {
        return <p>Erro: Música não encontrada.</p>;
    }

    const ArtistObj = artistArray.find((currentArtistObj) => currentArtistObj.name === SongObj.artist);

    if (!ArtistObj) {
        return <p>Erro: Artista não encontrado.</p>;
    }

    const songsArrayFromArtist = songsArray.filter((currentSongObj) => currentSongObj.artist === SongObj.artist);

    if (songsArrayFromArtist.length === 0) {
        return <p>Erro: Nenhuma outra música encontrada para este artista.</p>;
    }

    const randomIndex = Math.floor(Math.random() * songsArrayFromArtist.length);
    const randomIndex2 = Math.floor(Math.random() * songsArrayFromArtist.length);

    const randomIdFromArtist = songsArrayFromArtist[randomIndex]?._id;
    const randomIdFromArtist2 = songsArrayFromArtist[randomIndex2]?._id;

    return (
        <div className='song'>
            <div className="song__container">
                <div className='song__image-container'>
                    <img src={SongObj.image} alt={`Imagem da Musica ${SongObj.name}`} />
                </div>
            </div>
            <div className="song__bar">
                <Link to={`/artist/${ArtistObj._id}`} className='song__artist-image'>
                    <img width={75} height={75} src={ArtistObj.image} alt="Imagem do Artista Y" />
                </Link>

                <Player audio={SongObj.audio} songDuration={SongObj.duration} randomIdFromArtist={randomIdFromArtist} randomIdFromArtist2={randomIdFromArtist2} />

                <div>
                    <p className='song__name'>{SongObj.name}</p>
                    <p>{SongObj.artist}</p>
                </div>
            </div>
        </div>
    );
}

export default Song;
