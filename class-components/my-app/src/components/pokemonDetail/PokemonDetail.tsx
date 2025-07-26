import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './PokemonDetail.css';

interface PokemonDetails {
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
}

const PokemonDetail: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsId = searchParams.get('details');
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!detailsId) {
      setPokemon(null);
      return;
    }

    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${detailsId}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data))
      .catch(() => setPokemon(null))
      .finally(() => setLoading(false));
  }, [detailsId]);

  const handleClose = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  };

  if (!detailsId) return null;

  return (
    <div className="pokemon-detail">
      <button className="pokemon-detail__close-button" onClick={handleClose}>
        Close
      </button>
      {loading && <p>Loading details...</p>}
      {!loading && !pokemon && <p>Pokemon not found</p>}
      {pokemon && (
        <div className="pokemon-detail__info">
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonDetail;
